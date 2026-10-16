from datetime import datetime, timedelta, timezone
from typing import Optional
import os
import secrets

import jwt
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, Field
from pwdlib import PasswordHash
from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal, DATABASE_URL


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)


Base.metadata.create_all(bind=engine)

# Migrate an existing SQLite database without deleting its data.
if DATABASE_URL.startswith("sqlite"):
    with engine.begin() as connection:
        columns = connection.exec_driver_sql(
            "PRAGMA table_info(expenses)"
        ).fetchall()
        if "user_id" not in {column[1] for column in columns}:
            connection.exec_driver_sql(
                "ALTER TABLE expenses ADD COLUMN user_id INTEGER REFERENCES users(id)"
            )


app = FastAPI(title="SmartSpend API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "https://smartspend-web-ashy.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

password_hash = PasswordHash.recommended()
# Set SMARTSPEND_SECRET_KEY in the environment before deploying.
SECRET_KEY = os.getenv("SMARTSPEND_SECRET_KEY") or "dev-only-change-this-secret-before-deployment"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


class ExpenseCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    category: str = Field(min_length=1, max_length=100)
    amount: float = Field(gt=0)
    date: Optional[str] = None


class RegisterRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
class ProfileUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid or expired authentication token. Please log in again.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        subject = payload.get("sub")
        if subject is None:
            raise credentials_exception
        user_id = int(subject)
    except (jwt.InvalidTokenError, TypeError, ValueError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


def expense_to_dict(expense: Expense):
    return {
        "id": expense.id,
        "name": expense.name,
        "category": expense.category,
        "amount": expense.amount,
        "date": expense.date,
    }


@app.get("/")
def home():
    return {"message": "SmartSpend API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/register", status_code=201)
def register_user(user_data: RegisterRequest, db: Session = Depends(get_db)):
    name = user_data.name.strip()
    email = str(user_data.email).strip().lower()
    if not name:
        raise HTTPException(status_code=422, detail="Name cannot be blank")
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="An account with this email already exists")

    user = User(name=name, email=email, hashed_password=password_hash.hash(user_data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "name": user.name, "email": user.email}


@app.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    email = form_data.username.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if user is None or not password_hash.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires_at = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": str(user.id), "exp": expires_at}, SECRET_KEY, algorithm=ALGORITHM)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": user.email},
    }


@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "name": current_user.name, "email": current_user.email}
@app.put("/me")
def update_me(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    name = profile.name.strip()
    email = str(profile.email).strip().lower()

    if not name:
        raise HTTPException(status_code=422, detail="Name cannot be blank")

    existing_user = (
        db.query(User)
        .filter(User.email == email, User.id != current_user.id)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="This email is already registered to another account",
        )

    current_user.name = name
    current_user.email = email

    db.commit()
    db.refresh(current_user)

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
    }


@app.get("/expenses")
def get_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.id.desc())
        .all()
    )
    return [expense_to_dict(item) for item in expenses]


@app.post("/expenses")
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_expense = Expense(
        name=expense.name.strip(),
        category=expense.category.strip(),
        amount=expense.amount,
        date=expense.date or datetime.now().date().isoformat(),
        user_id=current_user.id,
    )
    if not new_expense.name or not new_expense.category:
        raise HTTPException(status_code=422, detail="Name and category cannot be blank")
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return expense_to_dict(new_expense)


@app.put("/expenses/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id, Expense.user_id == current_user.id)
        .first()
    )
    if db_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    db_expense.name = expense.name.strip()
    db_expense.category = expense.category.strip()
    db_expense.amount = expense.amount
    db_expense.date = expense.date or db_expense.date
    db.commit()
    db.refresh(db_expense)
    return expense_to_dict(db_expense)


@app.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id, Expense.user_id == current_user.id)
        .first()
    )
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}
