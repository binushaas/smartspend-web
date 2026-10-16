import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'https://smartspend-api-me4k.onrender.com';

type Transaction = {
  id: number
  name: string
  category: string
  date: string
  amount: number
  icon: string
}





const categoryColors: Record<string, string> = {
  Food: '#a78bfa',
  Shopping: '#60a5fa',
  Transport: '#34d399',
  Other: '#fbbf24',
  Entertainment: '#f472b6',
}


const money = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

  const translations: Record<string, Record<string, string>> = {
    English: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      budgets: 'Budgets',
      analytics: 'Analytics',
      settings: 'Settings',
      addExpense: 'Add expense',
      appearance: 'Appearance',
      profile: 'Profile',
      language: 'Language',
      help: 'Help & Support',
      about: 'About SmartSpend',
      saveProfile: 'Save profile',
      displayName: 'Display name',
      email: 'Email address',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      saveBudget: 'Save budget',
      cancel: 'Cancel',
      delete: 'Delete',
      totalSpent: 'Total tracked spending',
      monthlyBudget: 'Monthly budget',
      budgetRemaining: 'Budget remaining',
      recentTransactions: 'Recent transactions',
      spendingOverview: 'Spending overview',
      categoryBreakdown: 'Where it goes',
      description: 'Description',
      amount: 'Amount',
      category: 'Category',
      saveExpense: 'Save expense',
      search: 'Search expenses...',
      filter: 'Filter by category',
      displayLanguage: 'Display language',
      submitMessage: 'Submit message',
      application: 'Application',
      backendStatus: 'Backend status',
      food: 'Food',
      shopping: 'Shopping',
      transport: 'Transport',
      entertainment: 'Entertainment',
      education: 'Education',
      health: 'Health',
      other: 'Other',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Kannada: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      transactions: 'ವಹಿವಾಟುಗಳು',
      budgets: 'ಬಜೆಟ್‌ಗಳು',
      analytics: 'ವಿಶ್ಲೇಷಣೆ',
      settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      addExpense: 'ಖರ್ಚು ಸೇರಿಸಿ',
      appearance: 'ನೋಟ',
      profile: 'ಪ್ರೊಫೈಲ್',
      language: 'ಭಾಷೆ',
      help: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
      about: 'SmartSpend ಬಗ್ಗೆ',
      saveProfile: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ',
      displayName: 'ಪ್ರದರ್ಶನ ಹೆಸರು',
      email: 'ಇಮೇಲ್ ವಿಳಾಸ',
      theme: 'ಥೀಮ್',
      dark: 'ಡಾರ್ಕ್',
      light: 'ಲೈಟ್',
      saveBudget: 'ಬಜೆಟ್ ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      delete: 'ಅಳಿಸಿ',
      totalSpent: 'ಒಟ್ಟು ಖರ್ಚು',
      monthlyBudget: 'ಮಾಸಿಕ ಬಜೆಟ್',
      budgetRemaining: 'ಉಳಿದ ಬಜೆಟ್',
      recentTransactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
      spendingOverview: 'ಖರ್ಚಿನ ಅವಲೋಕನ',
      categoryBreakdown: 'ಖರ್ಚಿನ ವಿಭಾಗಗಳು',
      description: 'ವಿವರಣೆ',
      amount: 'ಮೊತ್ತ',
      category: 'ವರ್ಗ',
      saveExpense: 'ಖರ್ಚು ಉಳಿಸಿ',
      search: 'ಖರ್ಚುಗಳನ್ನು ಹುಡುಕಿ...',
      filter: 'ವರ್ಗದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್',
      displayLanguage: 'ಪ್ರದರ್ಶನ ಭಾಷೆ',
      submitMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
      application: 'ಅಪ್ಲಿಕೇಶನ್',
      backendStatus: 'ಬ್ಯಾಕೆಂಡ್ ಸ್ಥಿತಿ',
      food: 'ಆಹಾರ',
      shopping: 'ಶಾಪಿಂಗ್',
      transport: 'ಸಾರಿಗೆ',
      entertainment: 'ಮನರಂಜನೆ',
      education: 'ಶಿಕ್ಷಣ',
      health: 'ಆರೋಗ್ಯ',
      other: 'ಇತರೆ',
      workspace: "ಕಾರ್ಯಸ್ಥಳ",
      spendSmarter: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಖರ್ಚುಮಾಡಿ.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "ವೈಯಕ್ತಿಕ ಕಾರ್ಯಸ್ಥಳ",
      financeOverview: "ನಿಮ್ಮ ಹಣಕಾಸಿನ ಒಂದು ನೋಟ",
      manageFinances: "ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ನಿರ್ವಹಿಸಿ.",
      moneySummary: "ನಿಮ್ಮ ಹಣಕಾಸಿನಲ್ಲಿ ಏನಾಗುತ್ತಿದೆ ಎಂಬುದು ಇಲ್ಲಿದೆ.",
      basedOnTransactions: "ಕೆಳಗಿನ ವಹಿವಾಟುಗಳ ಆಧಾರದಲ್ಲಿ",
      monthlyLimit: "ನಿಮ್ಮ ಮಾಸಿಕ ಮಿತಿ",
      budgetMinusSpending: "ಬಜೆಟ್‌ನಲ್ಲಿ ಉಳಿದ ಮೊತ್ತ",
      allRecorded: "ಎಲ್ಲ ದಾಖಲಾದ ವಹಿವಾಟುಗಳು",
      spendingLastMonth: "ಕಳೆದ ತಿಂಗಳ ಖರ್ಚು",
      spendingThisMonth: "ಈ ತಿಂಗಳ ಖರ್ಚು",
      thisMonth: "ಈ ತಿಂಗಳು",
      lastMonth: "ಕಳೆದ ತಿಂಗಳು",
      allTime: "ಎಲ್ಲ ಸಮಯ",
      recordedExpenses: "ದಾಖಲಾದ ಖರ್ಚುಗಳ ಆಧಾರದಲ್ಲಿ",
      spendingCalculated: "ದಾಖಲಾದ ವಹಿವಾಟುಗಳಿಂದ ಲೆಕ್ಕಿಸಿದ ಖರ್ಚು.",
      latestExpenses: "ಇತ್ತೀಚಿನ ಖರ್ಚುಗಳು",
      entries: "ದಾಖಲೆಗಳು",
      editBudget: "ಬಜೆಟ್ ಸಂಪಾದಿಸಿ",
      yourSpendingLimit: "ನಿಮ್ಮ ಖರ್ಚಿನ ಮಿತಿ",
      moneyInsight: "ನಿಮ್ಮ ಹಣಕಾಸಿನ ಒಳನೋಟ",
      updateMonthlyBudget: "ಮಾಸಿಕ ಬಜೆಟ್ ನವೀಕರಿಸಿ",
      setSpendingLimit: "ನಿಮಗೆ ಸೂಕ್ತವಾದ ಖರ್ಚಿನ ಮಿತಿಯನ್ನು ಹೊಂದಿಸಿ.",
      monthlyBudgetLabel: "ಮಾಸಿಕ ಬಜೆಟ್",
      enterAmount: "ಮೊತ್ತ ನಮೂದಿಸಿ",
      personaliseExperience: "ನಿಮ್ಮ ಅನುಭವವನ್ನು ವೈಯಕ್ತಿಕಗೊಳಿಸಿ",
      preferencesAccount: "ನಿಮ್ಮ ಆದ್ಯತೆಗಳು ಮತ್ತು ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ.",
      appearanceDescription: "SmartSpend ಹೇಗೆ ಕಾಣಬೇಕು ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      themeDescription: "ಡಾರ್ಕ್ ಮತ್ತು ಲೈಟ್ ಮೋಡ್ ನಡುವೆ ಬದಲಾಯಿಸಿ.",
      profileDescription: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
      enterName: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      profileSaved: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ.",
      languageDescription: "ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      rememberLanguage: "ನಿಮ್ಮ ಆಯ್ಕೆ ಈ ಸಾಧನದಲ್ಲಿ ನೆನಪಿಡಲಾಗುತ್ತದೆ.",
      helpDescription: "ಪ್ರಶ್ನೆ ಅಥವಾ ಸಮಸ್ಯೆ ಇದೆಯೇ? ಕೆಳಗೆ ಬರೆಯಿರಿ.",
      howHelp: "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      describeIssue: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.",
      aboutDescription: "ವೈಯಕ್ತಿಕ ಖರ್ಚು ಮತ್ತು ಬಜೆಟ್ ಯೋಜನೆ.",
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "ವಹಿವಾಟನ್ನು ಅಳಿಸಬೇಕೇ?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ತೆರೆಯಿರಿ",
      validExpense: "ಸರಿಯಾದ ಖರ್ಚಿನ ಹೆಸರು ಮತ್ತು ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ.",
      saveExpenseError: "ಖರ್ಚನ್ನು ಉಳಿಸಲಾಗಲಿಲ್ಲ. ಬ್ಯಾಕೆಂಡ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಪರಿಶೀಲಿಸಿ.",
      backendChecking: "Checking connection...",
      backendFailed: "ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ",
      allCategories: "ಎಲ್ಲ ವರ್ಗಗಳು",
      billsUtilities: "ಬಿಲ್‌ಗಳು ಮತ್ತು ಉಪಯುಕ್ತತೆಗಳು",
      travel: "ಪ್ರಯಾಣ",
      personalCare: "ವೈಯಕ್ತಿಕ ಆರೈಕೆ",
      deleteTransaction: "ವಹಿವಾಟನ್ನು ಅಳಿಸಿ",
      used: "ಬಳಸಲಾಗಿದೆ",
      left: "ಉಳಿದಿದೆ",
      of: "ರಲ್ಲಿ",
      exampleLunch: "ಉದಾ. ಊಟ",
      exampleAmount: "ಉದಾ. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "ಶುಭೋದಯ",
      goodAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
      goodEvening: "ಶುಭ ಸಂಜೆ",

    },
  
    Hindi: {
      dashboard: 'डैशबोर्ड',
      transactions: 'लेन-देन',
      budgets: 'बजट',
      analytics: 'विश्लेषण',
      settings: 'सेटिंग्स',
      addExpense: 'खर्च जोड़ें',
      appearance: 'रूप-रंग',
      profile: 'प्रोफ़ाइल',
      language: 'भाषा',
      help: 'सहायता और समर्थन',
      about: 'SmartSpend के बारे में',
      saveProfile: 'प्रोफ़ाइल सहेजें',
      displayName: 'प्रदर्शन नाम',
      email: 'ईमेल पता',
      theme: 'थीम',
      dark: 'डार्क',
      light: 'लाइट',
      saveBudget: 'बजट सहेजें',
      cancel: 'रद्द करें',
      delete: 'हटाएँ',
      totalSpent: 'कुल खर्च',
      monthlyBudget: 'मासिक बजट',
      budgetRemaining: 'बाकी बजट',
      recentTransactions: 'हाल के लेन-देन',
      spendingOverview: 'खर्च का विवरण',
      categoryBreakdown: 'खर्च कहाँ होता है',
      description: 'विवरण',
      amount: 'राशि',
      category: 'श्रेणी',
      saveExpense: 'खर्च सहेजें',
      search: 'खर्च खोजें...',
      filter: 'श्रेणी के अनुसार फ़िल्टर',
      displayLanguage: 'प्रदर्शन भाषा',
      submitMessage: 'संदेश भेजें',
      application: 'एप्लिकेशन',
      backendStatus: 'बैकएंड स्थिति',
      food: 'भोजन',
      shopping: 'खरीदारी',
      transport: 'परिवहन',
      entertainment: 'मनोरंजन',
      education: 'शिक्षा',
      health: 'स्वास्थ्य',
      other: 'अन्य',
      workspace: "कार्यस्थान",
      spendSmarter: "समझदारी से खर्च करें।",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "व्यक्तिगत कार्यस्थान",
      financeOverview: "आपकी वित्तीय स्थिति एक नज़र में",
      manageFinances: "अपने वित्त को एक ही जगह प्रबंधित करें।",
      moneySummary: "आपके पैसों के साथ क्या हो रहा है, यहाँ देखें।",
      basedOnTransactions: "नीचे दिए गए लेन-देन के आधार पर",
      monthlyLimit: "आपकी मासिक सीमा",
      budgetMinusSpending: "बजट में बची राशि",
      allRecorded: "सभी दर्ज लेन-देन",
      spendingLastMonth: "पिछले महीने का खर्च",
      spendingThisMonth: "इस महीने का खर्च",
      thisMonth: "इस महीने",
      lastMonth: "पिछले महीने",
      allTime: "सभी समय",
      recordedExpenses: "दर्ज खर्चों के आधार पर",
      spendingCalculated: "दर्ज लेन-देन से गणना किया गया खर्च।",
      latestExpenses: "आपके हाल के खर्च",
      entries: "प्रविष्टियाँ",
      editBudget: "बजट संपादित करें",
      yourSpendingLimit: "आपकी खर्च सीमा",
      moneyInsight: "आपके पैसों की जानकारी",
      updateMonthlyBudget: "मासिक बजट अपडेट करें",
      setSpendingLimit: "अपने लिए उपयुक्त खर्च सीमा तय करें।",
      monthlyBudgetLabel: "मासिक बजट",
      enterAmount: "राशि दर्ज करें",
      personaliseExperience: "अपने अनुभव को व्यक्तिगत बनाएँ",
      preferencesAccount: "अपनी प्राथमिकताएँ और खाता प्रबंधित करें।",
      appearanceDescription: "SmartSpend का रूप चुनें।",
      themeDescription: "डार्क और लाइट मोड के बीच बदलें।",
      profileDescription: "अपनी व्यक्तिगत जानकारी प्रबंधित करें।",
      enterName: "अपना नाम दर्ज करें",
      profileSaved: "प्रोफ़ाइल सहेजी गई।",
      languageDescription: "अपनी पसंदीदा भाषा चुनें।",
      rememberLanguage: "आपकी पसंद इस डिवाइस पर याद रखी जाएगी।",
      helpDescription: "कोई प्रश्न या समस्या है? नीचे लिखें।",
      howHelp: "हम कैसे मदद कर सकते हैं?",
      describeIssue: "अपना प्रश्न या समस्या बताएँ...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: "आपका संदेश इस डिवाइस पर सहेजा गया है।",
      aboutDescription: "व्यक्तिगत खर्च ट्रैकिंग और बजट परियोजना।",
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "लेन-देन हटाएँ?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "प्रोफ़ाइल सेटिंग खोलें",
      validExpense: "खर्च का सही नाम और राशि दर्ज करें।",
      saveExpenseError: "खर्च सहेजा नहीं जा सका। जाँचें कि बैकएंड चल रहा है।",
      backendChecking: "Checking connection...",
      backendFailed: "कनेक्शन विफल",
      allCategories: "सभी श्रेणियाँ",
      billsUtilities: "बिल और उपयोगिताएँ",
      travel: "यात्रा",
      personalCare: "व्यक्तिगत देखभाल",
      deleteTransaction: "लेन-देन हटाएँ",
      used: "उपयोग हुआ",
      left: "शेष",
      of: "में से",
      exampleLunch: "जैसे दोपहर का भोजन",
      exampleAmount: "जैसे 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "सुप्रभात",
      goodAfternoon: "नमस्कार",
      goodEvening: "शुभ संध्या",

    },
  
    Tamil: {
      dashboard: 'முகப்புப் பலகை',
      transactions: 'பரிவர்த்தனைகள்',
      budgets: 'பட்ஜெட்டுகள்',
      analytics: 'பகுப்பாய்வு',
      settings: 'அமைப்புகள்',
      addExpense: 'செலவைச் சேர்க்கவும்',
      appearance: 'தோற்றம்',
      profile: 'சுயவிவரம்',
      language: 'மொழி',
      help: 'உதவி மற்றும் ஆதரவு',
      about: 'SmartSpend பற்றி',
      saveProfile: 'சுயவிவரத்தைச் சேமிக்கவும்',
      displayName: 'காட்சிப் பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      theme: 'தீம்',
      dark: 'இருண்ட',
      light: 'வெளிச்சம்',
      saveBudget: 'பட்ஜெட்டைச் சேமிக்கவும்',
      cancel: 'ரத்துசெய்',
      delete: 'நீக்கு',
      totalSpent: 'மொத்தச் செலவு',
      monthlyBudget: 'மாதாந்திர பட்ஜெட்',
      budgetRemaining: 'மீதமுள்ள பட்ஜெட்',
      recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்',
      spendingOverview: 'செலவு மேலோட்டம்',
      categoryBreakdown: 'செலவு வகைகள்',
      description: 'விளக்கம்',
      amount: 'தொகை',
      category: 'வகை',
      saveExpense: 'செலவைச் சேமிக்கவும்',
      search: 'செலவுகளைத் தேடுங்கள்...',
      filter: 'வகையின்படி வடிகட்டவும்',
      displayLanguage: 'காட்சி மொழி',
      submitMessage: 'செய்தியை அனுப்பவும்',
      application: 'செயலி',
      backendStatus: 'பின்தள நிலை',
      food: 'உணவு',
      shopping: 'ஷாப்பிங்',
      transport: 'போக்குவரத்து',
      entertainment: 'பொழுதுபோக்கு',
      education: 'கல்வி',
      health: 'உடல்நலம்',
      other: 'மற்றவை',
      workspace: "பணியிடம்",
      spendSmarter: "புத்திசாலித்தனமாகச் செலவிடுங்கள்.",
      moneyHabits: "இன்றைய சிறிய படிகள் நாளை சிறந்த பணப் பழக்கங்களை உருவாக்கும்.",
      personalWorkspace: "தனிப்பட்ட பணியிடம்",
      financeOverview: "உங்கள் நிதிநிலை ஒரே பார்வையில்",
      manageFinances: "உங்கள் நிதியை ஒரே இடத்தில் நிர்வகிக்கவும்.",
      moneySummary: "உங்கள் பணத்தில் என்ன நடக்கிறது என்பதை இங்கே காணலாம்.",
      basedOnTransactions: "கீழே உள்ள பரிவர்த்தனைகளின் அடிப்படையில்",
      monthlyLimit: "உங்கள் மாதாந்திர வரம்பு",
      budgetMinusSpending: "பட்ஜெட்டில் மீதமுள்ள தொகை",
      allRecorded: "பதிவுசெய்யப்பட்ட அனைத்து பரிவர்த்தனைகளும்",
      spendingLastMonth: "கடந்த மாதச் செலவு",
      spendingThisMonth: "இந்த மாதச் செலவு",
      thisMonth: "இந்த மாதம்",
      lastMonth: "கடந்த மாதம்",
      allTime: "எல்லா காலமும்",
      recordedExpenses: "பதிவுசெய்யப்பட்ட செலவுகளின் அடிப்படையில்",
      spendingCalculated: "பதிவுசெய்யப்பட்ட பரிவர்த்தனைகளிலிருந்து கணக்கிடப்பட்ட செலவு.",
      latestExpenses: "உங்கள் சமீபத்திய செலவுகள்",
      entries: "பதிவுகள்",
      editBudget: "பட்ஜெட்டைத் திருத்தவும்",
      yourSpendingLimit: "உங்கள் செலவு வரம்பு",
      moneyInsight: "உங்கள் பணநிலைப் பார்வை",
      updateMonthlyBudget: "மாதாந்திர பட்ஜெட்டைப் புதுப்பிக்கவும்",
      setSpendingLimit: "உங்களுக்கு ஏற்ற செலவு வரம்பை அமைக்கவும்.",
      monthlyBudgetLabel: "மாதாந்திர பட்ஜெட்",
      enterAmount: "தொகையை உள்ளிடவும்",
      personaliseExperience: "உங்கள் அனுபவத்தைத் தனிப்பயனாக்கவும்",
      preferencesAccount: "உங்கள் விருப்பங்களையும் SmartSpend கணக்கையும் நிர்வகிக்கவும்.",
      appearanceDescription: "SmartSpend தோற்றத்தைத் தேர்ந்தெடுக்கவும்.",
      themeDescription: "இருண்ட மற்றும் வெளிச்சமான முறைகளுக்கு மாறவும்.",
      profileDescription: "உங்கள் தனிப்பட்ட விவரங்களை நிர்வகிக்கவும்.",
      enterName: "உங்கள் பெயரை உள்ளிடவும்",
      profileSaved: "சுயவிவரம் சேமிக்கப்பட்டது.",
      languageDescription: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.",
      rememberLanguage: "உங்கள் தேர்வு இந்தச் சாதனத்தில் நினைவில் வைக்கப்படும்.",
      helpDescription: "கேள்வி அல்லது சிக்கல் உள்ளதா? கீழே எழுதவும்.",
      howHelp: "நாங்கள் எவ்வாறு உதவலாம்?",
      describeIssue: "உங்கள் கேள்வி அல்லது சிக்கலை விவரிக்கவும்...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: "உங்கள் செய்தி இந்தச் சாதனத்தில் சேமிக்கப்பட்டது.",
      aboutDescription: "தனிப்பட்ட செலவுக் கண்காணிப்பு மற்றும் பட்ஜெட் திட்டம்.",
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "பரிவர்த்தனையை நீக்கவா?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "சுயவிவர அமைப்புகளைத் திறக்கவும்",
      validExpense: "சரியான செலவுப் பெயரையும் தொகையையும் உள்ளிடவும்.",
      saveExpenseError: "செலவைச் சேமிக்க முடியவில்லை. பின்தளம் இயங்குகிறதா எனச் சரிபார்க்கவும்.",
      backendChecking: "Checking connection...",
      backendFailed: "இணைப்பு தோல்வியடைந்தது",
      allCategories: "அனைத்து வகைகளும்",
      billsUtilities: "கட்டணங்கள் மற்றும் பயன்பாடுகள்",
      travel: "பயணம்",
      personalCare: "தனிப்பட்ட பராமரிப்பு",
      deleteTransaction: "பரிவர்த்தனையை நீக்கவும்",
      used: "பயன்படுத்தப்பட்டது",
      left: "மீதம்",
      of: "இல்",
      exampleLunch: "எ.கா. மதிய உணவு",
      exampleAmount: "எ.கா. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "காலை வணக்கம்",
      goodAfternoon: "மதிய வணக்கம்",
      goodEvening: "மாலை வணக்கம்",

    },
  
    Telugu: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      transactions: 'లావాదేవీలు',
      budgets: 'బడ్జెట్‌లు',
      analytics: 'విశ్లేషణలు',
      settings: 'సెట్టింగ్‌లు',
      addExpense: 'ఖర్చును జోడించండి',
      appearance: 'రూపం',
      profile: 'ప్రొఫైల్',
      language: 'భాష',
      help: 'సహాయం మరియు మద్దతు',
      about: 'SmartSpend గురించి',
      saveProfile: 'ప్రొఫైల్‌ను సేవ్ చేయండి',
      displayName: 'ప్రదర్శన పేరు',
      email: 'ఇమెయిల్ చిరునామా',
      theme: 'థీమ్',
      dark: 'డార్క్',
      light: 'లైట్',
      saveBudget: 'బడ్జెట్‌ను సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      delete: 'తొలగించండి',
      totalSpent: 'మొత్తం ఖర్చు',
      monthlyBudget: 'నెలవారీ బడ్జెట్',
      budgetRemaining: 'మిగిలిన బడ్జెట్',
      recentTransactions: 'ఇటీవలి లావాదేవీలు',
      spendingOverview: 'ఖర్చుల వివరాలు',
      categoryBreakdown: 'ఖర్చుల విభాగాలు',
      description: 'వివరణ',
      amount: 'మొత్తం',
      category: 'వర్గం',
      saveExpense: 'ఖర్చును సేవ్ చేయండి',
      search: 'ఖర్చులను వెతకండి...',
      filter: 'వర్గం ప్రకారం ఫిల్టర్',
      displayLanguage: 'ప్రదర్శన భాష',
      submitMessage: 'సందేశాన్ని పంపండి',
      application: 'అప్లికేషన్',
      backendStatus: 'బ్యాకెండ్ స్థితి',
      food: 'ఆహారం',
      shopping: 'షాపింగ్',
      transport: 'రవాణా',
      entertainment: 'వినోదం',
      education: 'విద్య',
      health: 'ఆరోగ్యం',
      other: 'ఇతర',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Malayalam: {
      dashboard: 'ഡാഷ്ബോർഡ്',
      transactions: 'ഇടപാടുകൾ',
      budgets: 'ബജറ്റുകൾ',
      analytics: 'വിശകലനം',
      settings: 'ക്രമീകരണങ്ങൾ',
      addExpense: 'ചെലവ് ചേർക്കുക',
      appearance: 'രൂപഭാവം',
      profile: 'പ്രൊഫൈൽ',
      language: 'ഭാഷ',
      help: 'സഹായവും പിന്തുണയും',
      about: 'SmartSpend വിവരങ്ങൾ',
      saveProfile: 'പ്രൊഫൈൽ സംരക്ഷിക്കുക',
      displayName: 'പ്രദർശന നാമം',
      email: 'ഇമെയിൽ വിലാസം',
      theme: 'തീം',
      dark: 'ഇരുണ്ടത്',
      light: 'വെളിച്ചമുള്ളത്',
      saveBudget: 'ബജറ്റ് സംരക്ഷിക്കുക',
      cancel: 'റദ്ദാക്കുക',
      delete: 'നീക്കം ചെയ്യുക',
      totalSpent: 'ആകെ ചെലവ്',
      monthlyBudget: 'പ്രതിമാസ ബജറ്റ്',
      budgetRemaining: 'ശേഷിക്കുന്ന ബജറ്റ്',
      recentTransactions: 'സമീപകാല ഇടപാടുകൾ',
      spendingOverview: 'ചെലവുകളുടെ അവലോകനം',
      categoryBreakdown: 'ചെലവുകളുടെ വിഭാഗങ്ങൾ',
      description: 'വിവരണം',
      amount: 'തുക',
      category: 'വിഭാഗം',
      saveExpense: 'ചെലവ് സംരക്ഷിക്കുക',
      search: 'ചെലവുകൾ തിരയുക...',
      filter: 'വിഭാഗം അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക',
      displayLanguage: 'പ്രദർശന ഭാഷ',
      submitMessage: 'സന്ദേശം അയയ്ക്കുക',
      application: 'ആപ്ലിക്കേഷൻ',
      backendStatus: 'ബാക്കെൻഡ് നില',
      food: 'ഭക്ഷണം',
      shopping: 'ഷോപ്പിംഗ്',
      transport: 'ഗതാഗതം',
      entertainment: 'വിനോദം',
      education: 'വിദ്യാഭ്യാസം',
      health: 'ആരോഗ്യം',
      other: 'മറ്റുള്ളവ',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Bengali: {
      dashboard: 'ড্যাশবোর্ড',
      transactions: 'লেনদেন',
      budgets: 'বাজেট',
      analytics: 'বিশ্লেষণ',
      settings: 'সেটিংস',
      addExpense: 'খরচ যোগ করুন',
      appearance: 'চেহারা',
      profile: 'প্রোফাইল',
      language: 'ভাষা',
      help: 'সহায়তা ও সমর্থন',
      about: 'SmartSpend সম্পর্কে',
      saveProfile: 'প্রোফাইল সংরক্ষণ করুন',
      displayName: 'প্রদর্শিত নাম',
      email: 'ইমেল ঠিকানা',
      theme: 'থিম',
      dark: 'ডার্ক',
      light: 'লাইট',
      saveBudget: 'বাজেট সংরক্ষণ করুন',
      cancel: 'বাতিল',
      delete: 'মুছুন',
      totalSpent: 'মোট খরচ',
      monthlyBudget: 'মাসিক বাজেট',
      budgetRemaining: 'অবশিষ্ট বাজেট',
      recentTransactions: 'সাম্প্রতিক লেনদেন',
      spendingOverview: 'খরচের বিবরণ',
      categoryBreakdown: 'খরচের বিভাগ',
      description: 'বিবরণ',
      amount: 'পরিমাণ',
      category: 'বিভাগ',
      saveExpense: 'খরচ সংরক্ষণ করুন',
      search: 'খরচ খুঁজুন...',
      filter: 'বিভাগ অনুযায়ী ফিল্টার',
      displayLanguage: 'প্রদর্শনের ভাষা',
      submitMessage: 'বার্তা পাঠান',
      application: 'অ্যাপ্লিকেশন',
      backendStatus: 'ব্যাকএন্ড অবস্থা',
      food: 'খাবার',
      shopping: 'কেনাকাটা',
      transport: 'পরিবহন',
      entertainment: 'বিনোদন',
      education: 'শিক্ষা',
      health: 'স্বাস্থ্য',
      other: 'অন্যান্য',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Marathi: {
      dashboard: 'डॅशबोर्ड',
      transactions: 'व्यवहार',
      budgets: 'अंदाजपत्रक',
      analytics: 'विश्लेषण',
      settings: 'सेटिंग्ज',
      addExpense: 'खर्च जोडा',
      appearance: 'स्वरूप',
      profile: 'प्रोफाइल',
      language: 'भाषा',
      help: 'मदत आणि समर्थन',
      about: 'SmartSpend बद्दल',
      saveProfile: 'प्रोफाइल जतन करा',
      displayName: 'प्रदर्शन नाव',
      email: 'ईमेल पत्ता',
      theme: 'थीम',
      dark: 'गडद',
      light: 'हलका',
      saveBudget: 'अंदाजपत्रक जतन करा',
      cancel: 'रद्द करा',
      delete: 'हटवा',
      totalSpent: 'एकूण खर्च',
      monthlyBudget: 'मासिक अंदाजपत्रक',
      budgetRemaining: 'उर्वरित अंदाजपत्रक',
      recentTransactions: 'अलीकडील व्यवहार',
      spendingOverview: 'खर्चाचा आढावा',
      categoryBreakdown: 'खर्चाचे प्रकार',
      description: 'वर्णन',
      amount: 'रक्कम',
      category: 'प्रकार',
      saveExpense: 'खर्च जतन करा',
      search: 'खर्च शोधा...',
      filter: 'प्रकारानुसार फिल्टर',
      displayLanguage: 'प्रदर्शन भाषा',
      submitMessage: 'संदेश पाठवा',
      application: 'अनुप्रयोग',
      backendStatus: 'बॅकएंड स्थिती',
      food: 'अन्न',
      shopping: 'खरेदी',
      transport: 'वाहतूक',
      entertainment: 'मनोरंजन',
      education: 'शिक्षण',
      health: 'आरोग्य',
      other: 'इतर',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Gujarati: {
      dashboard: 'ડેશબોર્ડ',
      transactions: 'વ્યવહારો',
      budgets: 'બજેટ',
      analytics: 'વિશ્લેષણ',
      settings: 'સેટિંગ્સ',
      addExpense: 'ખર્ચ ઉમેરો',
      appearance: 'દેખાવ',
      profile: 'પ્રોફાઇલ',
      language: 'ભાષા',
      help: 'મદદ અને સહાય',
      about: 'SmartSpend વિશે',
      saveProfile: 'પ્રોફાઇલ સાચવો',
      displayName: 'પ્રદર્શન નામ',
      email: 'ઇમેઇલ સરનામું',
      theme: 'થીમ',
      dark: 'ડાર્ક',
      light: 'લાઇટ',
      saveBudget: 'બજેટ સાચવો',
      cancel: 'રદ કરો',
      delete: 'કાઢી નાખો',
      totalSpent: 'કુલ ખર્ચ',
      monthlyBudget: 'માસિક બજેટ',
      budgetRemaining: 'બાકી બજેટ',
      recentTransactions: 'તાજેતરના વ્યવહારો',
      spendingOverview: 'ખર્ચની ઝલક',
      categoryBreakdown: 'ખર્ચની શ્રેણીઓ',
      description: 'વર્ણન',
      amount: 'રકમ',
      category: 'શ્રેણી',
      saveExpense: 'ખર્ચ સાચવો',
      search: 'ખર્ચ શોધો...',
      filter: 'શ્રેણી પ્રમાણે ફિલ્ટર',
      displayLanguage: 'પ્રદર્શન ભાષા',
      submitMessage: 'સંદેશ મોકલો',
      application: 'એપ્લિકેશન',
      backendStatus: 'બેકએન્ડ સ્થિતિ',
      food: 'ખોરાક',
      shopping: 'ખરીદી',
      transport: 'પરિવહન',
      entertainment: 'મનોરંજન',
      education: 'શિક્ષણ',
      health: 'આરોગ્ય',
      other: 'અન્ય',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Punjabi: {
      dashboard: 'ਡੈਸ਼ਬੋਰਡ',
      transactions: 'ਲੈਣ-ਦੇਣ',
      budgets: 'ਬਜਟ',
      analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
      settings: 'ਸੈਟਿੰਗਾਂ',
      addExpense: 'ਖਰਚਾ ਜੋੜੋ',
      appearance: 'ਦਿੱਖ',
      profile: 'ਪ੍ਰੋਫ਼ਾਈਲ',
      language: 'ਭਾਸ਼ਾ',
      help: 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ',
      about: 'SmartSpend ਬਾਰੇ',
      saveProfile: 'ਪ੍ਰੋਫ਼ਾਈਲ ਸੰਭਾਲੋ',
      displayName: 'ਦਿਖਾਉਣ ਵਾਲਾ ਨਾਮ',
      email: 'ਈਮੇਲ ਪਤਾ',
      theme: 'ਥੀਮ',
      dark: 'ਗੂੜ੍ਹਾ',
      light: 'ਹਲਕਾ',
      saveBudget: 'ਬਜਟ ਸੰਭਾਲੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      delete: 'ਮਿਟਾਓ',
      totalSpent: 'ਕੁੱਲ ਖਰਚਾ',
      monthlyBudget: 'ਮਹੀਨਾਵਾਰ ਬਜਟ',
      budgetRemaining: 'ਬਾਕੀ ਬਜਟ',
      recentTransactions: 'ਹਾਲੀਆ ਲੈਣ-ਦੇਣ',
      spendingOverview: 'ਖਰਚੇ ਦੀ ਜਾਣਕਾਰੀ',
      categoryBreakdown: 'ਖਰਚੇ ਦੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      description: 'ਵੇਰਵਾ',
      amount: 'ਰਕਮ',
      category: 'ਸ਼੍ਰੇਣੀ',
      saveExpense: 'ਖਰਚਾ ਸੰਭਾਲੋ',
      search: 'ਖਰਚੇ ਲੱਭੋ...',
      filter: 'ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਫਿਲਟਰ',
      displayLanguage: 'ਦਿਖਾਉਣ ਦੀ ਭਾਸ਼ਾ',
      submitMessage: 'ਸੁਨੇਹਾ ਭੇਜੋ',
      application: 'ਐਪਲੀਕੇਸ਼ਨ',
      backendStatus: 'ਬੈਕਐਂਡ ਸਥਿਤੀ',
      food: 'ਭੋਜਨ',
      shopping: 'ਖਰੀਦਦਾਰੀ',
      transport: 'ਆਵਾਜਾਈ',
      entertainment: 'ਮਨੋਰੰਜਨ',
      education: 'ਸਿੱਖਿਆ',
      health: 'ਸਿਹਤ',
      other: 'ਹੋਰ',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Spanish: {
      dashboard: 'Panel',
      transactions: 'Transacciones',
      budgets: 'Presupuestos',
      analytics: 'Análisis',
      settings: 'Configuración',
      addExpense: 'Añadir gasto',
      appearance: 'Apariencia',
      profile: 'Perfil',
      language: 'Idioma',
      help: 'Ayuda y soporte',
      about: 'Acerca de SmartSpend',
      saveProfile: 'Guardar perfil',
      displayName: 'Nombre visible',
      email: 'Correo electrónico',
      theme: 'Tema',
      dark: 'Oscuro',
      light: 'Claro',
      saveBudget: 'Guardar presupuesto',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      totalSpent: 'Gasto total registrado',
      monthlyBudget: 'Presupuesto mensual',
      budgetRemaining: 'Presupuesto restante',
      recentTransactions: 'Transacciones recientes',
      spendingOverview: 'Resumen de gastos',
      categoryBreakdown: 'Distribución de gastos',
      description: 'Descripción',
      amount: 'Importe',
      category: 'Categoría',
      saveExpense: 'Guardar gasto',
      search: 'Buscar gastos...',
      filter: 'Filtrar por categoría',
      displayLanguage: 'Idioma de visualización',
      submitMessage: 'Enviar mensaje',
      application: 'Aplicación',
      backendStatus: 'Estado del servidor',
      food: 'Comida',
      shopping: 'Compras',
      transport: 'Transporte',
      entertainment: 'Entretenimiento',
      education: 'Educación',
      health: 'Salud',
      other: 'Otros',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    French: {
      dashboard: 'Tableau de bord',
      transactions: 'Transactions',
      budgets: 'Budgets',
      analytics: 'Analyses',
      settings: 'Paramètres',
      addExpense: 'Ajouter une dépense',
      appearance: 'Apparence',
      profile: 'Profil',
      language: 'Langue',
      help: 'Aide et assistance',
      about: 'À propos de SmartSpend',
      saveProfile: 'Enregistrer le profil',
      displayName: 'Nom affiché',
      email: 'Adresse e-mail',
      theme: 'Thème',
      dark: 'Sombre',
      light: 'Clair',
      saveBudget: 'Enregistrer le budget',
      cancel: 'Annuler',
      delete: 'Supprimer',
      totalSpent: 'Dépenses totales suivies',
      monthlyBudget: 'Budget mensuel',
      budgetRemaining: 'Budget restant',
      recentTransactions: 'Transactions récentes',
      spendingOverview: 'Aperçu des dépenses',
      categoryBreakdown: 'Répartition des dépenses',
      description: 'Description',
      amount: 'Montant',
      category: 'Catégorie',
      saveExpense: 'Enregistrer la dépense',
      search: 'Rechercher des dépenses...',
      filter: 'Filtrer par catégorie',
      displayLanguage: 'Langue d’affichage',
      submitMessage: 'Envoyer le message',
      application: 'Application',
      backendStatus: 'État du serveur',
      food: 'Alimentation',
      shopping: 'Achats',
      transport: 'Transport',
      entertainment: 'Divertissement',
      education: 'Éducation',
      health: 'Santé',
      other: 'Autre',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    German: {
      dashboard: 'Dashboard',
      transactions: 'Transaktionen',
      budgets: 'Budgets',
      analytics: 'Analysen',
      settings: 'Einstellungen',
      addExpense: 'Ausgabe hinzufügen',
      appearance: 'Darstellung',
      profile: 'Profil',
      language: 'Sprache',
      help: 'Hilfe und Support',
      about: 'Über SmartSpend',
      saveProfile: 'Profil speichern',
      displayName: 'Anzeigename',
      email: 'E-Mail-Adresse',
      theme: 'Design',
      dark: 'Dunkel',
      light: 'Hell',
      saveBudget: 'Budget speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      totalSpent: 'Erfasste Gesamtausgaben',
      monthlyBudget: 'Monatsbudget',
      budgetRemaining: 'Verbleibendes Budget',
      recentTransactions: 'Letzte Transaktionen',
      spendingOverview: 'Ausgabenübersicht',
      categoryBreakdown: 'Ausgaben nach Kategorien',
      description: 'Beschreibung',
      amount: 'Betrag',
      category: 'Kategorie',
      saveExpense: 'Ausgabe speichern',
      search: 'Ausgaben suchen...',
      filter: 'Nach Kategorie filtern',
      displayLanguage: 'Anzeigesprache',
      submitMessage: 'Nachricht senden',
      application: 'Anwendung',
      backendStatus: 'Backend-Status',
      food: 'Lebensmittel',
      shopping: 'Einkaufen',
      transport: 'Transport',
      entertainment: 'Unterhaltung',
      education: 'Bildung',
      health: 'Gesundheit',
      other: 'Sonstiges',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Chinese: {
      dashboard: '仪表板',
      transactions: '交易记录',
      budgets: '预算',
      analytics: '数据分析',
      settings: '设置',
      addExpense: '添加支出',
      appearance: '外观',
      profile: '个人资料',
      language: '语言',
      help: '帮助与支持',
      about: '关于 SmartSpend',
      saveProfile: '保存个人资料',
      displayName: '显示名称',
      email: '电子邮箱',
      theme: '主题',
      dark: '深色',
      light: '浅色',
      saveBudget: '保存预算',
      cancel: '取消',
      delete: '删除',
      totalSpent: '累计支出',
      monthlyBudget: '每月预算',
      budgetRemaining: '剩余预算',
      recentTransactions: '最近交易',
      spendingOverview: '支出概览',
      categoryBreakdown: '支出类别',
      description: '描述',
      amount: '金额',
      category: '类别',
      saveExpense: '保存支出',
      search: '搜索支出...',
      filter: '按类别筛选',
      displayLanguage: '显示语言',
      submitMessage: '发送消息',
      application: '应用程序',
      backendStatus: '后端状态',
      food: '餐饮',
      shopping: '购物',
      transport: '交通',
      entertainment: '娱乐',
      education: '教育',
      health: '健康',
      other: '其他',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Japanese: {
      dashboard: 'ダッシュボード',
      transactions: '取引',
      budgets: '予算',
      analytics: '分析',
      settings: '設定',
      addExpense: '支出を追加',
      appearance: '外観',
      profile: 'プロフィール',
      language: '言語',
      help: 'ヘルプとサポート',
      about: 'SmartSpend について',
      saveProfile: 'プロフィールを保存',
      displayName: '表示名',
      email: 'メールアドレス',
      theme: 'テーマ',
      dark: 'ダーク',
      light: 'ライト',
      saveBudget: '予算を保存',
      cancel: 'キャンセル',
      delete: '削除',
      totalSpent: '記録された支出合計',
      monthlyBudget: '月間予算',
      budgetRemaining: '残りの予算',
      recentTransactions: '最近の取引',
      spendingOverview: '支出の概要',
      categoryBreakdown: '支出カテゴリ',
      description: '説明',
      amount: '金額',
      category: 'カテゴリ',
      saveExpense: '支出を保存',
      search: '支出を検索...',
      filter: 'カテゴリで絞り込む',
      displayLanguage: '表示言語',
      submitMessage: 'メッセージを送信',
      application: 'アプリケーション',
      backendStatus: 'バックエンドの状態',
      food: '食費',
      shopping: '買い物',
      transport: '交通',
      entertainment: '娯楽',
      education: '教育',
      health: '健康',
      other: 'その他',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Korean: {
      dashboard: '대시보드',
      transactions: '거래 내역',
      budgets: '예산',
      analytics: '분석',
      settings: '설정',
      addExpense: '지출 추가',
      appearance: '화면 설정',
      profile: '프로필',
      language: '언어',
      help: '도움말 및 지원',
      about: 'SmartSpend 정보',
      saveProfile: '프로필 저장',
      displayName: '표시 이름',
      email: '이메일 주소',
      theme: '테마',
      dark: '어둡게',
      light: '밝게',
      saveBudget: '예산 저장',
      cancel: '취소',
      delete: '삭제',
      totalSpent: '총 지출',
      monthlyBudget: '월간 예산',
      budgetRemaining: '남은 예산',
      recentTransactions: '최근 거래',
      spendingOverview: '지출 개요',
      categoryBreakdown: '지출 항목',
      description: '설명',
      amount: '금액',
      category: '항목',
      saveExpense: '지출 저장',
      search: '지출 검색...',
      filter: '항목별 필터',
      displayLanguage: '표시 언어',
      submitMessage: '메시지 보내기',
      application: '애플리케이션',
      backendStatus: '백엔드 상태',
      food: '식비',
      shopping: '쇼핑',
      transport: '교통',
      entertainment: '엔터테인먼트',
      education: '교육',
      health: '건강',
      other: '기타',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Thai: {
      dashboard: 'แดชบอร์ด',
      transactions: 'ธุรกรรม',
      budgets: 'งบประมาณ',
      analytics: 'การวิเคราะห์',
      settings: 'การตั้งค่า',
      addExpense: 'เพิ่มค่าใช้จ่าย',
      appearance: 'รูปลักษณ์',
      profile: 'โปรไฟล์',
      language: 'ภาษา',
      help: 'ความช่วยเหลือและการสนับสนุน',
      about: 'เกี่ยวกับ SmartSpend',
      saveProfile: 'บันทึกโปรไฟล์',
      displayName: 'ชื่อที่แสดง',
      email: 'อีเมล',
      theme: 'ธีม',
      dark: 'มืด',
      light: 'สว่าง',
      saveBudget: 'บันทึกงบประมาณ',
      cancel: 'ยกเลิก',
      delete: 'ลบ',
      totalSpent: 'ค่าใช้จ่ายทั้งหมด',
      monthlyBudget: 'งบประมาณรายเดือน',
      budgetRemaining: 'งบประมาณคงเหลือ',
      recentTransactions: 'ธุรกรรมล่าสุด',
      spendingOverview: 'ภาพรวมค่าใช้จ่าย',
      categoryBreakdown: 'หมวดหมู่ค่าใช้จ่าย',
      description: 'รายละเอียด',
      amount: 'จำนวนเงิน',
      category: 'หมวดหมู่',
      saveExpense: 'บันทึกค่าใช้จ่าย',
      search: 'ค้นหาค่าใช้จ่าย...',
      filter: 'กรองตามหมวดหมู่',
      displayLanguage: 'ภาษาที่แสดง',
      submitMessage: 'ส่งข้อความ',
      application: 'แอปพลิเคชัน',
      backendStatus: 'สถานะแบ็กเอนด์',
      food: 'อาหาร',
      shopping: 'ช้อปปิ้ง',
      transport: 'การเดินทาง',
      entertainment: 'ความบันเทิง',
      education: 'การศึกษา',
      health: 'สุขภาพ',
      other: 'อื่น ๆ',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Russian: {
      dashboard: 'Панель управления',
      transactions: 'Транзакции',
      budgets: 'Бюджеты',
      analytics: 'Аналитика',
      settings: 'Настройки',
      addExpense: 'Добавить расход',
      appearance: 'Внешний вид',
      profile: 'Профиль',
      language: 'Язык',
      help: 'Помощь и поддержка',
      about: 'О SmartSpend',
      saveProfile: 'Сохранить профиль',
      displayName: 'Отображаемое имя',
      email: 'Адрес электронной почты',
      theme: 'Тема',
      dark: 'Тёмная',
      light: 'Светлая',
      saveBudget: 'Сохранить бюджет',
      cancel: 'Отмена',
      delete: 'Удалить',
      totalSpent: 'Общие расходы',
      monthlyBudget: 'Месячный бюджет',
      budgetRemaining: 'Остаток бюджета',
      recentTransactions: 'Последние транзакции',
      spendingOverview: 'Обзор расходов',
      categoryBreakdown: 'Категории расходов',
      description: 'Описание',
      amount: 'Сумма',
      category: 'Категория',
      saveExpense: 'Сохранить расход',
      search: 'Поиск расходов...',
      filter: 'Фильтр по категории',
      displayLanguage: 'Язык интерфейса',
      submitMessage: 'Отправить сообщение',
      application: 'Приложение',
      backendStatus: 'Состояние сервера',
      food: 'Еда',
      shopping: 'Покупки',
      transport: 'Транспорт',
      entertainment: 'Развлечения',
      education: 'Образование',
      health: 'Здоровье',
      other: 'Другое',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Arabic: {
      dashboard: 'لوحة التحكم',
      transactions: 'المعاملات',
      budgets: 'الميزانيات',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      addExpense: 'إضافة مصروف',
      appearance: 'المظهر',
      profile: 'الملف الشخصي',
      language: 'اللغة',
      help: 'المساعدة والدعم',
      about: 'حول SmartSpend',
      saveProfile: 'حفظ الملف الشخصي',
      displayName: 'الاسم المعروض',
      email: 'البريد الإلكتروني',
      theme: 'السمة',
      dark: 'داكن',
      light: 'فاتح',
      saveBudget: 'حفظ الميزانية',
      cancel: 'إلغاء',
      delete: 'حذف',
      totalSpent: 'إجمالي الإنفاق المسجل',
      monthlyBudget: 'الميزانية الشهرية',
      budgetRemaining: 'الميزانية المتبقية',
      recentTransactions: 'المعاملات الأخيرة',
      spendingOverview: 'نظرة عامة على الإنفاق',
      categoryBreakdown: 'فئات الإنفاق',
      description: 'الوصف',
      amount: 'المبلغ',
      category: 'الفئة',
      saveExpense: 'حفظ المصروف',
      search: 'البحث عن المصروفات...',
      filter: 'التصفية حسب الفئة',
      displayLanguage: 'لغة العرض',
      submitMessage: 'إرسال الرسالة',
      application: 'التطبيق',
      backendStatus: 'حالة الخادم',
      food: 'الطعام',
      shopping: 'التسوق',
      transport: 'النقل',
      entertainment: 'الترفيه',
      education: 'التعليم',
      health: 'الصحة',
      other: 'أخرى',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  
    Portuguese: {
      dashboard: 'Painel',
      transactions: 'Transações',
      budgets: 'Orçamentos',
      analytics: 'Análises',
      settings: 'Configurações',
      addExpense: 'Adicionar despesa',
      appearance: 'Aparência',
      profile: 'Perfil',
      language: 'Idioma',
      help: 'Ajuda e suporte',
      about: 'Sobre o SmartSpend',
      saveProfile: 'Salvar perfil',
      displayName: 'Nome de exibição',
      email: 'Endereço de e-mail',
      theme: 'Tema',
      dark: 'Escuro',
      light: 'Claro',
      saveBudget: 'Salvar orçamento',
      cancel: 'Cancelar',
      delete: 'Excluir',
      totalSpent: 'Gasto total registrado',
      monthlyBudget: 'Orçamento mensal',
      budgetRemaining: 'Orçamento restante',
      recentTransactions: 'Transações recentes',
      spendingOverview: 'Visão geral dos gastos',
      categoryBreakdown: 'Categorias de gastos',
      description: 'Descrição',
      amount: 'Valor',
      category: 'Categoria',
      saveExpense: 'Salvar despesa',
      search: 'Pesquisar despesas...',
      filter: 'Filtrar por categoria',
      displayLanguage: 'Idioma de exibição',
      submitMessage: 'Enviar mensagem',
      application: 'Aplicativo',
      backendStatus: 'Estado do servidor',
      food: 'Alimentação',
      shopping: 'Compras',
      transport: 'Transporte',
      entertainment: 'Entretenimento',
      education: 'Educação',
      health: 'Saúde',
      other: 'Outros',
      workspace: "Workspace",
      spendSmarter: "Spend smarter.",
      moneyHabits: "Small steps today can build better money habits tomorrow.",
      personalWorkspace: "Personal workspace",
      financeOverview: "Your finances at a glance",
      manageFinances: "Manage your finances in one place.",
      moneySummary: "Here's what's happening with your money.",
      basedOnTransactions: "Based on the transactions below",
      monthlyLimit: "Your illustrative monthly limit",
      budgetMinusSpending: "Budget minus tracked spending",
      allRecorded: "All recorded transactions",
      spendingLastMonth: "Spending during last month",
      spendingThisMonth: "Spending during this month",
      thisMonth: "This month",
      lastMonth: "Last month",
      allTime: "All time",
      recordedExpenses: "Based on your recorded expenses",
      spendingCalculated: "Spending calculated from your recorded transactions.",
      latestExpenses: "Your latest recorded expenses",
      entries: "entries",
      editBudget: 'Edit budget',
      yourSpendingLimit: "Your spending limit",
      moneyInsight: "Your money insight",
      updateMonthlyBudget: "Update monthly budget",
      setSpendingLimit: "Set a spending limit that works for you.",
      monthlyBudgetLabel: "Monthly budget",
      enterAmount: "Enter amount",
      personaliseExperience: "PERSONALISE YOUR EXPERIENCE",
      preferencesAccount: 'Manage your preferences and account.',
      appearanceDescription: "Choose how SmartSpend looks.",
      themeDescription: "Switch between dark and light mode.",
      profileDescription: "Manage your personal details.",
      enterName: "Enter your name",
      profileSaved: "Profile saved successfully.",
      languageDescription: "Choose your preferred language.",
      rememberLanguage: 'Your choice is saved on this device.',
      helpDescription: 'Have a question or issue? Write it below.',
      howHelp: 'How can we help?',
      describeIssue: "Describe your question or issue...",
      supportDemo: "Demo support form: messages are stored locally on this device. They are not sent to a support team.",
      messageSaved: 'Your message has been saved on this device.',
      aboutDescription: 'A personal expense tracking and budgeting project.',
      footer: "SmartSpend · Build better money habits, one decision at a time.",
      deleteTransactionQuestion: "Delete transaction?",
      confirmDelete: "Are you sure you want to delete",
      openProfileSettings: "Open profile settings",
      validExpense: "Enter a valid expense name and amount.",
      saveExpenseError: "Could not save the expense. Check that your backend is running.",
      backendChecking: "Checking connection...",
      backendFailed: "Connection failed",
      allCategories: "All categories",
      billsUtilities: "Bills & Utilities",
      travel: "Travel",
      personalCare: "Personal Care",
      deleteTransaction: "Delete transaction",
      used: "used",
      left: "left",
      of: "of",
      exampleLunch: "e.g. Lunch",
      exampleAmount: "e.g. 250",
      insightDescription: 'As you add transactions, SmartSpend can help you understand where your money goes.',
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",

    },
  }
  

// Complete translations for longer interface text that was previously left in English.
Object.assign(translations["Spanish"], {"workspace": "Espacio de trabajo", "spendSmarter": "Gasta de forma inteligente.", "moneyHabits": "Pequeños pasos hoy pueden crear mejores hábitos financieros mañana.", "personalWorkspace": "Espacio personal", "financeOverview": "Tus finanzas de un vistazo", "manageFinances": "Gestiona tus finanzas en un solo lugar.", "moneySummary": "Esto es lo que ocurre con tu dinero.", "basedOnTransactions": "Según las transacciones siguientes", "monthlyLimit": "Tu límite mensual orientativo", "budgetMinusSpending": "Presupuesto menos gastos registrados", "allRecorded": "Todas las transacciones registradas", "spendingLastMonth": "Gastos del mes pasado", "spendingThisMonth": "Gastos de este mes", "thisMonth": "Este mes", "lastMonth": "Mes pasado", "allTime": "Todo el tiempo", "recordedExpenses": "Según tus gastos registrados", "spendingCalculated": "Gastos calculados a partir de tus transacciones registradas.", "latestExpenses": "Tus gastos registrados más recientes", "entries": "registros", "yourSpendingLimit": "Tu límite de gastos", "moneyInsight": "Información sobre tu dinero", "updateMonthlyBudget": "Actualizar presupuesto mensual", "setSpendingLimit": "Establece un límite de gastos que se adapte a ti.", "monthlyBudgetLabel": "Presupuesto mensual", "enterAmount": "Introduce el importe", "personaliseExperience": "PERSONALIZA TU EXPERIENCIA", "preferencesAccount": "Gestiona tus preferencias y tu cuenta.", "appearanceDescription": "Elige el aspecto de SmartSpend.", "themeDescription": "Cambia entre el modo oscuro y claro.", "profileDescription": "Gestiona tus datos personales.", "enterName": "Introduce tu nombre", "profileSaved": "Perfil guardado correctamente.", "languageDescription": "Elige tu idioma preferido.", "rememberLanguage": "Tu elección se guarda en este dispositivo.", "helpDescription": "¿Tienes alguna pregunta o problema? Escríbelo abajo.", "howHelp": "¿Cómo podemos ayudarte?", "describeIssue": "Describe tu pregunta o problema...", "supportDemo": "Formulario de ayuda de demostración: los mensajes se guardan en este dispositivo y no se envían al equipo de soporte.", "messageSaved": "Tu mensaje se ha guardado en este dispositivo.", "aboutDescription": "Un proyecto personal para registrar gastos y administrar presupuestos.", "footer": "SmartSpend · Crea mejores hábitos financieros, una decisión a la vez.", "confirmDelete": "¿Seguro que quieres eliminar", "openProfileSettings": "Abrir la configuración del perfil", "saveExpenseError": "No se pudo guardar el gasto. Comprueba que el servidor esté funcionando.", "backendChecking": "Comprobando conexión...", "allCategories": "Todas las categorías", "billsUtilities": "Facturas y servicios", "travel": "Viajes", "personalCare": "Cuidado personal", "deleteTransaction": "Eliminar transacción", "used": "utilizado", "left": "restante", "of": "de", "exampleLunch": "p. ej., almuerzo", "exampleAmount": "p. ej., 250", "insightDescription": "A medida que añadas transacciones, SmartSpend te ayudará a entender en qué gastas tu dinero.", "goodMorning": "Buenos días", "goodAfternoon": "Buenas tardes", "goodEvening": "Buenas noches"});
Object.assign(translations["French"], {"workspace": "Espace de travail", "spendSmarter": "Dépensez plus intelligemment.", "moneyHabits": "De petits pas aujourd’hui peuvent créer de meilleures habitudes financières demain.", "personalWorkspace": "Espace personnel", "financeOverview": "Vos finances en un coup d’œil", "manageFinances": "Gérez vos finances au même endroit.", "moneySummary": "Voici ce qui se passe avec votre argent.", "basedOnTransactions": "D’après les transactions ci-dessous", "monthlyLimit": "Votre limite mensuelle indicative", "budgetMinusSpending": "Budget moins les dépenses enregistrées", "allRecorded": "Toutes les transactions enregistrées", "spendingLastMonth": "Dépenses du mois dernier", "spendingThisMonth": "Dépenses de ce mois-ci", "thisMonth": "Ce mois-ci", "lastMonth": "Le mois dernier", "allTime": "Depuis toujours", "recordedExpenses": "D’après vos dépenses enregistrées", "spendingCalculated": "Dépenses calculées à partir de vos transactions enregistrées.", "latestExpenses": "Vos dépenses les plus récentes", "entries": "entrées", "yourSpendingLimit": "Votre limite de dépenses", "moneyInsight": "Aperçu de vos finances", "updateMonthlyBudget": "Mettre à jour le budget mensuel", "setSpendingLimit": "Définissez une limite de dépenses adaptée à vos besoins.", "monthlyBudgetLabel": "Budget mensuel", "enterAmount": "Saisissez un montant", "personaliseExperience": "PERSONNALISEZ VOTRE EXPÉRIENCE", "preferencesAccount": "Gérez vos préférences et votre compte.", "appearanceDescription": "Choisissez l’apparence de SmartSpend.", "themeDescription": "Passez du mode sombre au mode clair.", "profileDescription": "Gérez vos informations personnelles.", "enterName": "Saisissez votre nom", "profileSaved": "Profil enregistré avec succès.", "languageDescription": "Choisissez votre langue préférée.", "rememberLanguage": "Votre choix est enregistré sur cet appareil.", "helpDescription": "Une question ou un problème ? Écrivez ci-dessous.", "howHelp": "Comment pouvons-nous vous aider ?", "describeIssue": "Décrivez votre question ou votre problème...", "supportDemo": "Formulaire d’aide de démonstration : les messages sont enregistrés sur cet appareil et ne sont pas envoyés à l’équipe d’assistance.", "messageSaved": "Votre message a été enregistré sur cet appareil.", "aboutDescription": "Un projet personnel de suivi des dépenses et de gestion du budget.", "footer": "SmartSpend · Améliorez vos habitudes financières, une décision à la fois.", "confirmDelete": "Voulez-vous vraiment supprimer", "openProfileSettings": "Ouvrir les paramètres du profil", "saveExpenseError": "Impossible d’enregistrer la dépense. Vérifiez que le serveur fonctionne.", "backendChecking": "Vérification de la connexion...", "allCategories": "Toutes les catégories", "billsUtilities": "Factures et services", "travel": "Voyages", "personalCare": "Soins personnels", "deleteTransaction": "Supprimer la transaction", "used": "utilisé", "left": "restant", "of": "sur", "exampleLunch": "ex. : déjeuner", "exampleAmount": "ex. : 250", "insightDescription": "À mesure que vous ajoutez des transactions, SmartSpend vous aide à comprendre où va votre argent.", "goodMorning": "Bonjour", "goodAfternoon": "Bon après-midi", "goodEvening": "Bonsoir"});
Object.assign(translations["German"], {"workspace": "Arbeitsbereich", "spendSmarter": "Gib dein Geld klüger aus.", "moneyHabits": "Kleine Schritte heute können morgen bessere Finanzgewohnheiten schaffen.", "personalWorkspace": "Persönlicher Arbeitsbereich", "financeOverview": "Deine Finanzen auf einen Blick", "manageFinances": "Verwalte deine Finanzen an einem Ort.", "moneySummary": "Das passiert gerade mit deinem Geld.", "basedOnTransactions": "Basierend auf den folgenden Transaktionen", "monthlyLimit": "Dein beispielhaftes Monatslimit", "budgetMinusSpending": "Budget abzüglich erfasster Ausgaben", "allRecorded": "Alle erfassten Transaktionen", "spendingLastMonth": "Ausgaben im letzten Monat", "spendingThisMonth": "Ausgaben in diesem Monat", "thisMonth": "Dieser Monat", "lastMonth": "Letzter Monat", "allTime": "Gesamter Zeitraum", "recordedExpenses": "Basierend auf deinen erfassten Ausgaben", "spendingCalculated": "Ausgaben anhand deiner erfassten Transaktionen berechnet.", "latestExpenses": "Deine zuletzt erfassten Ausgaben", "entries": "Einträge", "yourSpendingLimit": "Dein Ausgabenlimit", "moneyInsight": "Dein Finanzüberblick", "updateMonthlyBudget": "Monatsbudget aktualisieren", "setSpendingLimit": "Lege ein Ausgabenlimit fest, das zu dir passt.", "monthlyBudgetLabel": "Monatsbudget", "enterAmount": "Betrag eingeben", "personaliseExperience": "PERSONALISIERE DEIN ERLEBNIS", "preferencesAccount": "Verwalte deine Einstellungen und dein Konto.", "appearanceDescription": "Wähle das Aussehen von SmartSpend.", "themeDescription": "Wechsle zwischen dunklem und hellem Modus.", "profileDescription": "Verwalte deine persönlichen Angaben.", "enterName": "Gib deinen Namen ein", "profileSaved": "Profil erfolgreich gespeichert.", "languageDescription": "Wähle deine bevorzugte Sprache.", "rememberLanguage": "Deine Auswahl wird auf diesem Gerät gespeichert.", "helpDescription": "Hast du eine Frage oder ein Problem? Schreib es unten.", "howHelp": "Wie können wir helfen?", "describeIssue": "Beschreibe deine Frage oder dein Problem...", "supportDemo": "Demo-Hilfeformular: Nachrichten werden lokal auf diesem Gerät gespeichert und nicht an ein Supportteam gesendet.", "messageSaved": "Deine Nachricht wurde auf diesem Gerät gespeichert.", "aboutDescription": "Ein persönliches Projekt zur Ausgabenverfolgung und Budgetplanung.", "footer": "SmartSpend · Entwickle bessere Geldgewohnheiten, eine Entscheidung nach der anderen.", "confirmDelete": "Möchtest du wirklich löschen", "openProfileSettings": "Profileinstellungen öffnen", "saveExpenseError": "Die Ausgabe konnte nicht gespeichert werden. Prüfe, ob das Backend läuft.", "backendChecking": "Verbindung wird geprüft...", "allCategories": "Alle Kategorien", "billsUtilities": "Rechnungen und Versorgungsleistungen", "travel": "Reisen", "personalCare": "Körperpflege", "deleteTransaction": "Transaktion löschen", "used": "verwendet", "left": "übrig", "of": "von", "exampleLunch": "z. B. Mittagessen", "exampleAmount": "z. B. 250", "insightDescription": "Wenn du Transaktionen hinzufügst, hilft SmartSpend dir zu verstehen, wofür du dein Geld ausgibst.", "goodMorning": "Guten Morgen", "goodAfternoon": "Guten Tag", "goodEvening": "Guten Abend"});
Object.assign(translations["Chinese"], {"workspace": "工作区", "spendSmarter": "更聪明地消费。", "moneyHabits": "今天迈出小小一步，明天就能养成更好的理财习惯。", "personalWorkspace": "个人工作区", "financeOverview": "一览您的财务状况", "manageFinances": "在一个地方管理您的财务。", "moneySummary": "看看您的资金状况。", "basedOnTransactions": "根据以下交易记录", "monthlyLimit": "参考月度限额", "budgetMinusSpending": "预算减去已记录支出", "allRecorded": "所有已记录的交易", "spendingLastMonth": "上个月的支出", "spendingThisMonth": "本月支出", "thisMonth": "本月", "lastMonth": "上个月", "allTime": "所有时间", "recordedExpenses": "根据已记录的支出", "spendingCalculated": "根据已记录的交易计算支出。", "latestExpenses": "最近记录的支出", "entries": "条记录", "yourSpendingLimit": "您的支出限额", "moneyInsight": "财务洞察", "updateMonthlyBudget": "更新月度预算", "setSpendingLimit": "设置适合您的支出限额。", "monthlyBudgetLabel": "月度预算", "enterAmount": "输入金额", "personaliseExperience": "个性化您的体验", "preferencesAccount": "管理您的偏好和账户。", "appearanceDescription": "选择 SmartSpend 的外观。", "themeDescription": "切换深色和浅色模式。", "profileDescription": "管理您的个人资料。", "enterName": "输入您的姓名", "profileSaved": "个人资料已成功保存。", "languageDescription": "选择您偏好的语言。", "rememberLanguage": "您的选择会保存在此设备上。", "helpDescription": "有问题或遇到困难？请在下方填写。", "howHelp": "我们能如何帮助您？", "describeIssue": "描述您的问题或遇到的困难……", "supportDemo": "演示帮助表单：消息仅保存在此设备上，不会发送给支持团队。", "messageSaved": "您的消息已保存在此设备上。", "aboutDescription": "一个用于个人支出跟踪和预算管理的项目。", "footer": "SmartSpend · 一次做出一个决定，逐步养成更好的理财习惯。", "confirmDelete": "确定要删除", "openProfileSettings": "打开个人资料设置", "backendChecking": "正在检查连接……", "allCategories": "所有类别", "billsUtilities": "账单和公用事业", "travel": "旅行", "personalCare": "个人护理", "deleteTransaction": "删除交易", "used": "已使用", "left": "剩余", "of": "共", "exampleLunch": "例如：午餐", "exampleAmount": "例如：250", "insightDescription": "添加交易后，SmartSpend 可以帮助您了解资金的去向。", "goodMorning": "早上好", "goodAfternoon": "下午好", "goodEvening": "晚上好"});
Object.assign(translations["Japanese"], {"workspace": "ワークスペース", "spendSmarter": "賢くお金を使いましょう。", "moneyHabits": "今日の小さな一歩が、明日のより良いお金の習慣につながります。", "personalWorkspace": "個人用ワークスペース", "financeOverview": "ひと目でわかる家計状況", "manageFinances": "お金の管理を一か所で行えます。", "moneySummary": "お金の状況を確認しましょう。", "basedOnTransactions": "以下の取引に基づく", "monthlyLimit": "参考月間上限", "budgetMinusSpending": "予算から記録済み支出を差し引いた金額", "allRecorded": "記録済みのすべての取引", "spendingLastMonth": "先月の支出", "spendingThisMonth": "今月の支出", "thisMonth": "今月", "lastMonth": "先月", "allTime": "全期間", "recordedExpenses": "記録された支出に基づく", "spendingCalculated": "記録された取引から算出した支出です。", "latestExpenses": "最近記録した支出", "entries": "件", "yourSpendingLimit": "支出上限", "moneyInsight": "お金に関する分析", "updateMonthlyBudget": "月間予算を更新", "setSpendingLimit": "自分に合った支出上限を設定しましょう。", "monthlyBudgetLabel": "月間予算", "enterAmount": "金額を入力", "personaliseExperience": "表示をカスタマイズ", "preferencesAccount": "設定とアカウントを管理します。", "appearanceDescription": "SmartSpend の外観を選択します。", "themeDescription": "ダークモードとライトモードを切り替えます。", "profileDescription": "個人情報を管理します。", "enterName": "名前を入力", "profileSaved": "プロフィールを保存しました。", "languageDescription": "使用する言語を選択します。", "rememberLanguage": "選択内容はこの端末に保存されます。", "helpDescription": "質問や問題がありますか？下に入力してください。", "howHelp": "どのようにお手伝いできますか？", "describeIssue": "質問や問題の内容を入力してください…", "supportDemo": "デモ用サポートフォーム：メッセージはこの端末に保存され、サポートチームには送信されません。", "messageSaved": "メッセージをこの端末に保存しました。", "aboutDescription": "個人の支出記録と予算管理のプロジェクトです。", "footer": "SmartSpend · 一つずつの選択で、より良いお金の習慣を。", "confirmDelete": "本当に削除しますか：", "openProfileSettings": "プロフィール設定を開く", "backendChecking": "接続を確認中…", "allCategories": "すべてのカテゴリ", "billsUtilities": "請求書・公共料金", "travel": "旅行", "personalCare": "パーソナルケア", "deleteTransaction": "取引を削除", "used": "使用済み", "left": "残り", "of": "のうち", "exampleLunch": "例：昼食", "exampleAmount": "例：250", "insightDescription": "取引を追加すると、SmartSpend が支出先の把握をサポートします。", "goodMorning": "おはようございます", "goodAfternoon": "こんにちは", "goodEvening": "こんばんは"});
Object.assign(translations["Korean"], {"workspace": "작업 공간", "spendSmarter": "더 현명하게 소비하세요.", "moneyHabits": "오늘의 작은 실천이 내일 더 나은 금융 습관을 만듭니다.", "personalWorkspace": "개인 작업 공간", "financeOverview": "한눈에 보는 재정 현황", "manageFinances": "한곳에서 재정을 관리하세요.", "moneySummary": "현재 자금 상황을 확인하세요.", "basedOnTransactions": "아래 거래 내역 기준", "monthlyLimit": "참고용 월간 한도", "budgetMinusSpending": "예산에서 기록된 지출을 뺀 금액", "allRecorded": "기록된 모든 거래", "spendingLastMonth": "지난달 지출", "spendingThisMonth": "이번 달 지출", "thisMonth": "이번 달", "lastMonth": "지난달", "allTime": "전체 기간", "recordedExpenses": "기록된 지출 기준", "spendingCalculated": "기록된 거래를 바탕으로 계산한 지출입니다.", "latestExpenses": "최근 기록된 지출", "entries": "개 항목", "yourSpendingLimit": "지출 한도", "moneyInsight": "재정 인사이트", "updateMonthlyBudget": "월간 예산 업데이트", "setSpendingLimit": "나에게 맞는 지출 한도를 설정하세요.", "monthlyBudgetLabel": "월간 예산", "enterAmount": "금액 입력", "personaliseExperience": "환경 설정 맞춤화", "preferencesAccount": "환경설정과 계정을 관리하세요.", "appearanceDescription": "SmartSpend의 모양을 선택하세요.", "themeDescription": "다크 모드와 라이트 모드를 전환하세요.", "profileDescription": "개인 정보를 관리하세요.", "enterName": "이름 입력", "profileSaved": "프로필이 저장되었습니다.", "languageDescription": "원하는 언어를 선택하세요.", "rememberLanguage": "선택한 언어는 이 기기에 저장됩니다.", "helpDescription": "질문이나 문제가 있나요? 아래에 작성하세요.", "howHelp": "무엇을 도와드릴까요?", "describeIssue": "질문이나 문제를 설명하세요...", "supportDemo": "데모 지원 양식: 메시지는 이 기기에 저장되며 지원팀으로 전송되지 않습니다.", "messageSaved": "메시지가 이 기기에 저장되었습니다.", "aboutDescription": "개인 지출 추적 및 예산 관리 프로젝트입니다.", "footer": "SmartSpend · 한 번에 하나씩 더 나은 금융 습관을 만들어 보세요.", "confirmDelete": "정말 삭제하시겠습니까?", "openProfileSettings": "프로필 설정 열기", "backendChecking": "연결 확인 중...", "allCategories": "모든 카테고리", "billsUtilities": "청구서 및 공과금", "travel": "여행", "personalCare": "개인 관리", "deleteTransaction": "거래 삭제", "used": "사용됨", "left": "남음", "of": "중", "exampleLunch": "예: 점심", "exampleAmount": "예: 250", "insightDescription": "거래를 추가하면 SmartSpend가 돈이 어디에 쓰이는지 파악하도록 도와줍니다.", "goodMorning": "좋은 아침입니다", "goodAfternoon": "안녕하세요", "goodEvening": "좋은 저녁입니다"});
Object.assign(translations["Portuguese"], {"workspace": "Espaço de trabalho", "spendSmarter": "Gaste com mais inteligência.", "moneyHabits": "Pequenos passos hoje podem criar melhores hábitos financeiros amanhã.", "personalWorkspace": "Espaço pessoal", "financeOverview": "Suas finanças em um relance", "manageFinances": "Gerencie suas finanças em um só lugar.", "moneySummary": "Veja o que está acontecendo com seu dinheiro.", "basedOnTransactions": "Com base nas transações abaixo", "monthlyLimit": "Seu limite mensal ilustrativo", "budgetMinusSpending": "Orçamento menos despesas registradas", "allRecorded": "Todas as transações registradas", "spendingLastMonth": "Despesas do mês passado", "spendingThisMonth": "Despesas deste mês", "thisMonth": "Este mês", "lastMonth": "Mês passado", "allTime": "Todo o período", "recordedExpenses": "Com base nas despesas registradas", "spendingCalculated": "Despesas calculadas a partir das transações registradas.", "latestExpenses": "Suas despesas registradas mais recentes", "entries": "registros", "yourSpendingLimit": "Seu limite de gastos", "moneyInsight": "Informações sobre seu dinheiro", "updateMonthlyBudget": "Atualizar orçamento mensal", "setSpendingLimit": "Defina um limite de gastos adequado para você.", "monthlyBudgetLabel": "Orçamento mensal", "enterAmount": "Insira o valor", "personaliseExperience": "PERSONALIZE SUA EXPERIÊNCIA", "preferencesAccount": "Gerencie suas preferências e sua conta.", "appearanceDescription": "Escolha a aparência do SmartSpend.", "themeDescription": "Alterne entre os modos escuro e claro.", "profileDescription": "Gerencie seus dados pessoais.", "enterName": "Digite seu nome", "profileSaved": "Perfil salvo com sucesso.", "languageDescription": "Escolha seu idioma preferido.", "rememberLanguage": "Sua escolha fica salva neste dispositivo.", "helpDescription": "Tem alguma dúvida ou problema? Escreva abaixo.", "howHelp": "Como podemos ajudar?", "describeIssue": "Descreva sua dúvida ou problema...", "supportDemo": "Formulário de suporte demonstrativo: as mensagens ficam salvas neste dispositivo e não são enviadas à equipe de suporte.", "messageSaved": "Sua mensagem foi salva neste dispositivo.", "aboutDescription": "Um projeto pessoal de acompanhamento de despesas e orçamento.", "footer": "SmartSpend · Crie hábitos financeiros melhores, uma decisão de cada vez.", "confirmDelete": "Tem certeza de que deseja excluir", "openProfileSettings": "Abrir configurações do perfil", "backendChecking": "Verificando conexão...", "allCategories": "Todas as categorias", "billsUtilities": "Contas e serviços", "travel": "Viagens", "personalCare": "Cuidados pessoais", "deleteTransaction": "Excluir transação", "used": "utilizado", "left": "restante", "of": "de", "exampleLunch": "ex.: almoço", "exampleAmount": "ex.: 250", "insightDescription": "Ao adicionar transações, o SmartSpend ajuda você a entender para onde vai seu dinheiro.", "goodMorning": "Bom dia", "goodAfternoon": "Boa tarde", "goodEvening": "Boa noite"});
Object.assign(translations["Thai"], {"workspace": "พื้นที่ทำงาน", "spendSmarter": "ใช้จ่ายอย่างชาญฉลาด", "moneyHabits": "ก้าวเล็ก ๆ ในวันนี้ช่วยสร้างนิสัยทางการเงินที่ดีขึ้นในวันพรุ่งนี้", "personalWorkspace": "พื้นที่ทำงานส่วนตัว", "financeOverview": "ภาพรวมการเงินของคุณ", "manageFinances": "จัดการการเงินของคุณได้ในที่เดียว", "moneySummary": "ดูความเคลื่อนไหวของเงินของคุณ", "basedOnTransactions": "อ้างอิงจากรายการด้านล่าง", "monthlyLimit": "วงเงินรายเดือนโดยประมาณ", "budgetMinusSpending": "งบประมาณหักค่าใช้จ่ายที่บันทึกไว้", "allRecorded": "รายการธุรกรรมทั้งหมด", "spendingLastMonth": "ค่าใช้จ่ายเดือนที่แล้ว", "spendingThisMonth": "ค่าใช้จ่ายเดือนนี้", "thisMonth": "เดือนนี้", "lastMonth": "เดือนที่แล้ว", "allTime": "ทั้งหมด", "recordedExpenses": "อ้างอิงจากค่าใช้จ่ายที่บันทึกไว้", "spendingCalculated": "คำนวณจากรายการธุรกรรมที่บันทึกไว้", "latestExpenses": "ค่าใช้จ่ายล่าสุด", "entries": "รายการ", "yourSpendingLimit": "วงเงินใช้จ่ายของคุณ", "moneyInsight": "ข้อมูลเชิงลึกทางการเงิน", "updateMonthlyBudget": "อัปเดตงบประมาณรายเดือน", "setSpendingLimit": "กำหนดวงเงินใช้จ่ายที่เหมาะกับคุณ", "monthlyBudgetLabel": "งบประมาณรายเดือน", "enterAmount": "ป้อนจำนวนเงิน", "personaliseExperience": "ปรับแต่งประสบการณ์ของคุณ", "preferencesAccount": "จัดการการตั้งค่าและบัญชีของคุณ", "appearanceDescription": "เลือกรูปลักษณ์ของ SmartSpend", "themeDescription": "สลับระหว่างโหมดมืดและโหมดสว่าง", "profileDescription": "จัดการข้อมูลส่วนตัวของคุณ", "enterName": "ป้อนชื่อของคุณ", "profileSaved": "บันทึกโปรไฟล์เรียบร้อยแล้ว", "languageDescription": "เลือกภาษาที่คุณต้องการ", "rememberLanguage": "ตัวเลือกของคุณจะถูกบันทึกไว้ในอุปกรณ์นี้", "helpDescription": "มีคำถามหรือปัญหาใช่ไหม เขียนด้านล่าง", "howHelp": "เราช่วยอะไรคุณได้บ้าง", "describeIssue": "อธิบายคำถามหรือปัญหาของคุณ...", "supportDemo": "แบบฟอร์มช่วยเหลือสาธิต: ข้อความจะถูกบันทึกในอุปกรณ์นี้และจะไม่ส่งไปยังทีมสนับสนุน", "messageSaved": "บันทึกข้อความของคุณไว้ในอุปกรณ์นี้แล้ว", "aboutDescription": "โปรเจกต์ติดตามค่าใช้จ่ายส่วนตัวและจัดทำงบประมาณ", "footer": "SmartSpend · สร้างนิสัยทางการเงินที่ดีขึ้น ทีละการตัดสินใจ", "confirmDelete": "คุณแน่ใจหรือไม่ว่าต้องการลบ", "openProfileSettings": "เปิดการตั้งค่าโปรไฟล์", "backendChecking": "กำลังตรวจสอบการเชื่อมต่อ...", "allCategories": "ทุกหมวดหมู่", "billsUtilities": "บิลและสาธารณูปโภค", "travel": "การเดินทาง", "personalCare": "การดูแลส่วนบุคคล", "deleteTransaction": "ลบรายการธุรกรรม", "used": "ใช้ไปแล้ว", "left": "คงเหลือ", "of": "จาก", "exampleLunch": "เช่น อาหารกลางวัน", "exampleAmount": "เช่น 250", "insightDescription": "เมื่อคุณเพิ่มรายการ SmartSpend จะช่วยให้เข้าใจว่าเงินของคุณใช้ไปกับอะไร", "goodMorning": "สวัสดีตอนเช้า", "goodAfternoon": "สวัสดีตอนบ่าย", "goodEvening": "สวัสดีตอนเย็น"});
Object.assign(translations["Russian"], {"workspace": "Рабочая область", "spendSmarter": "Тратьте разумнее.", "moneyHabits": "Небольшие шаги сегодня помогут сформировать лучшие финансовые привычки завтра.", "personalWorkspace": "Личное рабочее пространство", "financeOverview": "Ваши финансы с первого взгляда", "manageFinances": "Управляйте финансами в одном месте.", "moneySummary": "Вот что происходит с вашими деньгами.", "basedOnTransactions": "На основе транзакций ниже", "monthlyLimit": "Примерный месячный лимит", "budgetMinusSpending": "Бюджет за вычетом учтённых расходов", "allRecorded": "Все записанные транзакции", "spendingLastMonth": "Расходы за прошлый месяц", "spendingThisMonth": "Расходы за этот месяц", "thisMonth": "Этот месяц", "lastMonth": "Прошлый месяц", "allTime": "За всё время", "recordedExpenses": "На основе записанных расходов", "spendingCalculated": "Расходы рассчитаны по записанным транзакциям.", "latestExpenses": "Последние записанные расходы", "entries": "записей", "yourSpendingLimit": "Ваш лимит расходов", "moneyInsight": "Анализ ваших финансов", "updateMonthlyBudget": "Обновить месячный бюджет", "setSpendingLimit": "Установите подходящий вам лимит расходов.", "monthlyBudgetLabel": "Месячный бюджет", "enterAmount": "Введите сумму", "personaliseExperience": "НАСТРОЙТЕ ПРИЛОЖЕНИЕ ПОД СЕБЯ", "preferencesAccount": "Управляйте настройками и учётной записью.", "appearanceDescription": "Выберите внешний вид SmartSpend.", "themeDescription": "Переключайтесь между тёмным и светлым режимами.", "profileDescription": "Управляйте личными данными.", "enterName": "Введите имя", "profileSaved": "Профиль успешно сохранён.", "languageDescription": "Выберите предпочитаемый язык.", "rememberLanguage": "Ваш выбор сохраняется на этом устройстве.", "helpDescription": "Есть вопрос или проблема? Напишите ниже.", "howHelp": "Чем мы можем помочь?", "describeIssue": "Опишите вопрос или проблему...", "supportDemo": "Демонстрационная форма поддержки: сообщения сохраняются на этом устройстве и не отправляются команде поддержки.", "messageSaved": "Сообщение сохранено на этом устройстве.", "aboutDescription": "Личный проект для учёта расходов и планирования бюджета.", "footer": "SmartSpend · Формируйте полезные финансовые привычки шаг за шагом.", "confirmDelete": "Вы уверены, что хотите удалить", "openProfileSettings": "Открыть настройки профиля", "backendChecking": "Проверка подключения...", "allCategories": "Все категории", "billsUtilities": "Счета и коммунальные услуги", "travel": "Путешествия", "personalCare": "Личный уход", "deleteTransaction": "Удалить транзакцию", "used": "использовано", "left": "осталось", "of": "из", "exampleLunch": "например, обед", "exampleAmount": "например, 250", "insightDescription": "Добавляя транзакции, вы сможете лучше понимать, на что уходят ваши деньги.", "goodMorning": "Доброе утро", "goodAfternoon": "Добрый день", "goodEvening": "Добрый вечер"});
Object.assign(translations["Arabic"], {"workspace": "مساحة العمل", "spendSmarter": "أنفق بذكاء أكبر.", "moneyHabits": "خطوات صغيرة اليوم تساعد على بناء عادات مالية أفضل غدًا.", "personalWorkspace": "مساحة العمل الشخصية", "financeOverview": "نظرة سريعة على أموالك", "manageFinances": "أدر أموالك من مكان واحد.", "moneySummary": "إليك ما يحدث لأموالك.", "basedOnTransactions": "استنادًا إلى المعاملات أدناه", "monthlyLimit": "الحد الشهري التوضيحي", "budgetMinusSpending": "الميزانية بعد خصم النفقات المسجلة", "allRecorded": "جميع المعاملات المسجلة", "spendingLastMonth": "نفقات الشهر الماضي", "spendingThisMonth": "نفقات هذا الشهر", "thisMonth": "هذا الشهر", "lastMonth": "الشهر الماضي", "allTime": "كل الوقت", "recordedExpenses": "استنادًا إلى نفقاتك المسجلة", "spendingCalculated": "تم حساب الإنفاق من معاملاتك المسجلة.", "latestExpenses": "أحدث النفقات المسجلة", "entries": "إدخالات", "yourSpendingLimit": "حد الإنفاق الخاص بك", "moneyInsight": "نظرة على أموالك", "updateMonthlyBudget": "تحديث الميزانية الشهرية", "setSpendingLimit": "حدد حد إنفاق يناسبك.", "monthlyBudgetLabel": "الميزانية الشهرية", "enterAmount": "أدخل المبلغ", "personaliseExperience": "خصص تجربتك", "preferencesAccount": "أدر تفضيلاتك وحسابك.", "appearanceDescription": "اختر مظهر SmartSpend.", "themeDescription": "بدّل بين الوضع الداكن والفاتح.", "profileDescription": "أدر بياناتك الشخصية.", "enterName": "أدخل اسمك", "profileSaved": "تم حفظ الملف الشخصي بنجاح.", "languageDescription": "اختر لغتك المفضلة.", "rememberLanguage": "يتم حفظ اختيارك على هذا الجهاز.", "helpDescription": "هل لديك سؤال أو مشكلة؟ اكتبها أدناه.", "howHelp": "كيف يمكننا مساعدتك؟", "describeIssue": "صف سؤالك أو مشكلتك...", "supportDemo": "نموذج دعم تجريبي: تُحفظ الرسائل على هذا الجهاز ولا تُرسل إلى فريق الدعم.", "messageSaved": "تم حفظ رسالتك على هذا الجهاز.", "aboutDescription": "مشروع شخصي لتتبع النفقات وإدارة الميزانية.", "footer": "SmartSpend · ابنِ عادات مالية أفضل، قرارًا واحدًا في كل مرة.", "confirmDelete": "هل أنت متأكد أنك تريد حذف", "openProfileSettings": "فتح إعدادات الملف الشخصي", "backendChecking": "جارٍ التحقق من الاتصال...", "allCategories": "كل الفئات", "billsUtilities": "الفواتير والخدمات", "travel": "السفر", "personalCare": "العناية الشخصية", "deleteTransaction": "حذف المعاملة", "used": "مستخدم", "left": "متبقٍ", "of": "من", "exampleLunch": "مثال: الغداء", "exampleAmount": "مثال: 250", "insightDescription": "عند إضافة المعاملات، يساعدك SmartSpend على فهم أين تذهب أموالك.", "goodMorning": "صباح الخير", "goodAfternoon": "مساء الخير", "goodEvening": "مساء الخير"});

function App() {
  const [transactionToDelete, setTransactionToDelete] =
  useState<Transaction | null>(null)
  const [transactionToEdit, setTransactionToEdit] =
  useState<Transaction | null>(null)
  const [editName, setEditName] = useState('')
const [editAmount, setEditAmount] = useState('')
const [editCategory, setEditCategory] = useState('Food')
const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

const [theme, setTheme] = useState<'dark' | 'light'>(() => {
  return (localStorage.getItem('smartspend-theme') as 'dark' | 'light') || 'dark'
})

const [language, setLanguage] = useState(() => {
  return localStorage.getItem('smartspend-language') || 'English'
})
const extraTranslations: Record<string, Record<string, string>> = {
  Tamil: {
    used: 'பயன்படுத்தப்பட்டது', left: 'மீதம்', of: 'இல்',
    supportDemo: 'சோதனை உதவி படிவம்: செய்திகள் இந்தச் சாதனத்தில் மட்டுமே சேமிக்கப்படும். உதவிக் குழுவிற்கு அனுப்பப்படாது.',
    footer: 'SmartSpend · ஒவ்வொரு முடிவிலும் சிறந்த பணப் பழக்கங்களை உருவாக்குங்கள்.',
    insightDescription: 'நீங்கள் பரிவர்த்தனைகளைச் சேர்க்கும்போது, உங்கள் பணம் எங்கு செல்கிறது என்பதை SmartSpend புரிந்துகொள்ள உதவும்.',
    backendChecking: 'இணைப்பைச் சரிபார்க்கிறது...', backendFailed: 'இணைப்பு தோல்வியடைந்தது',
    yourSpendingLimit: 'உங்கள் செலவு வரம்பு', deleteTransactionQuestion: 'பரிவர்த்தனையை நீக்கவா?',
    testExpenses: 'சோதனைச் செலவுகள்', lunch: 'மதிய உணவு',
    groceryShopping: 'மளிகைப் பொருட்கள் வாங்குதல்', monthlySubscription: 'மாதாந்திர சந்தா',
    collegeCommute: 'கல்லூரிக்குச் செல்லும் பயணம்', cafeWithFriends: 'நண்பர்களுடன் கஃபே',
    healthy: 'நலமாக உள்ளது',
  },
  Kannada: {
    used: 'ಬಳಸಲಾಗಿದೆ', left: 'ಉಳಿದಿದೆ', of: 'ರಲ್ಲಿ',
    supportDemo: 'ಪರೀಕ್ಷಾ ಸಹಾಯ ನಮೂನೆ: ಸಂದೇಶಗಳು ಈ ಸಾಧನದಲ್ಲೇ ಉಳಿಸಲಾಗುತ್ತವೆ. ಸಹಾಯ ತಂಡಕ್ಕೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ.',
    footer: 'SmartSpend · ಪ್ರತಿಯೊಂದು ನಿರ್ಧಾರದಲ್ಲೂ ಉತ್ತಮ ಹಣದ ಅಭ್ಯಾಸಗಳನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.',
    insightDescription: 'ನೀವು ವಹಿವಾಟುಗಳನ್ನು ಸೇರಿಸಿದಂತೆ, ನಿಮ್ಮ ಹಣ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ ಎಂಬುದನ್ನು SmartSpend ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    yourSpendingLimit: 'ನಿಮ್ಮ ಖರ್ಚಿನ ಮಿತಿ', deleteTransactionQuestion: 'ವಹಿವಾಟನ್ನು ಅಳಿಸಬೇಕೇ?',
    lunch: 'ಮಧ್ಯಾಹ್ನದ ಊಟ', groceryShopping: 'ದಿನಸಿ ಖರೀದಿ', monthlySubscription: 'ಮಾಸಿಕ ಚಂದಾದಾರಿಕೆ',
    collegeCommute: 'ಕಾಲೇಜಿಗೆ ಪ್ರಯಾಣ', cafeWithFriends: 'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಕೆಫೆ', healthy: 'ಆರೋಗ್ಯಕರ',
  },
  Hindi: {
    used: 'उपयोग हुआ', left: 'शेष', of: 'में से',
    supportDemo: 'डेमो सहायता फ़ॉर्म: संदेश इस डिवाइस पर ही सहेजे जाते हैं। इन्हें सहायता टीम को नहीं भेजा जाता।',
    footer: 'SmartSpend · हर निर्णय के साथ पैसे की बेहतर आदतें बनाएँ।',
    insightDescription: 'लेन-देन जोड़ने पर SmartSpend आपको समझने में मदद करता है कि आपका पैसा कहाँ खर्च होता है।',
    yourSpendingLimit: 'आपकी खर्च सीमा', deleteTransactionQuestion: 'लेन-देन हटाएँ?',
    lunch: 'दोपहर का भोजन', groceryShopping: 'किराने की खरीदारी', monthlySubscription: 'मासिक सदस्यता',
    collegeCommute: 'कॉलेज आने-जाने का खर्च', cafeWithFriends: 'दोस्तों के साथ कैफ़े', healthy: 'स्वस्थ',
  },
}
const moreTranslations: Record<string, Record<string, string>> = {
  English: {},
  Kannada: {
    moneyHabits:'ಇಂದಿನ ಸಣ್ಣ ಹೆಜ್ಜೆಗಳು ನಾಳೆ ಉತ್ತಮ ಹಣಕಾಸಿನ ಅಭ್ಯಾಸಗಳನ್ನು ಬೆಳೆಸುತ್ತವೆ.', supportDemo:'ಡೆಮೊ ಸಹಾಯ ನಮೂನೆ: ಸಂದೇಶಗಳು ಈ ಸಾಧನದಲ್ಲೇ ಉಳಿಯುತ್ತವೆ. ಅವು ಸಹಾಯ ತಂಡಕ್ಕೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ.', confirmDelete:'ನೀವು ಇದನ್ನು ಅಳಿಸಲು ಖಚಿತವೇ?', backendChecking:'ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...', insightDescription:'ನೀವು ವಹಿವಾಟುಗಳನ್ನು ಸೇರಿಸಿದಂತೆ, ನಿಮ್ಮ ಹಣ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು SmartSpend ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    spendingLastMonth:'ಕಳೆದ ತಿಂಗಳ ಖರ್ಚು', spendingThisMonth:'ಈ ತಿಂಗಳ ಖರ್ಚು', allTime:'ಎಲ್ಲಾ ಅವಧಿ', recordedExpenses:'ನೀವು ದಾಖಲಿಸಿದ ಖರ್ಚುಗಳ ಆಧಾರದಲ್ಲಿ', latestExpenses:'ನೀವು ಇತ್ತೀಚೆಗೆ ದಾಖಲಿಸಿದ ಖರ್ಚುಗಳು', entries:'ದಾಖಲೆಗಳು',
    testExpenses:'ಪರೀಕ್ಷಾ ವೆಚ್ಚಗಳು', lunch:'ಮಧ್ಯಾಹ್ನದ ಊಟ', groceryShopping:'ದಿನಸಿ ಖರೀದಿ', monthlySubscription:'ಮಾಸಿಕ ಚಂದಾದಾರಿಕೆ', collegeCommute:'ಕಾಲೇಜಿಗೆ ಪ್ರಯಾಣ', cafeWithFriends:'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಕೆಫೆ', healthy:'ಆರೋಗ್ಯಕರ'
  },
  Hindi: {
    moneyHabits:'आज के छोटे कदम कल पैसे की बेहतर आदतें बना सकते हैं।', supportDemo:'डेमो सहायता फ़ॉर्म: संदेश इसी डिवाइस पर सहेजे जाते हैं। वे सहायता टीम को नहीं भेजे जाते।', confirmDelete:'क्या आप वाकई इसे हटाना चाहते हैं?', backendChecking:'कनेक्शन जाँचा जा रहा है...', insightDescription:'लेन-देन जोड़ने पर SmartSpend आपको समझने में मदद करता है कि आपका पैसा कहाँ खर्च होता है।', spendingLastMonth:'पिछले महीने का खर्च', spendingThisMonth:'इस महीने का खर्च', allTime:'सभी समय', recordedExpenses:'दर्ज किए गए खर्चों के आधार पर', latestExpenses:'आपके हाल ही में दर्ज खर्च', entries:'प्रविष्टियाँ', testExpenses:'परीक्षण खर्च', lunch:'दोपहर का भोजन', groceryShopping:'किराने की खरीदारी', monthlySubscription:'मासिक सदस्यता', collegeCommute:'कॉलेज आने-जाने का खर्च', cafeWithFriends:'दोस्तों के साथ कैफ़े', healthy:'स्वस्थ'
  },
  Tamil: {
    moneyHabits:'இன்றைய சிறிய படிகள் நாளை சிறந்த பணப் பழக்கங்களை உருவாக்கும்.', supportDemo:'சோதனை உதவி படிவம்: செய்திகள் இந்தச் சாதனத்தில் மட்டுமே சேமிக்கப்படும். உதவிக் குழுவிற்கு அனுப்பப்படாது.', confirmDelete:'இதை நீக்க விரும்புகிறீர்களா?', backendChecking:'இணைப்பைச் சரிபார்க்கிறது...', spendingLastMonth:'கடந்த மாதச் செலவு', spendingThisMonth:'இந்த மாதச் செலவு', allTime:'எல்லா காலமும்', recordedExpenses:'பதிவுசெய்யப்பட்ட செலவுகளின் அடிப்படையில்', latestExpenses:'சமீபத்தில் பதிவுசெய்த செலவுகள்', entries:'பதிவுகள்', testExpenses:'சோதனைச் செலவுகள்', lunch:'மதிய உணவு', groceryShopping:'மளிகைப் பொருட்கள் வாங்குதல்', monthlySubscription:'மாதாந்திர சந்தா', collegeCommute:'கல்லூரிக்குச் செல்லும் பயணம்', cafeWithFriends:'நண்பர்களுடன் கஃபே', healthy:'நலமாக உள்ளது'
  },
  Telugu: {
    workspace:'పని ప్రదేశం', spendSmarter:'తెలివిగా ఖర్చు చేయండి.', moneyHabits:'ఈ రోజు చిన్న అడుగులు రేపు మెరుగైన డబ్బు అలవాట్లను పెంపొందిస్తాయి.', personalWorkspace:'వ్యక్తిగత పని ప్రదేశం', financeOverview:'మీ ఆర్థిక పరిస్థితి ఒక్క చూపులో', manageFinances:'మీ ఆర్థిక వ్యవహారాలను ఒకే చోట నిర్వహించండి.', moneySummary:'మీ డబ్బు పరిస్థితి ఇదిగో.', basedOnTransactions:'క్రింది లావాదేవీల ఆధారంగా', monthlyLimit:'మీ నెలవారీ పరిమితి', budgetMinusSpending:'బడ్జెట్‌లో మిగిలిన మొత్తం', allRecorded:'నమోదైన అన్ని లావాదేవీలు', spendingLastMonth:'గత నెల ఖర్చు', spendingThisMonth:'ఈ నెల ఖర్చు', thisMonth:'ఈ నెల', lastMonth:'గత నెల', allTime:'మొత్తం కాలం', recordedExpenses:'మీరు నమోదు చేసిన ఖర్చుల ఆధారంగా', spendingCalculated:'నమోదైన లావాదేవీల ఆధారంగా ఖర్చు లెక్కించబడింది.', latestExpenses:'మీరు ఇటీవల నమోదు చేసిన ఖర్చులు', entries:'నమోదులు', editBudget:'బడ్జెట్‌ను సవరించండి', yourSpendingLimit:'మీ ఖర్చు పరిమితి', moneyInsight:'మీ డబ్బు విశ్లేషణ', updateMonthlyBudget:'నెలవారీ బడ్జెట్‌ను నవీకరించండి', setSpendingLimit:'మీకు సరిపోయే ఖర్చు పరిమితిని నిర్ణయించండి.', monthlyBudgetLabel:'నెలవారీ బడ్జెట్', enterAmount:'మొత్తాన్ని నమోదు చేయండి', personaliseExperience:'మీ అనుభవాన్ని వ్యక్తిగతీకరించండి', preferencesAccount:'మీ ప్రాధాన్యతలు మరియు ఖాతాను నిర్వహించండి.', appearanceDescription:'SmartSpend రూపాన్ని ఎంచుకోండి.', themeDescription:'డార్క్ మరియు లైట్ మోడ్‌ల మధ్య మారండి.', profileDescription:'మీ వ్యక్తిగత వివరాలను నిర్వహించండి.', enterName:'మీ పేరును నమోదు చేయండి', profileSaved:'ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది.', languageDescription:'మీకు ఇష్టమైన భాషను ఎంచుకోండి.', rememberLanguage:'మీ ఎంపిక ఈ పరికరంలో సేవ్ చేయబడుతుంది.', helpDescription:'ప్రశ్న లేదా సమస్య ఉందా? క్రింద రాయండి.', howHelp:'మేము ఎలా సహాయం చేయగలం?', describeIssue:'మీ ప్రశ్న లేదా సమస్యను వివరించండి...', supportDemo:'డెమో సహాయ ఫారం: సందేశాలు ఈ పరికరంలోనే నిల్వ చేయబడతాయి. సహాయ బృందానికి పంపబడవు.', messageSaved:'మీ సందేశం ఈ పరికరంలో సేవ్ చేయబడింది.', aboutDescription:'వ్యక్తిగత ఖర్చుల ట్రాకింగ్ మరియు బడ్జెట్ ప్రాజెక్ట్.', footer:'SmartSpend · ప్రతి నిర్ణయంతో మెరుగైన డబ్బు అలవాట్లను పెంచుకోండి.', deleteTransactionQuestion:'లావాదేవీని తొలగించాలా?', confirmDelete:'మీరు దీన్ని తొలగించాలనుకుంటున్నారా?', backendChecking:'కనెక్షన్‌ను తనిఖీ చేస్తోంది...', backendFailed:'కనెక్షన్ విఫలమైంది', allCategories:'అన్ని వర్గాలు', billsUtilities:'బిల్లులు మరియు యుటిలిటీలు', travel:'ప్రయాణం', personalCare:'వ్యక్తిగత సంరక్షణ', deleteTransaction:'లావాదేవీని తొలగించండి', used:'వాడారు', left:'మిగిలింది', of:'లో', exampleLunch:'ఉదా. మధ్యాహ్న భోజనం', exampleAmount:'ఉదా. 250', insightDescription:'మీరు లావాదేవీలను జోడించినప్పుడు, మీ డబ్బు ఎక్కడ ఖర్చవుతుందో అర్థం చేసుకోవడానికి SmartSpend సహాయపడుతుంది.', goodMorning:'శుభోదయం', goodAfternoon:'శుభ మధ్యాహ్నం', goodEvening:'శుభ సాయంత్రం', testExpenses:'పరీక్షా ఖర్చులు', lunch:'మధ్యాహ్న భోజనం', groceryShopping:'కిరాణా కొనుగోలు', monthlySubscription:'నెలవారీ చందా', collegeCommute:'కళాశాలకు ప్రయాణం', cafeWithFriends:'స్నేహితులతో కేఫే', healthy:'ఆరోగ్యంగా ఉంది'
  },
  Malayalam: {
    workspace:'പ്രവർത്തനമേഖല', spendSmarter:'ബുദ്ധിപൂർവ്വം ചെലവഴിക്കൂ.', moneyHabits:'ഇന്നത്തെ ചെറിയ ചുവടുകൾ നാളെ മികച്ച സാമ്പത്തിക ശീലങ്ങൾ വളർത്തും.', personalWorkspace:'വ്യക്തിഗത പ്രവർത്തനമേഖല', financeOverview:'നിങ്ങളുടെ സാമ്പത്തിക സ്ഥിതി ഒറ്റനോട്ടത്തിൽ', manageFinances:'നിങ്ങളുടെ സാമ്പത്തിക കാര്യങ്ങൾ ഒരിടത്ത് നിയന്ത്രിക്കുക.', moneySummary:'നിങ്ങളുടെ പണവുമായി ബന്ധപ്പെട്ട കാര്യങ്ങൾ ഇവിടെ കാണാം.', basedOnTransactions:'താഴെയുള്ള ഇടപാടുകളുടെ അടിസ്ഥാനത്തിൽ', monthlyLimit:'നിങ്ങളുടെ മാസപരിധി', budgetMinusSpending:'ചെലവുകൾക്കുശേഷമുള്ള ബജറ്റ്', allRecorded:'രേഖപ്പെടുത്തിയ എല്ലാ ഇടപാടുകളും', spendingLastMonth:'കഴിഞ്ഞ മാസത്തെ ചെലവ്', spendingThisMonth:'ഈ മാസത്തെ ചെലവ്', thisMonth:'ഈ മാസം', lastMonth:'കഴിഞ്ഞ മാസം', allTime:'എല്ലാ കാലവും', recordedExpenses:'രേഖപ്പെടുത്തിയ ചെലവുകളുടെ അടിസ്ഥാനത്തിൽ', spendingCalculated:'രേഖപ്പെടുത്തിയ ഇടപാടുകളിൽ നിന്ന് കണക്കാക്കിയ ചെലവ്.', latestExpenses:'നിങ്ങൾ അടുത്തിടെ രേഖപ്പെടുത്തിയ ചെലവുകൾ', entries:'എൻട്രികൾ', editBudget:'ബജറ്റ് തിരുത്തുക', yourSpendingLimit:'നിങ്ങളുടെ ചെലവ് പരിധി', moneyInsight:'നിങ്ങളുടെ സാമ്പത്തിക അവലോകനം', updateMonthlyBudget:'മാസ ബജറ്റ് പുതുക്കുക', setSpendingLimit:'നിങ്ങൾക്ക് അനുയോജ്യമായ ചെലവ് പരിധി നിശ്ചയിക്കുക.', monthlyBudgetLabel:'മാസ ബജറ്റ്', enterAmount:'തുക നൽകുക', personaliseExperience:'നിങ്ങളുടെ അനുഭവം വ്യക്തിഗതമാക്കുക', preferencesAccount:'നിങ്ങളുടെ മുൻഗണനകളും അക്കൗണ്ടും നിയന്ത്രിക്കുക.', appearanceDescription:'SmartSpend എങ്ങനെ കാണണമെന്ന് തിരഞ്ഞെടുക്കുക.', themeDescription:'ഇരുണ്ടതും വെളിച്ചമുള്ളതുമായ മോഡുകൾക്കിടയിൽ മാറുക.', profileDescription:'നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ നിയന്ത്രിക്കുക.', enterName:'നിങ്ങളുടെ പേര് നൽകുക', profileSaved:'പ്രൊഫൈൽ വിജയകരമായി സംരക്ഷിച്ചു.', languageDescription:'നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക.', rememberLanguage:'നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് ഈ ഉപകരണത്തിൽ സൂക്ഷിക്കും.', helpDescription:'ചോദ്യമോ പ്രശ്നമോ ഉണ്ടോ? താഴെ എഴുതുക.', howHelp:'ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും?', describeIssue:'നിങ്ങളുടെ ചോദ്യം അല്ലെങ്കിൽ പ്രശ്നം വിശദീകരിക്കുക...', supportDemo:'ഡെമോ സഹായ ഫോം: സന്ദേശങ്ങൾ ഈ ഉപകരണത്തിൽ മാത്രമേ സൂക്ഷിക്കൂ. സഹായസംഘത്തിന് അയയ്ക്കില്ല.', messageSaved:'നിങ്ങളുടെ സന്ദേശം ഈ ഉപകരണത്തിൽ സംരക്ഷിച്ചു.', aboutDescription:'വ്യക്തിഗത ചെലവ് നിരീക്ഷണവും ബജറ്റിംഗും ചെയ്യുന്ന പദ്ധതി.', footer:'SmartSpend · ഓരോ തീരുമാനത്തിലൂടെയും മികച്ച പണശീലങ്ങൾ വളർത്തൂ.', deleteTransactionQuestion:'ഇടപാട് നീക്കണോ?', confirmDelete:'ഇത് നീക്കണമെന്ന് ഉറപ്പാണോ?', backendChecking:'കണക്ഷൻ പരിശോധിക്കുന്നു...', backendFailed:'കണക്ഷൻ പരാജയപ്പെട്ടു', allCategories:'എല്ലാ വിഭാഗങ്ങളും', billsUtilities:'ബില്ലുകളും യൂട്ടിലിറ്റികളും', travel:'യാത്ര', personalCare:'വ്യക്തിഗത പരിചരണം', deleteTransaction:'ഇടപാട് നീക്കുക', used:'ഉപയോഗിച്ചു', left:'ബാക്കി', of:'ൽ', exampleLunch:'ഉദാ. ഉച്ചഭക്ഷണം', exampleAmount:'ഉദാ. 250', insightDescription:'ഇടപാടുകൾ ചേർക്കുമ്പോൾ പണം എവിടേക്ക് പോകുന്നു എന്ന് മനസ്സിലാക്കാൻ SmartSpend സഹായിക്കും.', goodMorning:'സുപ്രഭാതം', goodAfternoon:'ശുഭ ഉച്ച', goodEvening:'ശുഭ സായാഹ്നം', testExpenses:'പരീക്ഷണ ചെലവുകൾ', lunch:'ഉച്ചഭക്ഷണം', groceryShopping:'പലചരക്ക് വാങ്ങൽ', monthlySubscription:'പ്രതിമാസ സബ്‌സ്‌ക്രിപ്ഷൻ', collegeCommute:'കോളേജിലേക്കുള്ള യാത്ര', cafeWithFriends:'സുഹൃത്തുക്കളോടൊപ്പം കഫേ', healthy:'ആരോഗ്യകരം'
  },
  Bengali: {
    workspace:'কর্মক্ষেত্র', spendSmarter:'বুদ্ধিমত্তার সঙ্গে খরচ করুন।', moneyHabits:'আজকের ছোট পদক্ষেপ আগামী দিনে ভালো আর্থিক অভ্যাস গড়ে তোলে।', personalWorkspace:'ব্যক্তিগত কর্মক্ষেত্র', financeOverview:'এক নজরে আপনার আর্থিক অবস্থা', manageFinances:'এক জায়গায় আপনার অর্থ পরিচালনা করুন।', moneySummary:'আপনার অর্থের অবস্থা এখানে দেখুন।', basedOnTransactions:'নিচের লেনদেনের ভিত্তিতে', monthlyLimit:'আপনার মাসিক সীমা', budgetMinusSpending:'খরচ বাদে অবশিষ্ট বাজেট', allRecorded:'সব নথিভুক্ত লেনদেন', spendingLastMonth:'গত মাসের খরচ', spendingThisMonth:'এই মাসের খরচ', thisMonth:'এই মাস', lastMonth:'গত মাস', allTime:'সর্বকাল', recordedExpenses:'নথিভুক্ত খরচের ভিত্তিতে', spendingCalculated:'নথিভুক্ত লেনদেন থেকে হিসাব করা খরচ।', latestExpenses:'আপনার সাম্প্রতিক নথিভুক্ত খরচ', entries:'টি এন্ট্রি', editBudget:'বাজেট সম্পাদনা করুন', yourSpendingLimit:'আপনার খরচের সীমা', moneyInsight:'আপনার অর্থের বিশ্লেষণ', updateMonthlyBudget:'মাসিক বাজেট আপডেট করুন', setSpendingLimit:'আপনার উপযোগী খরচের সীমা নির্ধারণ করুন।', monthlyBudgetLabel:'মাসিক বাজেট', enterAmount:'পরিমাণ লিখুন', personaliseExperience:'আপনার অভিজ্ঞতা ব্যক্তিগত করুন', preferencesAccount:'আপনার পছন্দ ও অ্যাকাউন্ট পরিচালনা করুন।', appearanceDescription:'SmartSpend-এর চেহারা বেছে নিন।', themeDescription:'ডার্ক ও লাইট মোডের মধ্যে বদলান।', profileDescription:'আপনার ব্যক্তিগত তথ্য পরিচালনা করুন।', enterName:'আপনার নাম লিখুন', profileSaved:'প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে।', languageDescription:'আপনার পছন্দের ভাষা বেছে নিন।', rememberLanguage:'আপনার পছন্দ এই ডিভাইসে সংরক্ষিত থাকবে।', helpDescription:'প্রশ্ন বা সমস্যা আছে? নিচে লিখুন।', howHelp:'আমরা কীভাবে সাহায্য করতে পারি?', describeIssue:'আপনার প্রশ্ন বা সমস্যা লিখুন...', supportDemo:'ডেমো সহায়তা ফর্ম: বার্তাগুলি এই ডিভাইসেই সংরক্ষিত হয়। সহায়তা দলের কাছে পাঠানো হয় না।', messageSaved:'আপনার বার্তা এই ডিভাইসে সংরক্ষিত হয়েছে।', aboutDescription:'ব্যক্তিগত খরচ ট্র্যাকিং ও বাজেট তৈরির প্রকল্প।', footer:'SmartSpend · প্রতিটি সিদ্ধান্তে ভালো অর্থনৈতিক অভ্যাস গড়ে তুলুন।', deleteTransactionQuestion:'লেনদেন মুছবেন?', confirmDelete:'আপনি কি নিশ্চিত যে এটি মুছতে চান?', backendChecking:'সংযোগ পরীক্ষা করা হচ্ছে...', backendFailed:'সংযোগ ব্যর্থ', allCategories:'সব বিভাগ', billsUtilities:'বিল ও পরিষেবা', travel:'ভ্রমণ', personalCare:'ব্যক্তিগত যত্ন', deleteTransaction:'লেনদেন মুছুন', used:'ব্যবহৃত', left:'বাকি', of:'এর মধ্যে', exampleLunch:'যেমন দুপুরের খাবার', exampleAmount:'যেমন ২৫০', insightDescription:'লেনদেন যোগ করলে আপনার টাকা কোথায় খরচ হচ্ছে তা বুঝতে SmartSpend সাহায্য করবে।', goodMorning:'সুপ্রভাত', goodAfternoon:'শুভ অপরাহ্ন', goodEvening:'শুভ সন্ধ্যা', testExpenses:'পরীক্ষামূলক খরচ', lunch:'দুপুরের খাবার', groceryShopping:'মুদিখানার কেনাকাটা', monthlySubscription:'মাসিক সাবস্ক্রিপশন', collegeCommute:'কলেজ যাতায়াত', cafeWithFriends:'বন্ধুদের সঙ্গে ক্যাফে', healthy:'সুস্থ'
  },
  Marathi: {
    workspace:'कार्यस्थळ', spendSmarter:'समजूतदारपणे खर्च करा.', moneyHabits:'आजची छोटी पावले उद्या पैशांच्या चांगल्या सवयी घडवतात.', personalWorkspace:'वैयक्तिक कार्यस्थळ', financeOverview:'तुमची आर्थिक स्थिती एका नजरेत', manageFinances:'तुमचे आर्थिक व्यवहार एकाच ठिकाणी सांभाळा.', moneySummary:'तुमच्या पैशांबाबत काय घडत आहे ते येथे पाहा.', basedOnTransactions:'खालील व्यवहारांवर आधारित', monthlyLimit:'तुमची मासिक मर्यादा', budgetMinusSpending:'खर्च वजा केल्यानंतर उरलेले बजेट', allRecorded:'सर्व नोंदवलेले व्यवहार', spendingLastMonth:'मागील महिन्याचा खर्च', spendingThisMonth:'या महिन्याचा खर्च', thisMonth:'हा महिना', lastMonth:'मागील महिना', allTime:'सर्व काळ', recordedExpenses:'नोंदवलेल्या खर्चावर आधारित', spendingCalculated:'नोंदवलेल्या व्यवहारांवरून मोजलेला खर्च.', latestExpenses:'अलीकडे नोंदवलेले खर्च', entries:'नोंदी', editBudget:'बजेट संपादित करा', yourSpendingLimit:'तुमची खर्च मर्यादा', moneyInsight:'तुमच्या पैशांचा आढावा', updateMonthlyBudget:'मासिक बजेट अद्ययावत करा', setSpendingLimit:'तुमच्यासाठी योग्य खर्च मर्यादा ठरवा.', monthlyBudgetLabel:'मासिक बजेट', enterAmount:'रक्कम टाका', personaliseExperience:'तुमचा अनुभव वैयक्तिक करा', preferencesAccount:'तुमच्या पसंती आणि खाते व्यवस्थापित करा.', appearanceDescription:'SmartSpend चे स्वरूप निवडा.', themeDescription:'डार्क आणि लाइट मोडमध्ये बदला.', profileDescription:'तुमची वैयक्तिक माहिती व्यवस्थापित करा.', enterName:'तुमचे नाव टाका', profileSaved:'प्रोफाइल यशस्वीरित्या जतन केले.', languageDescription:'तुमची पसंतीची भाषा निवडा.', rememberLanguage:'तुमची निवड या डिव्हाइसवर जतन केली जाईल.', helpDescription:'प्रश्न किंवा समस्या आहे? खाली लिहा.', howHelp:'आम्ही कशी मदत करू शकतो?', describeIssue:'तुमचा प्रश्न किंवा समस्या लिहा...', supportDemo:'डेमो मदत फॉर्म: संदेश या डिव्हाइसवरच जतन होतात. ते मदत पथकाला पाठवले जात नाहीत.', messageSaved:'तुमचा संदेश या डिव्हाइसवर जतन झाला.', aboutDescription:'वैयक्तिक खर्च नोंदवणे आणि बजेट तयार करण्याचा प्रकल्प.', footer:'SmartSpend · प्रत्येक निर्णयातून पैशांच्या चांगल्या सवयी घडवा.', deleteTransactionQuestion:'व्यवहार हटवायचा?', confirmDelete:'तुम्हाला हे हटवायचे आहे याची खात्री आहे का?', backendChecking:'कनेक्शन तपासत आहे...', backendFailed:'कनेक्शन अयशस्वी', allCategories:'सर्व श्रेणी', billsUtilities:'बिले आणि सेवा', travel:'प्रवास', personalCare:'वैयक्तिक काळजी', deleteTransaction:'व्यवहार हटवा', used:'वापरले', left:'शिल्लक', of:'पैकी', exampleLunch:'उदा. दुपारचे जेवण', exampleAmount:'उदा. २५०', insightDescription:'तुम्ही व्यवहार जोडल्यावर पैसे कुठे खर्च होतात हे समजून घेण्यासाठी SmartSpend मदत करेल.', goodMorning:'शुभ प्रभात', goodAfternoon:'शुभ दुपार', goodEvening:'शुभ संध्याकाळ', testExpenses:'चाचणी खर्च', lunch:'दुपारचे जेवण', groceryShopping:'किराणा खरेदी', monthlySubscription:'मासिक सदस्यता', collegeCommute:'कॉलेज प्रवास', cafeWithFriends:'मित्रांसोबत कॅफे', healthy:'निरोगी'
  },
  Gujarati: {
    workspace:'કાર્યસ્થળ', spendSmarter:'સમજદારીથી ખર્ચ કરો.', moneyHabits:'આજનાં નાનાં પગલાં આવતીકાલે પૈસાની સારી આદતો બનાવે છે.', personalWorkspace:'વ્યક્તિગત કાર્યસ્થળ', financeOverview:'તમારી નાણાકીય સ્થિતિ એક નજરમાં', manageFinances:'તમારી નાણાકીય બાબતો એક જ જગ્યાએ સંભાળો.', moneySummary:'તમારા પૈસાની સ્થિતિ અહીં જુઓ.', basedOnTransactions:'નીચેના વ્યવહારોના આધારે', monthlyLimit:'તમારી માસિક મર્યાદા', budgetMinusSpending:'ખર્ચ બાદ બાકી બજેટ', allRecorded:'બધા નોંધાયેલા વ્યવહારો', spendingLastMonth:'ગયા મહિનાનો ખર્ચ', spendingThisMonth:'આ મહિનાનો ખર્ચ', thisMonth:'આ મહિનો', lastMonth:'ગયા મહિને', allTime:'બધા સમય માટે', recordedExpenses:'નોંધાયેલા ખર્ચના આધારે', spendingCalculated:'નોંધાયેલા વ્યવહારો પરથી ગણેલો ખર્ચ.', latestExpenses:'તમારા તાજેતરમાં નોંધાયેલા ખર્ચ', entries:'નોંધો', editBudget:'બજેટમાં ફેરફાર કરો', yourSpendingLimit:'તમારી ખર્ચ મર્યાદા', moneyInsight:'તમારા પૈસાની સમજ', updateMonthlyBudget:'માસિક બજેટ અપડેટ કરો', setSpendingLimit:'તમારા માટે યોગ્ય ખર્ચ મર્યાદા નક્કી કરો.', monthlyBudgetLabel:'માસિક બજેટ', enterAmount:'રકમ દાખલ કરો', personaliseExperience:'તમારો અનુભવ વ્યક્તિગત બનાવો', preferencesAccount:'તમારી પસંદગીઓ અને ખાતું સંભાળો.', appearanceDescription:'SmartSpend કેવું દેખાય તે પસંદ કરો.', themeDescription:'ડાર્ક અને લાઇટ મોડ વચ્ચે બદલો.', profileDescription:'તમારી વ્યક્તિગત વિગતો સંભાળો.', enterName:'તમારું નામ દાખલ કરો', profileSaved:'પ્રોફાઇલ સફળતાપૂર્વક સાચવાઈ.', languageDescription:'તમારી પસંદગીની ભાષા પસંદ કરો.', rememberLanguage:'તમારી પસંદગી આ ઉપકરણમાં સાચવાશે.', helpDescription:'પ્રશ્ન કે સમસ્યા છે? નીચે લખો.', howHelp:'અમે કેવી રીતે મદદ કરી શકીએ?', describeIssue:'તમારો પ્રશ્ન અથવા સમસ્યા લખો...', supportDemo:'ડેમો સહાય ફોર્મ: સંદેશા આ ઉપકરણમાં જ સાચવાય છે. સહાય ટીમને મોકલાતા નથી.', messageSaved:'તમારો સંદેશ આ ઉપકરણમાં સાચવાયો.', aboutDescription:'વ્યક્તિગત ખર્ચ ટ્રેકિંગ અને બજેટ પ્રોજેક્ટ.', footer:'SmartSpend · દરેક નિર્ણય સાથે પૈસાની સારી આદતો વિકસાવો.', deleteTransactionQuestion:'વ્યવહાર કાઢી નાખવો છે?', confirmDelete:'શું તમે ખરેખર આ કાઢી નાખવા માંગો છો?', backendChecking:'કનેક્શન તપાસી રહ્યું છે...', backendFailed:'કનેક્શન નિષ્ફળ', allCategories:'બધી શ્રેણીઓ', billsUtilities:'બિલ અને સેવાઓ', travel:'પ્રવાસ', personalCare:'વ્યક્તિગત સંભાળ', deleteTransaction:'વ્યવહાર કાઢી નાખો', used:'વપરાયેલ', left:'બાકી', of:'માંથી', exampleLunch:'દા.ત. બપોરનું ભોજન', exampleAmount:'દા.ત. ૨૫૦', insightDescription:'તમે વ્યવહારો ઉમેરો તેમ SmartSpend તમારા પૈસા ક્યાં ખર્ચાય છે તે સમજવામાં મદદ કરશે.', goodMorning:'સુપ્રભાત', goodAfternoon:'શુભ બપોર', goodEvening:'શુભ સાંજ', testExpenses:'પરીક્ષણ ખર્ચ', lunch:'બપોરનું ભોજન', groceryShopping:'કરિયાણાની ખરીદી', monthlySubscription:'માસિક સબ્સ્ક્રિપ્શન', collegeCommute:'કોલેજ આવવા-જવાનો ખર્ચ', cafeWithFriends:'મિત્રો સાથે કેફે', healthy:'સ્વસ્થ'
  },
  Punjabi: {
    workspace:'ਕਾਰਜ-ਸਥਾਨ', spendSmarter:'ਸਮਝਦਾਰੀ ਨਾਲ ਖਰਚ ਕਰੋ।', moneyHabits:'ਅੱਜ ਦੇ ਛੋਟੇ ਕਦਮ ਕੱਲ੍ਹ ਪੈਸੇ ਦੀਆਂ ਚੰਗੀਆਂ ਆਦਤਾਂ ਬਣਾਉਂਦੇ ਹਨ।', personalWorkspace:'ਨਿੱਜੀ ਕਾਰਜ-ਸਥਾਨ', financeOverview:'ਤੁਹਾਡੀ ਵਿੱਤੀ ਸਥਿਤੀ ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ', manageFinances:'ਆਪਣੇ ਪੈਸੇ ਦੇ ਕੰਮ ਇੱਕ ਥਾਂ ਸੰਭਾਲੋ।', moneySummary:'ਤੁਹਾਡੇ ਪੈਸਿਆਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਇੱਥੇ ਹੈ।', basedOnTransactions:'ਹੇਠਾਂ ਦਿੱਤੇ ਲੈਣ-ਦੇਣ ਦੇ ਆਧਾਰ ਤੇ', monthlyLimit:'ਤੁਹਾਡੀ ਮਹੀਨਾਵਾਰ ਹੱਦ', budgetMinusSpending:'ਖਰਚ ਤੋਂ ਬਾਅਦ ਬਚਿਆ ਬਜਟ', allRecorded:'ਸਾਰੇ ਦਰਜ ਲੈਣ-ਦੇਣ', spendingLastMonth:'ਪਿਛਲੇ ਮਹੀਨੇ ਦਾ ਖਰਚ', spendingThisMonth:'ਇਸ ਮਹੀਨੇ ਦਾ ਖਰਚ', thisMonth:'ਇਹ ਮਹੀਨਾ', lastMonth:'ਪਿਛਲਾ ਮਹੀਨਾ', allTime:'ਹਰ ਸਮੇਂ', recordedExpenses:'ਦਰਜ ਖਰਚਿਆਂ ਦੇ ਆਧਾਰ ਤੇ', spendingCalculated:'ਦਰਜ ਲੈਣ-ਦੇਣ ਤੋਂ ਗਿਣਿਆ ਖਰਚ।', latestExpenses:'ਤੁਹਾਡੇ ਹਾਲ ਹੀ ਦਰਜ ਖਰਚੇ', entries:'ਇੰਦਰਾਜ਼', editBudget:'ਬਜਟ ਸੋਧੋ', yourSpendingLimit:'ਤੁਹਾਡੀ ਖਰਚ ਹੱਦ', moneyInsight:'ਤੁਹਾਡੇ ਪੈਸਿਆਂ ਦੀ ਜਾਣਕਾਰੀ', updateMonthlyBudget:'ਮਹੀਨਾਵਾਰ ਬਜਟ ਅੱਪਡੇਟ ਕਰੋ', setSpendingLimit:'ਆਪਣੇ ਲਈ ਢੁੱਕਵੀਂ ਖਰਚ ਹੱਦ ਤੈਅ ਕਰੋ।', monthlyBudgetLabel:'ਮਹੀਨਾਵਾਰ ਬਜਟ', enterAmount:'ਰਕਮ ਦਰਜ ਕਰੋ', personaliseExperience:'ਆਪਣਾ ਤਜਰਬਾ ਨਿੱਜੀ ਬਣਾਓ', preferencesAccount:'ਆਪਣੀਆਂ ਪਸੰਦਾਂ ਅਤੇ ਖਾਤਾ ਸੰਭਾਲੋ।', appearanceDescription:'SmartSpend ਦੀ ਦਿੱਖ ਚੁਣੋ।', themeDescription:'ਡਾਰਕ ਅਤੇ ਲਾਈਟ ਮੋਡ ਵਿਚ ਬਦਲੋ।', profileDescription:'ਆਪਣੇ ਨਿੱਜੀ ਵੇਰਵੇ ਸੰਭਾਲੋ।', enterName:'ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ', profileSaved:'ਪ੍ਰੋਫ਼ਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੰਭਾਲੀ ਗਈ।', languageDescription:'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ।', rememberLanguage:'ਤੁਹਾਡੀ ਚੋਣ ਇਸ ਡਿਵਾਈਸ ਤੇ ਸੰਭਾਲੀ ਜਾਵੇਗੀ।', helpDescription:'ਕੋਈ ਸਵਾਲ ਜਾਂ ਸਮੱਸਿਆ ਹੈ? ਹੇਠਾਂ ਲਿਖੋ।', howHelp:'ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?', describeIssue:'ਆਪਣਾ ਸਵਾਲ ਜਾਂ ਸਮੱਸਿਆ ਲਿਖੋ...', supportDemo:'ਡੈਮੋ ਮਦਦ ਫਾਰਮ: ਸੁਨੇਹੇ ਇਸ ਡਿਵਾਈਸ ਤੇ ਹੀ ਸੰਭਾਲੇ ਜਾਂਦੇ ਹਨ। ਮਦਦ ਟੀਮ ਨੂੰ ਨਹੀਂ ਭੇਜੇ ਜਾਂਦੇ।', messageSaved:'ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਇਸ ਡਿਵਾਈਸ ਤੇ ਸੰਭਾਲਿਆ ਗਿਆ ਹੈ।', aboutDescription:'ਨਿੱਜੀ ਖਰਚਾ ਟ੍ਰੈਕ ਕਰਨ ਅਤੇ ਬਜਟ ਬਣਾਉਣ ਦਾ ਪ੍ਰੋਜੈਕਟ।', footer:'SmartSpend · ਹਰ ਫੈਸਲੇ ਨਾਲ ਪੈਸੇ ਦੀਆਂ ਚੰਗੀਆਂ ਆਦਤਾਂ ਬਣਾਓ।', deleteTransactionQuestion:'ਲੈਣ-ਦੇਣ ਮਿਟਾਉਣਾ ਹੈ?', confirmDelete:'ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?', backendChecking:'ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...', backendFailed:'ਕਨੈਕਸ਼ਨ ਅਸਫਲ', allCategories:'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ', billsUtilities:'ਬਿੱਲ ਅਤੇ ਸੇਵਾਵਾਂ', travel:'ਯਾਤਰਾ', personalCare:'ਨਿੱਜੀ ਦੇਖਭਾਲ', deleteTransaction:'ਲੈਣ-ਦੇਣ ਮਿਟਾਓ', used:'ਵਰਤਿਆ', left:'ਬਾਕੀ', of:'ਵਿੱਚੋਂ', exampleLunch:'ਜਿਵੇਂ ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ', exampleAmount:'ਜਿਵੇਂ ੨੫੦', insightDescription:'ਲੈਣ-ਦੇਣ ਜੋੜਨ ਨਾਲ SmartSpend ਤੁਹਾਨੂੰ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ ਕਿ ਪੈਸਾ ਕਿੱਥੇ ਖਰਚ ਹੁੰਦਾ ਹੈ।', goodMorning:'ਸ਼ੁਭ ਸਵੇਰ', goodAfternoon:'ਸ਼ੁਭ ਦੁਪਹਿਰ', goodEvening:'ਸ਼ੁਭ ਸ਼ਾਮ', testExpenses:'ਟੈਸਟ ਖਰਚੇ', lunch:'ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ', groceryShopping:'ਕਰਿਆਨੇ ਦੀ ਖਰੀਦ', monthlySubscription:'ਮਹੀਨਾਵਾਰ ਗਾਹਕੀ', collegeCommute:'ਕਾਲਜ ਆਉਣ-ਜਾਣ ਦਾ ਖਰਚ', cafeWithFriends:'ਦੋਸਤਾਂ ਨਾਲ ਕੈਫੇ', healthy:'ਤੰਦਰੁਸਤ'
  },
  Spanish: {
    moneyHabits:'Pequeños pasos hoy pueden crear mejores hábitos financieros mañana.', supportDemo:'Formulario de ayuda de demostración: los mensajes se guardan en este dispositivo y no se envían a un equipo de soporte.', confirmDelete:'¿Seguro que quieres eliminar esto?', backendChecking:'Comprobando conexión...', insightDescription:'Al añadir transacciones, SmartSpend te ayuda a entender en qué gastas tu dinero.', spendingLastMonth:'Gastos del mes pasado', spendingThisMonth:'Gastos de este mes', allTime:'Todo el tiempo', recordedExpenses:'Según tus gastos registrados', latestExpenses:'Tus gastos registrados más recientes', entries:'registros', testExpenses:'Gastos de prueba', lunch:'Almuerzo', groceryShopping:'Compra de comestibles', monthlySubscription:'Suscripción mensual', collegeCommute:'Transporte a la universidad', cafeWithFriends:'Café con amigos', healthy:'Correcto'
  },
  French: {
    moneyHabits:'De petits pas aujourd’hui peuvent créer de meilleures habitudes financières demain.', supportDemo:'Formulaire de démonstration : les messages sont enregistrés sur cet appareil et ne sont pas envoyés à une équipe d’assistance.', confirmDelete:'Voulez-vous vraiment supprimer cet élément ?', backendChecking:'Vérification de la connexion...', insightDescription:'En ajoutant des transactions, SmartSpend vous aide à comprendre où va votre argent.', spendingLastMonth:'Dépenses du mois dernier', spendingThisMonth:'Dépenses de ce mois-ci', allTime:'Depuis toujours', recordedExpenses:'Selon vos dépenses enregistrées', latestExpenses:'Vos dépenses récemment enregistrées', entries:'entrées', testExpenses:'Dépenses de test', lunch:'Déjeuner', groceryShopping:'Courses alimentaires', monthlySubscription:'Abonnement mensuel', collegeCommute:'Trajet vers le collège', cafeWithFriends:'Café entre amis', healthy:'En bonne santé'
  },
  German: {
    moneyHabits:'Kleine Schritte heute können morgen bessere Geldgewohnheiten schaffen.', supportDemo:'Demo-Hilfeformular: Nachrichten werden nur auf diesem Gerät gespeichert und nicht an ein Supportteam gesendet.', confirmDelete:'Möchtest du diesen Eintrag wirklich löschen?', backendChecking:'Verbindung wird geprüft...', insightDescription:'Wenn du Transaktionen hinzufügst, hilft SmartSpend dir zu verstehen, wohin dein Geld fließt.', spendingLastMonth:'Ausgaben im letzten Monat', spendingThisMonth:'Ausgaben in diesem Monat', allTime:'Gesamter Zeitraum', recordedExpenses:'Basierend auf deinen erfassten Ausgaben', latestExpenses:'Deine zuletzt erfassten Ausgaben', entries:'Einträge', testExpenses:'Testausgaben', lunch:'Mittagessen', groceryShopping:'Lebensmitteleinkauf', monthlySubscription:'Monatliches Abonnement', collegeCommute:'Fahrt zum College', cafeWithFriends:'Café mit Freunden', healthy:'Gesund'
  },
  Chinese: {
    moneyHabits:'今天迈出一小步，明天就能养成更好的理财习惯。', supportDemo:'演示帮助表单：消息仅保存在此设备上，不会发送给支持团队。', confirmDelete:'确定要删除此项吗？', backendChecking:'正在检查连接…', insightDescription:'添加交易后，SmartSpend 可以帮助你了解钱花在了哪里。', spendingLastMonth:'上个月的支出', spendingThisMonth:'本月支出', allTime:'所有时间', recordedExpenses:'根据已记录的支出', latestExpenses:'最近记录的支出', entries:'条记录', testExpenses:'测试支出', lunch:'午餐', groceryShopping:'购买杂货', monthlySubscription:'每月订阅', collegeCommute:'上学通勤', cafeWithFriends:'和朋友去咖啡馆', healthy:'健康'
  },
  Japanese: {
    moneyHabits:'今日の小さな一歩が、明日のより良いお金の習慣につながります。', supportDemo:'デモ用サポートフォーム：メッセージはこの端末にのみ保存され、サポートチームには送信されません。', confirmDelete:'本当に削除しますか？', backendChecking:'接続を確認しています…', insightDescription:'取引を追加すると、SmartSpend が支出先を把握する手助けをします。', spendingLastMonth:'先月の支出', spendingThisMonth:'今月の支出', allTime:'全期間', recordedExpenses:'記録された支出に基づく', latestExpenses:'最近記録した支出', entries:'件', testExpenses:'テスト支出', lunch:'昼食', groceryShopping:'食料品の買い物', monthlySubscription:'月額サブスクリプション', collegeCommute:'通学費', cafeWithFriends:'友人とのカフェ', healthy:'正常'
  },
  Korean: {
    workspace:'작업 공간', spendSmarter:'더 현명하게 소비하세요.', moneyHabits:'오늘의 작은 실천이 내일 더 나은 소비 습관을 만듭니다.', personalWorkspace:'개인 작업 공간', financeOverview:'한눈에 보는 재정 현황', manageFinances:'한곳에서 재정을 관리하세요.', moneySummary:'현재 지출 현황을 확인하세요.', basedOnTransactions:'아래 거래 내역 기준', monthlyLimit:'월간 예산 한도', budgetMinusSpending:'예산에서 지출을 뺀 금액', allRecorded:'모든 기록된 거래', spendingLastMonth:'지난달 지출', spendingThisMonth:'이번 달 지출', thisMonth:'이번 달', lastMonth:'지난달', allTime:'전체 기간', recordedExpenses:'기록된 지출 기준', spendingCalculated:'기록된 거래를 바탕으로 계산한 지출입니다.', latestExpenses:'최근 기록한 지출', entries:'개 항목', editBudget:'예산 수정', yourSpendingLimit:'지출 한도', moneyInsight:'재정 인사이트', updateMonthlyBudget:'월간 예산 업데이트', setSpendingLimit:'나에게 맞는 지출 한도를 설정하세요.', monthlyBudgetLabel:'월간 예산', enterAmount:'금액 입력', personaliseExperience:'맞춤 환경 설정', preferencesAccount:'환경설정과 계정을 관리하세요.', appearanceDescription:'SmartSpend의 모양을 선택하세요.', themeDescription:'다크 모드와 라이트 모드를 전환하세요.', profileDescription:'개인 정보를 관리하세요.', enterName:'이름 입력', profileSaved:'프로필이 저장되었습니다.', languageDescription:'원하는 언어를 선택하세요.', rememberLanguage:'선택한 언어는 이 기기에 저장됩니다.', helpDescription:'질문이나 문제가 있나요? 아래에 작성하세요.', howHelp:'무엇을 도와드릴까요?', describeIssue:'질문이나 문제를 설명하세요...', supportDemo:'데모 지원 양식: 메시지는 이 기기에만 저장되며 지원팀으로 전송되지 않습니다.', messageSaved:'메시지가 이 기기에 저장되었습니다.', aboutDescription:'개인 지출 추적 및 예산 관리 프로젝트입니다.', footer:'SmartSpend · 작은 선택으로 더 나은 소비 습관을 만드세요.', deleteTransactionQuestion:'거래를 삭제할까요?', confirmDelete:'정말 삭제하시겠습니까?', backendChecking:'연결 확인 중...', backendFailed:'연결 실패', allCategories:'모든 카테고리', billsUtilities:'공과금 및 서비스', travel:'여행', personalCare:'개인 관리', deleteTransaction:'거래 삭제', used:'사용함', left:'남음', of:'중', exampleLunch:'예: 점심', exampleAmount:'예: 250', insightDescription:'거래를 추가하면 SmartSpend가 돈이 어디에 쓰이는지 파악하도록 도와줍니다.', goodMorning:'좋은 아침입니다', goodAfternoon:'좋은 오후입니다', goodEvening:'좋은 저녁입니다', testExpenses:'테스트 지출', lunch:'점심', groceryShopping:'식료품 구매', monthlySubscription:'월간 구독', collegeCommute:'통학 교통비', cafeWithFriends:'친구와 카페', healthy:'정상'
  },
  Thai: {
    moneyHabits:'ก้าวเล็ก ๆ ในวันนี้ช่วยสร้างนิสัยการเงินที่ดีขึ้นในวันพรุ่งนี้', supportDemo:'แบบฟอร์มช่วยเหลือสาธิต: ข้อความจะบันทึกไว้ในอุปกรณ์นี้เท่านั้นและจะไม่ส่งให้ทีมสนับสนุน', confirmDelete:'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?', backendChecking:'กำลังตรวจสอบการเชื่อมต่อ...', insightDescription:'เมื่อเพิ่มรายการ SmartSpend จะช่วยให้เข้าใจว่าเงินของคุณใช้ไปกับอะไร', spendingLastMonth:'ค่าใช้จ่ายเดือนที่แล้ว', spendingThisMonth:'ค่าใช้จ่ายเดือนนี้', allTime:'ตลอดเวลา', recordedExpenses:'อ้างอิงจากค่าใช้จ่ายที่บันทึกไว้', latestExpenses:'ค่าใช้จ่ายที่บันทึกล่าสุด', entries:'รายการ', testExpenses:'ค่าใช้จ่ายทดสอบ', lunch:'อาหารกลางวัน', groceryShopping:'ซื้อของชำ', monthlySubscription:'การสมัครสมาชิกรายเดือน', collegeCommute:'ค่าเดินทางไปวิทยาลัย', cafeWithFriends:'คาเฟ่กับเพื่อน', healthy:'ปกติ'
  },
  Russian: {
    moneyHabits:'Небольшие шаги сегодня помогут выработать лучшие финансовые привычки завтра.', supportDemo:'Демонстрационная форма поддержки: сообщения хранятся только на этом устройстве и не отправляются службе поддержки.', confirmDelete:'Вы действительно хотите удалить это?', backendChecking:'Проверка соединения...', insightDescription:'Добавляя операции, вы сможете понять, на что уходят ваши деньги.', spendingLastMonth:'Расходы за прошлый месяц', spendingThisMonth:'Расходы за этот месяц', allTime:'За всё время', recordedExpenses:'На основе записанных расходов', latestExpenses:'Последние записанные расходы', entries:'записей', testExpenses:'Тестовые расходы', lunch:'Обед', groceryShopping:'Покупка продуктов', monthlySubscription:'Ежемесячная подписка', collegeCommute:'Дорога до колледжа', cafeWithFriends:'Кафе с друзьями', healthy:'В норме'
  },
  Arabic: {
    moneyHabits:'يمكن للخطوات الصغيرة اليوم أن تبني عادات مالية أفضل غدًا.', supportDemo:'نموذج دعم تجريبي: تُحفظ الرسائل على هذا الجهاز فقط ولا تُرسل إلى فريق الدعم.', confirmDelete:'هل أنت متأكد أنك تريد حذف هذا العنصر؟', backendChecking:'جارٍ التحقق من الاتصال...', insightDescription:'عند إضافة المعاملات، يساعدك SmartSpend على معرفة أين تذهب أموالك.', spendingLastMonth:'إنفاق الشهر الماضي', spendingThisMonth:'إنفاق هذا الشهر', allTime:'كل الفترات', recordedExpenses:'استنادًا إلى النفقات المسجلة', latestExpenses:'أحدث النفقات المسجلة', entries:'إدخالات', testExpenses:'نفقات تجريبية', lunch:'الغداء', groceryShopping:'شراء البقالة', monthlySubscription:'اشتراك شهري', collegeCommute:'التنقل إلى الكلية', cafeWithFriends:'مقهى مع الأصدقاء', healthy:'سليم'
  },
  Portuguese: {
    moneyHabits:'Pequenos passos hoje podem criar melhores hábitos financeiros amanhã.', supportDemo:'Formulário de suporte de demonstração: as mensagens ficam guardadas neste dispositivo e não são enviadas à equipa de suporte.', confirmDelete:'Tem a certeza de que pretende eliminar isto?', backendChecking:'A verificar a ligação...', insightDescription:'Ao adicionar transações, o SmartSpend ajuda a perceber onde gasta o seu dinheiro.', spendingLastMonth:'Despesas do mês passado', spendingThisMonth:'Despesas deste mês', allTime:'Todo o período', recordedExpenses:'Com base nas despesas registadas', latestExpenses:'As despesas registadas mais recentemente', entries:'registos', testExpenses:'Despesas de teste', lunch:'Almoço', groceryShopping:'Compras de mercearia', monthlySubscription:'Subscrição mensal', collegeCommute:'Deslocação para a faculdade', cafeWithFriends:'Café com amigos', healthy:'Saudável'
  }
}


const modalTranslations: Record<string, Record<string, string>> = {
  English: { editExpense: 'Edit Expense', expenseName: 'Expense name', saveChanges: 'Save Changes', saving: 'Saving...', amountLabel: 'Amount (₹)', food: 'Food', shopping: 'Shopping', transport: 'Transport', entertainment: 'Entertainment', education: 'Education', health: 'Health', other: 'Other', category: 'Category', cancel: 'Cancel' },
  Kannada: { editExpense: 'ಖರ್ಚನ್ನು ಸಂಪಾದಿಸಿ', expenseName: 'ಖರ್ಚಿನ ಹೆಸರು', saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ', saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...', amountLabel: 'ಮೊತ್ತ (₹)', food: 'ಆಹಾರ', shopping: 'ಶಾಪಿಂಗ್', transport: 'ಸಾರಿಗೆ', entertainment: 'ಮನರಂಜನೆ', education: 'ಶಿಕ್ಷಣ', health: 'ಆರೋಗ್ಯ', other: 'ಇತರೆ', category: 'ವರ್ಗ', cancel: 'ರದ್ದುಮಾಡಿ' },
  Hindi: { editExpense: 'खर्च संपादित करें', expenseName: 'खर्च का नाम', saveChanges: 'बदलाव सहेजें', saving: 'सहेजा जा रहा है...', amountLabel: 'राशि (₹)', food: 'भोजन', shopping: 'खरीदारी', transport: 'परिवहन', entertainment: 'मनोरंजन', education: 'शिक्षा', health: 'स्वास्थ्य', other: 'अन्य', category: 'श्रेणी', cancel: 'रद्द करें' },
  Tamil: { editExpense: 'செலவைத் திருத்தவும்', expenseName: 'செலவின் பெயர்', saveChanges: 'மாற்றங்களைச் சேமிக்கவும்', saving: 'சேமிக்கப்படுகிறது...', amountLabel: 'தொகை (₹)', food: 'உணவு', shopping: 'ஷாப்பிங்', transport: 'போக்குவரத்து', entertainment: 'பொழுதுபோக்கு', education: 'கல்வி', health: 'உடல்நலம்', other: 'மற்றவை', category: 'வகை', cancel: 'ரத்துசெய்' },
  Telugu: { editExpense: 'ఖర్చును సవరించండి', expenseName: 'ఖర్చు పేరు', saveChanges: 'మార్పులను సేవ్ చేయండి', saving: 'సేవ్ అవుతోంది...', amountLabel: 'మొత్తం (₹)', food: 'ఆహారం', shopping: 'షాపింగ్', transport: 'రవాణా', entertainment: 'వినోదం', education: 'విద్య', health: 'ఆరోగ్యం', other: 'ఇతర', category: 'వర్గం', cancel: 'రద్దు చేయండి' },
  Malayalam: { editExpense: 'ചെലവ് തിരുത്തുക', expenseName: 'ചെലവിന്റെ പേര്', saveChanges: 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക', saving: 'സംരക്ഷിക്കുന്നു...', amountLabel: 'തുക (₹)', food: 'ഭക്ഷണം', shopping: 'ഷോപ്പിംഗ്', transport: 'ഗതാഗതം', entertainment: 'വിനോദം', education: 'വിദ്യാഭ്യാസം', health: 'ആരോഗ്യം', other: 'മറ്റുള്ളവ', category: 'വിഭാഗം', cancel: 'റദ്ദാക്കുക' },
  Bengali: { editExpense: 'খরচ সম্পাদনা করুন', expenseName: 'খরচের নাম', saveChanges: 'পরিবর্তন সংরক্ষণ করুন', saving: 'সংরক্ষণ হচ্ছে...', amountLabel: 'পরিমাণ (₹)', food: 'খাবার', shopping: 'কেনাকাটা', transport: 'পরিবহন', entertainment: 'বিনোদন', education: 'শিক্ষা', health: 'স্বাস্থ্য', other: 'অন্যান্য', category: 'বিভাগ', cancel: 'বাতিল' },
  Marathi: { editExpense: 'खर्च संपादित करा', expenseName: 'खर्चाचे नाव', saveChanges: 'बदल जतन करा', saving: 'जतन करत आहे...', amountLabel: 'रक्कम (₹)', food: 'अन्न', shopping: 'खरेदी', transport: 'वाहतूक', entertainment: 'मनोरंजन', education: 'शिक्षण', health: 'आरोग्य', other: 'इतर', category: 'प्रकार', cancel: 'रद्द करा' },
  Gujarati: { editExpense: 'ખર્ચ સંપાદિત કરો', expenseName: 'ખર્ચનું નામ', saveChanges: 'ફેરફારો સાચવો', saving: 'સાચવી રહ્યું છે...', amountLabel: 'રકમ (₹)', food: 'ખોરાક', shopping: 'ખરીદી', transport: 'પરિવહન', entertainment: 'મનોરંજન', education: 'શિક્ષણ', health: 'આરોગ્ય', other: 'અન્ય', category: 'શ્રેણી', cancel: 'રદ કરો' },
  Punjabi: { editExpense: 'ਖਰਚਾ ਸੋਧੋ', expenseName: 'ਖਰਚੇ ਦਾ ਨਾਮ', saveChanges: 'ਬਦਲਾਅ ਸੰਭਾਲੋ', saving: 'ਸੰਭਾਲਿਆ ਜਾ ਰਿਹਾ ਹੈ...', amountLabel: 'ਰਕਮ (₹)', food: 'ਭੋਜਨ', shopping: 'ਖਰੀਦਦਾਰੀ', transport: 'ਆਵਾਜਾਈ', entertainment: 'ਮਨੋਰੰਜਨ', education: 'ਸਿੱਖਿਆ', health: 'ਸਿਹਤ', other: 'ਹੋਰ', category: 'ਸ਼੍ਰੇਣੀ', cancel: 'ਰੱਦ ਕਰੋ' },
  Spanish: { editExpense: 'Editar gasto', expenseName: 'Nombre del gasto', saveChanges: 'Guardar cambios', saving: 'Guardando...', amountLabel: 'Importe (₹)', food: 'Comida', shopping: 'Compras', transport: 'Transporte', entertainment: 'Entretenimiento', education: 'Educación', health: 'Salud', other: 'Otros', category: 'Categoría', cancel: 'Cancelar' },
  French: { editExpense: 'Modifier la dépense', expenseName: 'Nom de la dépense', saveChanges: 'Enregistrer les modifications', saving: 'Enregistrement...', amountLabel: 'Montant (₹)', food: 'Nourriture', shopping: 'Achats', transport: 'Transport', entertainment: 'Divertissement', education: 'Éducation', health: 'Santé', other: 'Autre', category: 'Catégorie', cancel: 'Annuler' },
  German: { editExpense: 'Ausgabe bearbeiten', expenseName: 'Ausgabenname', saveChanges: 'Änderungen speichern', saving: 'Speichern...', amountLabel: 'Betrag (₹)', food: 'Essen', shopping: 'Einkaufen', transport: 'Transport', entertainment: 'Unterhaltung', education: 'Bildung', health: 'Gesundheit', other: 'Sonstiges', category: 'Kategorie', cancel: 'Abbrechen' },
  Chinese: { editExpense: '编辑支出', expenseName: '支出名称', saveChanges: '保存更改', saving: '正在保存...', amountLabel: '金额 (₹)', food: '食物', shopping: '购物', transport: '交通', entertainment: '娱乐', education: '教育', health: '健康', other: '其他', category: '类别', cancel: '取消' },
  Japanese: { editExpense: '支出を編集', expenseName: '支出名', saveChanges: '変更を保存', saving: '保存中...', amountLabel: '金額 (₹)', food: '食費', shopping: '買い物', transport: '交通', entertainment: '娯楽', education: '教育', health: '健康', other: 'その他', category: 'カテゴリ', cancel: 'キャンセル' },
  Korean: { editExpense: '지출 수정', expenseName: '지출 이름', saveChanges: '변경 사항 저장', saving: '저장 중...', amountLabel: '금액 (₹)', food: '음식', shopping: '쇼핑', transport: '교통', entertainment: '오락', education: '교육', health: '건강', other: '기타', category: '카테고리', cancel: '취소' },
  Thai: { editExpense: 'แก้ไขค่าใช้จ่าย', expenseName: 'ชื่อค่าใช้จ่าย', saveChanges: 'บันทึกการเปลี่ยนแปลง', saving: 'กำลังบันทึก...', amountLabel: 'จำนวนเงิน (₹)', food: 'อาหาร', shopping: 'ช้อปปิ้ง', transport: 'การเดินทาง', entertainment: 'ความบันเทิง', education: 'การศึกษา', health: 'สุขภาพ', other: 'อื่น ๆ', category: 'หมวดหมู่', cancel: 'ยกเลิก' },
  Russian: { editExpense: 'Изменить расход', expenseName: 'Название расхода', saveChanges: 'Сохранить изменения', saving: 'Сохранение...', amountLabel: 'Сумма (₹)', food: 'Еда', shopping: 'Покупки', transport: 'Транспорт', entertainment: 'Развлечения', education: 'Образование', health: 'Здоровье', other: 'Другое', category: 'Категория', cancel: 'Отмена' },
  Arabic: { editExpense: 'تعديل المصروف', expenseName: 'اسم المصروف', saveChanges: 'حفظ التغييرات', saving: 'جارٍ الحفظ...', amountLabel: 'المبلغ (₹)', food: 'الطعام', shopping: 'التسوق', transport: 'المواصلات', entertainment: 'الترفيه', education: 'التعليم', health: 'الصحة', other: 'أخرى', category: 'الفئة', cancel: 'إلغاء' },
  Portuguese: { editExpense: 'Editar despesa', expenseName: 'Nome da despesa', saveChanges: 'Guardar alterações', saving: 'A guardar...', amountLabel: 'Valor (₹)', food: 'Comida', shopping: 'Compras', transport: 'Transporte', entertainment: 'Entretenimento', education: 'Educação', health: 'Saúde', other: 'Outro', category: 'Categoria', cancel: 'Cancelar' },
}


const t = (key: string) =>
  modalTranslations[language]?.[key] ?? moreTranslations[language]?.[key] ?? extraTranslations[language]?.[key] ?? translations[language]?.[key] ?? translations.English[key] ?? key
const transactionName = (name: string) => {
  // Translate common example/test expense names for display only.
  // The original name remains unchanged in the database and edit field.
  const localizedNames: Record<string, Record<string, string>> = {
    'Bus Fare': { English: 'Bus Fare', Kannada: 'ಬಸ್ ಪ್ರಯಾಣದ ದರ', Hindi: 'बस का किराया', Tamil: 'பேருந்துக் கட்டணம்', Telugu: 'బస్సు ఛార్జీ', Malayalam: 'ബസ് നിരക്ക്', Bengali: 'বাস ভাড়া', Marathi: 'बस भाडे', Gujarati: 'બસ ભાડું', Punjabi: 'ਬੱਸ ਦਾ ਕਿਰਾਇਆ', Spanish: 'Tarifa de autobús', French: 'Tarif de bus', German: 'Busfahrkarte', Chinese: '公交车费', Japanese: 'バス料金', Korean: '버스 요금', Thai: 'ค่าโดยสารรถบัส', Russian: 'Проезд на автобусе', Arabic: 'أجرة الحافلة', Portuguese: 'Tarifa de ônibus' },
    'Grocery Shopping Edited': { English: 'Grocery Shopping Edited', Kannada: 'ದಿನಸಿ ಖರೀದಿ (ತಿದ್ದುಪಡಿ)', Hindi: 'किराने की खरीदारी (संपादित)', Tamil: 'மளிகைப் பொருள் வாங்குதல் (திருத்தப்பட்டது)', Telugu: 'కిరాణా షాపింగ్ (సవరించబడింది)', Malayalam: 'പലചരക്ക് വാങ്ങൽ (തിരുത്തിയത്)', Bengali: 'মুদিখানা কেনাকাটা (সম্পাদিত)', Marathi: 'किराणा खरेदी (संपादित)', Gujarati: 'કરિયાણાની ખરીદી (સંપાદિત)', Punjabi: 'ਕਰਿਆਨੇ ਦੀ ਖਰੀਦਦਾਰੀ (ਸੋਧਿਆ)', Spanish: 'Compra de comestibles (editada)', French: 'Courses alimentaires (modifiées)', German: 'Lebensmitteleinkauf (bearbeitet)', Chinese: '杂货购物（已编辑）', Japanese: '食料品の買い物（編集済み）', Korean: '식료품 쇼핑 (수정됨)', Thai: 'ซื้อของชำ (แก้ไขแล้ว)', Russian: 'Покупка продуктов (изменено)', Arabic: 'شراء البقالة (تم التعديل)', Portuguese: 'Compras de supermercado (editado)' },
    'Database Test': { English: 'Database Test', Kannada: 'ಡೇಟಾಬೇಸ್ ಪರೀಕ್ಷೆ', Hindi: 'डेटाबेस परीक्षण', Tamil: 'தரவுத்தளச் சோதனை', Telugu: 'డేటాబేస్ పరీక్ష', Malayalam: 'ഡാറ്റാബേസ് പരിശോധന', Bengali: 'ডেটাবেস পরীক্ষা', Marathi: 'डेटाबेस चाचणी', Gujarati: 'ડેટાબેઝ પરીક્ષણ', Punjabi: 'ਡਾਟਾਬੇਸ ਜਾਂਚ', Spanish: 'Prueba de base de datos', French: 'Test de base de données', German: 'Datenbanktest', Chinese: '数据库测试', Japanese: 'データベーステスト', Korean: '데이터베이스 테스트', Thai: 'ทดสอบฐานข้อมูล', Russian: 'Тест базы данных', Arabic: 'اختبار قاعدة البيانات', Portuguese: 'Teste de banco de dados' },
    'Test expenses': { English: 'Test expenses', Kannada: 'ಪರೀಕ್ಷಾ ಖರ್ಚುಗಳು', Hindi: 'परीक्षण खर्च', Tamil: 'சோதனைச் செலவுகள்', Telugu: 'పరీక్ష ఖర్చులు', Malayalam: 'പരീക്ഷണ ചെലവുകൾ', Bengali: 'পরীক্ষামূলক খরচ', Marathi: 'चाचणी खर्च', Gujarati: 'પરીક્ષણ ખર્ચ', Punjabi: 'ਟੈਸਟ ਖਰਚੇ', Spanish: 'Gastos de prueba', French: 'Dépenses de test', German: 'Testausgaben', Chinese: '测试支出', Japanese: 'テスト支出', Korean: '테스트 지출', Thai: 'ค่าใช้จ่ายทดสอบ', Russian: 'Тестовые расходы', Arabic: 'نفقات الاختبار', Portuguese: 'Despesas de teste' },
    Lunch: { English: 'Lunch', Kannada: 'ಮಧ್ಯಾಹ್ನದ ಊಟ', Hindi: 'दोपहर का भोजन', Tamil: 'மதிய உணவு', Telugu: 'మధ్యాహ్న భోజనం', Malayalam: 'ഉച്ചഭക്ഷണം', Bengali: 'দুপুরের খাবার', Marathi: 'दुपारचे जेवण', Gujarati: 'બપોરનું ભોજન', Punjabi: 'ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ', Spanish: 'Almuerzo', French: 'Déjeuner', German: 'Mittagessen', Chinese: '午餐', Japanese: '昼食', Korean: '점심', Thai: 'อาหารกลางวัน', Russian: 'Обед', Arabic: 'الغداء', Portuguese: 'Almoço' },
    'Grocery shopping': { English: 'Grocery shopping', Kannada: 'ದಿನಸಿ ಖರೀದಿ', Hindi: 'किराने की खरीदारी', Tamil: 'மளிகைப் பொருள் வாங்குதல்', Telugu: 'కిరాణా షాపింగ్', Malayalam: 'പലചരക്ക് വാങ്ങൽ', Bengali: 'মুদিখানা কেনাকাটা', Marathi: 'किराणा खरेदी', Gujarati: 'કરિયાણાની ખરીદી', Punjabi: 'ਕਰਿਆਨੇ ਦੀ ਖਰੀਦਦਾਰੀ', Spanish: 'Compra de comestibles', French: 'Courses alimentaires', German: 'Lebensmitteleinkauf', Chinese: '杂货购物', Japanese: '食料品の買い物', Korean: '식료품 쇼핑', Thai: 'ซื้อของชำ', Russian: 'Покупка продуктов', Arabic: 'شراء البقالة', Portuguese: 'Compras de supermercado' },
    'Monthly subscription': { English: 'Monthly subscription', Kannada: 'ಮಾಸಿಕ ಚಂದಾದಾರಿಕೆ', Hindi: 'मासिक सदस्यता', Tamil: 'மாதாந்திர சந்தா', Telugu: 'నెలవారీ చందా', Malayalam: 'പ്രതിമാസ സബ്‌സ്‌ക്രിപ്ഷൻ', Bengali: 'মাসিক সাবস্ক্রিপশন', Marathi: 'मासिक सदस्यता', Gujarati: 'માસિક સબ્સ્ક્રિપ્શન', Punjabi: 'ਮਹੀਨਾਵਾਰ ਗਾਹਕੀ', Spanish: 'Suscripción mensual', French: 'Abonnement mensuel', German: 'Monatsabonnement', Chinese: '每月订阅', Japanese: '月額サブスクリプション', Korean: '월간 구독', Thai: 'การสมัครสมาชิกรายเดือน', Russian: 'Ежемесячная подписка', Arabic: 'اشتراك شهري', Portuguese: 'Assinatura mensal' },
    'College commute': { English: 'College commute', Kannada: 'ಕಾಲೇಜಿಗೆ ಪ್ರಯಾಣ', Hindi: 'कॉलेज आना-जाना', Tamil: 'கல்லூரிப் பயணம்', Telugu: 'కళాశాల ప్రయాణం', Malayalam: 'കോളേജ് യാത്ര', Bengali: 'কলেজ যাতায়াত', Marathi: 'कॉलेज प्रवास', Gujarati: 'કોલેજ આવનજાવન', Punjabi: 'ਕਾਲਜ ਆਉਣਾ-ਜਾਣਾ', Spanish: 'Trayecto a la universidad', French: 'Trajet vers le collège', German: 'Fahrt zur Hochschule', Chinese: '上学通勤', Japanese: '通学', Korean: '학교 통학', Thai: 'เดินทางไปวิทยาลัย', Russian: 'Поездка в колледж', Arabic: 'التنقل إلى الكلية', Portuguese: 'Deslocamento para a faculdade' },
    'Cafe with friends': { English: 'Cafe with friends', Kannada: 'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಕಫೆ', Hindi: 'दोस्तों के साथ कैफ़े', Tamil: 'நண்பர்களுடன் கஃபே', Telugu: 'స్నేహితులతో కేఫ్', Malayalam: 'സുഹൃത്തുക്കളോടൊപ്പം കഫേ', Bengali: 'বন্ধুদের সঙ্গে ক্যাফে', Marathi: 'मित्रांसोबत कॅफे', Gujarati: 'મિત્રો સાથે કેફે', Punjabi: 'ਦੋਸਤਾਂ ਨਾਲ ਕੈਫੇ', Spanish: 'Café con amigos', French: 'Café entre amis', German: 'Café mit Freunden', Chinese: '和朋友去咖啡馆', Japanese: '友達とカフェ', Korean: '친구와 카페', Thai: 'คาเฟ่กับเพื่อน', Russian: 'Кафе с друзьями', Arabic: 'مقهى مع الأصدقاء', Portuguese: 'Café com amigos' },
  }
  const exact = localizedNames[name]
  if (exact) return exact[language] ?? exact.English
  const keys: Record<string, string> = {
    'Test expenses': 'testExpenses', Lunch: 'lunch',
    'Grocery shopping': 'groceryShopping',
    'Monthly subscription': 'monthlySubscription',
    'College commute': 'collegeCommute', 'Cafe with friends': 'cafeWithFriends',
  }
  const key = keys[name]
  return key ? t(key) : name
}
const categoryLabel = (value: string) => {
  const keys: Record<string, string> = {
    Food: 'food', Shopping: 'shopping', Transport: 'transport',
    Entertainment: 'entertainment', Education: 'education',
    Health: 'health', Other: 'other', Bills: 'billsUtilities',
    Travel: 'travel', 'Personal Care': 'personalCare', All: 'allCategories',
  }
  return t(keys[value] ?? value)
}
const [profileName, setProfileName] = useState(() => {
  try {
    const savedUser = localStorage.getItem('smartspend_user')
    return savedUser ? JSON.parse(savedUser).name || '' : ''
  } catch {
    return ''
  }
})

const [profileEmail, setProfileEmail] = useState(() => {
  const savedUser = localStorage.getItem('smartspend_user')
  if (!savedUser) return ''
  try {
    return JSON.parse(savedUser).email || ''
  } catch {
    return ''
  }
})

const [helpMessage, setHelpMessage] = useState('')
const [savedProfile, setSavedProfile] = useState(false)

useEffect(() => {
  localStorage.setItem('smartspend-theme', theme)
  document.documentElement.dataset.theme = theme
}, [theme])

useEffect(() => {
  localStorage.setItem('smartspend-language', language)
}, [language])

  const [selectedPeriod, setSelectedPeriod] = useState('this-month')
  const [apiStatus, setApiStatus] = useState('Checking connection...')

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((response) => {
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      })
      .then((data) => setApiStatus(data.status))
      .catch(() => setApiStatus('Connection failed'))
    }, [])

// Load expenses from the backend




const currentHour = new Date().getHours()


  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [budgetInput, setBudgetInput] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([]) 
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('') 

const [authError, setAuthError] = useState('')
const [authLoading, setAuthLoading] = useState(false)
const [currentUser, setCurrentUser] = useState<{
  id: number
  name: string
  email: string
} | null>(() => {
  const savedUser = localStorage.getItem('smartspend_user')

  if (!savedUser) return null

  try {
    return JSON.parse(savedUser)
  } catch {
    localStorage.removeItem('smartspend_user')
    localStorage.removeItem('smartspend_token')
    return null
  }
})
useEffect(() => {
  async function loadExpenses() {
    const token = localStorage.getItem('smartspend_token')

    if (!token || !currentUser) {
      setTransactions([])
      return
    }

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem('smartspend_token')
        localStorage.removeItem('smartspend_user')
        setCurrentUser(null)
        setTransactions([])
        return
      }

      if (!response.ok) {
        throw new Error('Failed to load expenses')
      }

      const data = await response.json()

      setTransactions(
        data.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          date: item.date || '',
          amount: Number(item.amount),
          icon:
            item.category === 'Food' ? '🍽️' :
            item.category === 'Shopping' ? '🛍️' :
            item.category === 'Transport' ? '🚕' :
            item.category === 'Entertainment' ? '🎬' :
            item.category === 'Health' ? '💊' :
            item.category === 'Education' ? '📚' : '📌',
        }))
      )
    } catch (error) {
      console.error('Could not load expenses:', error)
    }
  }

  loadExpenses()
}, [currentUser])

async function handleAuthSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setAuthError('')
  setAuthLoading(true)

  try {
    if (authMode === 'register') {
      const registerResponse = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          password: authPassword,
        }),
      })

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json()
        throw new Error(errorData.detail || 'Registration failed')
      }
    }

    const loginBody = new URLSearchParams()
    loginBody.set('username', authEmail)
    loginBody.set('password', authPassword)

    const loginResponse = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginBody.toString(),
    })

    const loginData = await loginResponse.json()

    if (!loginResponse.ok) {
      throw new Error(loginData.detail || 'Login failed')
    }

    localStorage.setItem('smartspend_token', loginData.access_token)
    localStorage.setItem('smartspend_user', JSON.stringify(loginData.user))
    setProfileName(loginData.user.name)
    setProfileEmail(loginData.user.email)
    setCurrentUser(loginData.user)
    setAuthPassword('')
  } catch (error) {
    setAuthError(
      error instanceof Error ? error.message : 'Something went wrong'
    )
  } finally {
    setAuthLoading(false)
  }
}

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  
  const totalSpent = transactions.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  )

  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem(`smartspend-budget-${currentUser?.id}`)
    return saved ? Number(saved) : 12000
  })
  
  useEffect(() => {
    if (!currentUser) {
      setBudget(12000)
      return
    }
  
    const saved = localStorage.getItem(
      `smartspend-budget-${currentUser.id}`
    )
  
    setBudget(saved ? Number(saved) : 12000)
  }, [currentUser?.id])

const budgetPercent = Math.min(
  100,
  Math.max(0, (totalSpent / budget) * 100)
)

const categories = Object.entries(
  transactions.reduce<Record<string, number>>((totals, item) => {
    const category = item.category || 'Other'
    totals[category] = (totals[category] ?? 0) + (Number(item.amount) || 0)
    return totals
  }, {})
).map(([name, amount]) => ({
  name,
  amount,
  color: categoryColors[name] ?? '#94a3b8',
}))

const categoryTotal = categories.reduce((sum, item) => sum + item.amount, 0)




const spendingByPeriod = (() => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const filteredTransactions = transactions.filter((item) => {
    let date: Date

    if (item.date === 'Today') {
      date = now
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
      date = new Date(`${item.date}T12:00:00`)
    } else {
      date = new Date(item.date)
      if (Number.isNaN(date.getTime())) return false
    }

    if (selectedPeriod === 'all-time') return true

    if (selectedPeriod === 'last-month') {
      const lastMonth = new Date(currentYear, currentMonth - 1, 1)
      return (
        date.getMonth() === lastMonth.getMonth() &&
        date.getFullYear() === lastMonth.getFullYear()
      )
    }

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    )
  })

  const periods = [
    { day: '01–05', start: 1, end: 5 },
    { day: '06–10', start: 6, end: 10 },
    { day: '11–15', start: 11, end: 15 },
    { day: '16–20', start: 16, end: 20 },
    { day: '21–25', start: 21, end: 25 },
    { day: '26–31', start: 26, end: 31 },
  ]

  return periods.map((period) => ({
    ...period,
    amount: filteredTransactions.reduce((sum, item) => {
      const date =
        item.date === 'Today'
          ? now
          : /^\d{4}-\d{2}-\d{2}$/.test(item.date)
            ? new Date(`${item.date}T12:00:00`)
            : new Date(item.date)

      return date.getDate() >= period.start &&
        date.getDate() <= period.end
        ? sum + item.amount
        : sum
    }, 0),
  }))
})()


const maxPeriodAmount = Math.max(
  ...spendingByPeriod.map((period) => period.amount),
  5000
)


  
async function addTransaction(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const parsedAmount = Number(amount)

  if (
    !name.trim() ||
    !Number.isFinite(parsedAmount) ||
    parsedAmount <= 0
  ) {
    alert('Enter a valid expense name and amount.')
    return
  }



  try {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('smartspend_token') || ''}`,
      },
      body: JSON.stringify({
        name: name.trim(),
        category,
        amount: parsedAmount,
      }),
    })

    if (!response.ok) {
      throw new Error('The backend could not save this expense.')
    }

    const savedExpense = await response.json()

    setTransactions((current) => [
      {
        id: savedExpense.id ?? Date.now(),
        name: savedExpense.name ?? name,
        category: savedExpense.category ?? category,
        date: savedExpense.date ?? new Date().toISOString().slice(0, 10),
        amount: Number(savedExpense.amount ?? parsedAmount),
        icon:
  category === 'Food' ? '🍽️' :
  category === 'Shopping' ? '🛍️' :
  category === 'Transport' ? '🚕' :
  category === 'Entertainment' ? '🎬' :
  category === 'Health' ? '💊' :
  category === 'Education' ? '📚' :
  '📌',
      },
      ...current,
    ])

    setName('')
    setAmount('')
    setCategory('Food')
    setShowForm(false)
  } catch (error) {
    console.error(error)
    alert(t('saveExpenseError'))
  }
}
function handleEdit(item: Transaction) {
  setEditName(item.name)
  setEditAmount(String(item.amount))
  setEditCategory(item.category)
  setTransactionToEdit(item)
}

async function handleDelete(id: number) {
  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('smartspend_token') || ''}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete expense')
    }

    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    )
  } catch (error) {
    console.error('Delete failed:', error)
    alert('Could not delete this expense. Please try again.')
  }
}
async function saveEditedExpense(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault()

  if (!transactionToEdit) return

  const parsedAmount = Number(editAmount)

  if (!editName.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    alert('Please enter a valid expense name and amount.')
    return
  }

  setIsSavingEdit(true)

  try {
    const response = await fetch(
      `${API_URL}/expenses/${transactionToEdit.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('smartspend_token') || ''}`,
        },
        body: JSON.stringify({
          name: editName.trim(),
          category: editCategory,
          amount: parsedAmount,
          date: transactionToEdit.date,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update expense')
    }

    const updated = await response.json()

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionToEdit.id
          ? {
              ...transaction,
              name: updated.name,
              category: updated.category,
              amount: Number(updated.amount),
              date: updated.date,
            }
          : transaction
      )
    )

    setTransactionToEdit(null)
  } catch (error) {
    console.error('Update failed:', error)
    alert('Could not update this expense. Please try again.')
  } finally {
    setIsSavingEdit(false)
  }
}
  if (!currentUser) {
    return (
      <div className="auth-page">
        <form className="auth-card" onSubmit={handleAuthSubmit}>
          <div className="auth-logo">S</div>
          <p className="auth-eyebrow">PERSONAL FINANCE, SIMPLIFIED</p>
          <h1>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="auth-subtitle">
            {authMode === 'login'
              ? 'Sign in to manage your expenses.'
              : 'Register to start tracking your spending.'}
          </p>
          {authMode === 'register' && (
            <label className="auth-label">
              Full name
              <input
                className="auth-input"
                type="text"
                value={authName}
                onChange={(event) => setAuthName(event.target.value)}
                autoComplete="name"
                required
                minLength={1}
                maxLength={100}
                placeholder="Your name"
              />
            </label>
          )}
          <label className="auth-label">
            Email address
            <input
              className="auth-input"
              type="email"
              value={authEmail}
              onChange={(event) => setAuthEmail(event.target.value)}
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={authPassword}
              onChange={(event) => setAuthPassword(event.target.value)}
              autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={8}
              maxLength={128}
              placeholder="At least 8 characters"
            />
          </label>
          {authError && <p className="auth-error" role="alert">{authError}</p>}
          <button className="auth-submit" type="submit" disabled={authLoading}>
            {authLoading
              ? 'Please wait…'
              : authMode === 'login'
                ? 'Sign in'
                : 'Create account'}
          </button>
          <p className="auth-switch">
            {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}
            {' '}
            <button
              type="button"
              onClick={() => {
                setAuthError('')
                setAuthMode(authMode === 'login' ? 'register' : 'login')
              }}
            >
              {authMode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </form>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard">
          <span className="brand-icon">S</span>
          <span>smart<span className="brand-accent">spend</span></span>
        </a>

        <p className="nav-label">{t('workspace')}</p>
        <nav className="nav-menu">
          

<button
  type="button"
  className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
  onClick={() => setActivePage('dashboard')}
>
  <span>▦</span> {t('dashboard')}
</button>


<button
  type="button"
  className={`nav-item ${activePage === 'transactions' ? 'active' : ''}`}
  onClick={() => setActivePage('transactions')}
>
  <span>↔</span> {t('transactions')}
</button>

<button
  type="button"
  className={`nav-item ${activePage === 'budgets' ? 'active' : ''}`}
  onClick={() => setActivePage('budgets')}
>
  <span>◉</span> {t('budgets')}
</button>

<button
  type="button"
  className={`nav-item ${activePage === 'analytics' ? 'active' : ''}`}
  onClick={() => setActivePage('analytics')}
>
  <span>▥</span> {t('analytics')}
</button>
<button
  type="button"
  className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
  onClick={() => setActivePage('settings')}
>
  <span>⚙</span> {t('settings')}
</button>

        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <span className="sparkle">✦</span>
            <h3>{t('spendSmarter')}</h3>
            <p>{t('moneyHabits')}</p>
          </div>
          
<div className="profile">
  <button
    type="button"
    className="account-profile"
    onClick={() => setActivePage('settings')}
    aria-label={t('openProfileSettings')}
  >
    <span className="account-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>

    <span className="account-profile-info">
      <strong>{currentUser?.name || profileName}</strong>
      <small>{t('personalWorkspace')}</small>
    </span>
  </button>
  <button
    type="button"
    className="logout-button"
    onClick={() => {
      localStorage.removeItem('smartspend_token')
      localStorage.removeItem('smartspend_user')
      setCurrentUser(null)
      setTransactions([])
    }}
  >
    Sign out
  </button>
</div>

          </div>
      </aside>

      <main className="main-content" id="dashboard">
      {activePage !== 'dashboard' && (
    <header className="topbar page-header">
    <div>
      <p className="eyebrow">SmartSpend · {t('workspace')}</p>
      <h1>
        
{activePage === 'transactions'
  ? t('transactions')
  : activePage === 'budgets'
    ? t('budgets')
    : activePage === 'analytics'
      ? t('analytics')
      : t('settings')} ✦

      </h1>
      <p className="muted">{t('manageFinances')}</p>
    </div>
    {activePage === 'transactions' && (
      <button
        className="primary-button"
        onClick={() => setShowForm(true)}
      >
        ＋ {t('addExpense')}
      </button>
    )}
  </header>
)}
        {activePage === 'dashboard' && (
  <header className="topbar">
    <div>
      <p className="eyebrow">{t('financeOverview')}</p>
      <h1>{t(currentHour < 12 ? 'goodMorning' : currentHour < 17 ? 'goodAfternoon' : 'goodEvening')} ✦</h1>
      <p className="muted">{t('moneySummary')}</p>
    </div>
    <button className="primary-button" onClick={() => setShowForm(!showForm)}>
      <span>＋</span> {t('addExpense')}
    </button>
  </header>
)}

        {showForm && (
          <form className="expense-form" onSubmit={addTransaction}>
            <div className="form-heading">
              <h2>{t('addExpense')}</h2>
              <button type="button" className="close-button" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <label>
              {t('description')}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('exampleLunch')} required />
            </label>
            <label>
              {t('amount')} (₹)
              <input type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t('exampleAmount')} required />
            </label>
            
            <label>
              {t('category')}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">{t('food')}</option>
                <option value="Shopping">{t('shopping')}</option>
                <option value="Transport">{t('transport')}</option>
                <option value="Entertainment">{t('entertainment')}</option>
                <option value="Education">{t('education')}</option>
                <option value="Health">{t('health')}</option>
                <option value="Bills">{t('billsUtilities')}</option>
                <option value="Travel">{t('travel')}</option>
                <option value="Personal Care">{t('personalCare')}</option>
                <option value="Other">{t('other')}</option>
              </select>
            </label>

            <button className="primary-button" type="submit">{t('saveExpense')}</button>
          </form>
        )}

<section
  className="stats-grid"
  style={{ display: activePage === 'dashboard' ? undefined : 'none' }}
>
          <article className="stat-card balance-card">
            <div className="stat-top"><span>{t('totalSpent')}</span><span className="stat-icon purple">₹</span></div>
            <h2>{money(totalSpent)}</h2>
            <p><span className="positive">●</span> {t('basedOnTransactions')}</p>
          </article>
          <article className="stat-card">
            <div className="stat-top"><span>{t('monthlyBudget')}</span><span className="stat-icon blue">◷</span></div>
            <h2>{money(budget)}</h2>
            <p className="muted">{t('monthlyLimit')}</p>
          </article>
          <article className="stat-card">
            <div className="stat-top"><span>{t('budgetRemaining')}</span><span className="stat-icon green">↗</span></div>
            <h2>{money(budget - totalSpent)}</h2>
            <p className="muted">{t('budgetMinusSpending')}</p>
          </article>
        </section>

        <section
  className="content-grid"
  style={{
    display:
      activePage === 'dashboard' || activePage === 'analytics'
        ? undefined
        : 'none',
  }}
>
          <article className="panel spending-panel" id="analytics">
            <div className="panel-heading">
              <div><h2>{t('spendingOverview')}</h2><p className="muted">
  {selectedPeriod === 'all-time'
    ? t('allRecorded')
    : selectedPeriod === 'last-month'
      ? t('spendingLastMonth')
      : t('spendingThisMonth')}
</p></div>
              
              <select
  className="period-pill"
  value={selectedPeriod}
  onChange={(event) => setSelectedPeriod(event.target.value)}
>
  <option value="this-month">{t('thisMonth')}</option>
  <option value="last-month">{t('lastMonth')}</option>
  <option value="all-time">{t('allTime')}</option>
</select>

            </div>
            <div className="chart-area">
              <div className="chart-y-labels"><span>₹5k</span><span>₹4k</span><span>₹3k</span><span>₹2k</span><span>₹1k</span><span>₹0</span></div>
              
<div className="bar-chart">
  {spendingByPeriod.map((period) => (
    <div className="bar-column" key={period.day}>
      <div className="bar-track">
        <div
          className="bar"
          style={{
            height: `${(period.amount / maxPeriodAmount) * 100}%`,
          }}
          title={`${period.day}: ${money(period.amount)}`}
        />
      </div>
      <span>{period.day}</span>
    </div>
  ))}
</div>

            </div>
            <p className="chart-note">{t('spendingCalculated')}</p>
          </article>

          
<article className="panel category-panel">
  <div className="panel-heading">
    <div>
      <h2>{t('categoryBreakdown')}</h2>
      <p className="muted">{t('recordedExpenses')}</p>
    </div>
  </div>

  <div className="donut-wrap">
    <div
      className="donut"
      style={{
        background:
          categoryTotal > 0
            ? `conic-gradient(${categories
                .map((item, index) => {
                  const previous = categories
                    .slice(0, index)
                    .reduce(
                      (sum, category) => sum + category.amount,
                      0
                    )

                  const start = (previous / categoryTotal) * 100
                  const end =
                    ((previous + item.amount) / categoryTotal) * 100

                  return `${item.color} ${start}% ${end}%`
                })
                .join(', ')})`
            : '#302a40',
      }}
    >
      <div className="donut-center">
      <strong>{money(categoryTotal)}</strong>
        <span>{t('totalSpent')}</span>
      </div>
    </div>
  </div>

  <div className="category-list">
    {categories.map((item) => (
      <div className="category-row" key={transactionName(item.name)}>
        <div className="category-name">
          <i style={{ background: item.color }} />
          <span>{categoryLabel(item.name)}</span>
        </div>
        <strong>{money(item.amount)}</strong>
      </div>
    ))}
  </div>
</article>

        </section>

        <section
  className={`content-grid bottom-grid ${
    activePage === 'transactions' || activePage === 'budgets'
      ? 'single-page'
      : ''
  }`}
>
        <article
  className="panel transactions-panel"
  id="transactions"
  style={{
    display:
      activePage === 'dashboard' || activePage === 'transactions'
        ? undefined
        : 'none',
  }}
>
            <div className="panel-heading">
              <div><h2>{t('recentTransactions')}</h2><p className="muted">{t('latestExpenses')}</p></div>
              <span className="count-pill">{transactions.length} {t('entries')}</span>
            </div>
            <div className="transaction-list">

            <div className="transaction-search">
  <input
    type="text"
    placeholder={t('search')}
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    aria-label={t('search')}
  />
</div>

<div className="filter-control">
  <label htmlFor="category-filter">{t('filter')}</label>
  <select
    id="category-filter"
    value={filterCategory}
    onChange={(event) => setFilterCategory(event.target.value)}
  >
    <option value="All">{t('allCategories')}</option>
    <option value="Food">{t('food')}</option>
    <option value="Shopping">{t('shopping')}</option>
    <option value="Transport">{t('transport')}</option>
    <option value="Entertainment">{t('entertainment')}</option>
    <option value="Education">{t('education')}</option>
    <option value="Health">{t('health')}</option>
    <option value="Bills">{t('billsUtilities')}</option>
    <option value="Travel">{t('travel')}</option>
    <option value="Personal Care">{t('personalCare')}</option>
    <option value="Other">{t('other')}</option>
  </select>
</div>

  
{transactions
  .filter((item) => filterCategory === 'All' || item.category === filterCategory)
  .filter((item) => (item.category ?? '').toLowerCase().includes(searchQuery.toLowerCase().trim()))
  .map((item) => (
    <div className="transaction-row" key={item.id}>

    <div className="transaction-icon">{item.icon}</div>

    <div className="transaction-info">
      <strong>{transactionName(item.name)}</strong>
      <span>
        {categoryLabel(item.category)} · {item.date}
      </span>
    </div>

    <strong className="transaction-amount">
      -{money(item.amount)}
    </strong>
    <button
  type="button"
  className="edit-transaction"
  onClick={() => handleEdit(item)}
  aria-label={`Edit ${transactionName(item.name)}`}
  title="{t('editExpense')}"
>
  ✏️
</button>
    <button
  type="button"
  className="delete-transaction"
  onClick={() => setTransactionToDelete(item)}
  aria-label={`${t('deleteTransaction')} ${transactionName(item.name)}`}
  title={t('deleteTransaction')}
>
  🗑️
</button>
  </div>
))}

            </div>
          </article>

          <article
  className="panel budget-panel"
  id="budgets"
  style={{
    display:
      activePage === 'dashboard' || activePage === 'budgets'
        ? undefined
        : 'none',
  }}
>
          <div className="panel-heading">
  <div>
    <h2>{t('monthlyBudget')}</h2>
    <p className="muted">{t('backendStatus')}: {apiStatus}</p>
    

    <button
  type="button"
  className="primary-button"
  onClick={() => {
    setBudgetInput(String(budget))
    setShowBudgetModal(true)
  }}
>
{t('editBudget')}
</button>


    </div>
<p className="muted">{t('yourSpendingLimit')}</p>
</div>
            <div className="budget-number"><strong>{money(totalSpent)}</strong><span> {t('of')} {money(budget)}</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${budgetPercent}%` }} /></div>
            <div className="progress-labels"><span>{Math.round((totalSpent / budget) * 100)}% {t('used')}</span><span>{money(Math.max(0, budget - totalSpent))} {t('left')}</span></div>
            <div className="insight-box"><span>✦</span><p><strong>{t('moneyInsight')}</strong><br />{t('insightDescription')}</p></div>
          </article>
        </section>
        {showBudgetModal && (
  <div
    className="budget-modal-overlay"
    onClick={() => setShowBudgetModal(false)}
  >
    <div
      className="budget-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="budget-modal-title"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="budget-modal-icon">₹</div>

      <h2 id="budget-modal-title">{t('updateMonthlyBudget')}</h2>
      <p>{t('setSpendingLimit')}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const value = Number(budgetInput)

          if (!Number.isFinite(value) || value <= 0) {
            return
          }

          setBudget(value)
          localStorage.setItem(`smartspend-budget-${currentUser?.id}`, String(value))
          setShowBudgetModal(false)
        }}
      >
      
        <label htmlFor="budget-input">{t('monthlyBudgetLabel')} (₹)</label>

        <input
          id="budget-input"
          type="number"
          min="1"
          step="1"
          value={budgetInput}
          onChange={(event) => setBudgetInput(event.target.value)}
          placeholder={t('enterAmount')}
          required
          autoFocus
        />

        <div className="budget-modal-actions">
          <button
            type="button"
            className="budget-cancel-button"
            onClick={() => setShowBudgetModal(false)}
          >
            {t('cancel')}
          </button>

          <button type="submit" className="budget-save-button">
            {t('saveBudget')}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{activePage === 'settings' && (
  <section className="settings-page">
    <div className="settings-intro">
      <p className="eyebrow">{t('personaliseExperience')}</p>
      <p className="muted">
        {t('preferencesAccount')}
      </p>
    </div>

    <article className="panel settings-card">
      <div className="settings-card-heading">
        <span className="settings-icon">🎨</span>
        <div>
          <h3>{t('appearance')}</h3>
          <p className="muted">{t('appearanceDescription')}</p>
        </div>
      </div>

      <div className="settings-row">
        <div>
          <strong>{t('theme')}</strong>
          <p className="muted">{t('themeDescription')}</p>
        </div>

        <select
          className="settings-select"
          value={theme}
          onChange={(event) =>
            setTheme(event.target.value as 'dark' | 'light')
          }
        >
          <option value="dark">{t('dark')}</option>
          <option value="light">{t('light')}</option>
        </select>
      </div>
    </article>

    <article className="panel settings-card">
      <div className="settings-card-heading">
        <span className="settings-icon">👤</span>
        <div>
          <h3>{t('profile')}</h3>
          <p className="muted">{t('profileDescription')}</p>
        </div>
      </div>

      <form
        className="settings-form"
        
onSubmit={async (event) => {
  event.preventDefault()
  setSavedProfile(false)

  const token = localStorage.getItem('smartspend_token')

  if (!token) {
    console.error('Please log in again.')
    return
  }

  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: profileName.trim(),
        email: profileEmail.trim(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'Could not save profile')
    }

    localStorage.setItem('smartspend_user', JSON.stringify(data))
    setCurrentUser(data)
    setProfileName(data.name)
    setProfileEmail(data.email)
    localStorage.setItem('smartspend-profile-name', data.name)
    localStorage.setItem('smartspend-profile-email', data.email)
    setSavedProfile(true)
  } catch (error) {
    console.error('Profile update failed:', error)
    alert(
      error instanceof Error
        ? error.message
        : 'Could not save profile. Please try again.'
    )
  }
}}

      >
        <label>
          {t('displayName')}
          <input
            value={profileName}
            onChange={(event) => {
              setProfileName(event.target.value)
              setSavedProfile(false)
            }}
            placeholder={t('enterName')}
            required
          />
        </label>

        <label>
          {t('email')}
          <input
            type="email"
            value={profileEmail}
            onChange={(event) => {
              setProfileEmail(event.target.value)
              setSavedProfile(false)
            }}
            placeholder="you@example.com"
          />
        </label>

        <button className="primary-button" type="submit">
          {t('saveProfile')}
        </button>

        {savedProfile && (
          <p className="settings-success">{t('profileSaved')}</p>
        )}
      </form>
    </article>

    <article className="panel settings-card">
      <div className="settings-card-heading">
        <span className="settings-icon">🌐</span>
        <div>
          <h3>{t('language')}</h3>
          <p className="muted">{t('languageDescription')}</p>
        </div>
      </div>

      <div className="settings-row">
        <div>
          <strong>{t('displayLanguage')}</strong>
          <p className="muted">
            {t('rememberLanguage')}
          </p>
        </div>

        
<select
  className="settings-select"
  value={language}
  onChange={(event) => setLanguage(event.target.value)}
>
  <option value="English">English</option>
  <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
  <option value="Hindi">हिन्दी (Hindi)</option>
  <option value="Tamil">தமிழ் (Tamil)</option>
  <option value="Telugu">తెలుగు (Telugu)</option>
  <option value="Malayalam">മലയാളം (Malayalam)</option>
  <option value="Bengali">বাংলা (Bengali)</option>
  <option value="Marathi">मराठी (Marathi)</option>
  <option value="Gujarati">ગુજરાતી (Gujarati)</option>
  <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
  <option value="Spanish">Español (Spanish)</option>
  <option value="French">Français (French)</option>
  <option value="German">Deutsch (German)</option>
  <option value="Chinese">中文 (Chinese)</option>
  <option value="Japanese">日本語 (Japanese)</option>
  <option value="Korean">한국어 (Korean)</option>
  <option value="Thai">ไทย (Thai)</option>
  <option value="Russian">Русский (Russian)</option>
  <option value="Arabic">العربية (Arabic)</option>
  <option value="Portuguese">Português (Portuguese)</option>
</select>
</div>

      <p className="settings-note">
        {t('displayLanguage')}: {language}
      </p>
    </article>

    <article className="panel settings-card">
      <div className="settings-card-heading">
        <span className="settings-icon">💬</span>
        <div>
          <h3>{t('help')}</h3>
          <p className="muted">
            {t('helpDescription')}
          </p>
        </div>
      </div>

      <form
        className="settings-form"
        onSubmit={(event) => {
          event.preventDefault()
          const message = helpMessage.trim()
          if (!message) return

          const previousMessages = JSON.parse(
            localStorage.getItem('smartspend-support-messages') || '[]'
          )

          previousMessages.push({
            message,
            createdAt: new Date().toISOString(),
          })

          localStorage.setItem(
            'smartspend-support-messages',
            JSON.stringify(previousMessages)
          )

          setHelpMessage('')
          alert(t('messageSaved'))
        }}
      >
        <label>
          {t('howHelp')}
          <textarea
            value={helpMessage}
            onChange={(event) => setHelpMessage(event.target.value)}
            placeholder={t('describeIssue')}
            rows={4}
            required
          />
        </label>

        <button className="primary-button" type="submit">
          {t('submitMessage')}
        </button>

        <p className="settings-note">
          {t('supportDemo')}
        </p>
      </form>
    </article>

    <article className="panel settings-card">
      <div className="settings-card-heading">
        <span className="settings-icon">ℹ️</span>
        <div>
          <h3>{t('about')}</h3>
          <p className="muted">
            {t('aboutDescription')}
          </p>
        </div>
      </div>

      <div className="settings-row">
        <span>{t('application')}</span>
        <strong>SmartSpend</strong>
      </div>

      <div className="settings-row">
        <span>{t('backendStatus')}</span>
        <strong>{apiStatus}</strong>
      </div>
    </article>
  </section>
)}
        <footer>{t('footer')}</footer>
        {transactionToEdit && (
  <div className="modal-overlay">
    <div
      className="delete-modal edit-expense-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-expense-title"
    >
      <div className="delete-modal-icon">✏️</div>
      <h2 id="edit-expense-title">Edit Expense</h2>

      <form onSubmit={saveEditedExpense} className="edit-expense-form">
        <label>
        {t('expenseName')}
          <input
            type="text"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
            required
          />
        </label>

        <label>
        {t('category')}
          <select
            value={editCategory}
            onChange={(event) => setEditCategory(event.target.value)}
            required
          >
            <option value="Food">{t('food')}</option>
            <option value="Shopping">{t('shopping')}</option>
            <option value="Transport">{t('transport')}</option>
            <option value="Entertainment">{t('entertainment')}</option>
            <option value="Education">{t('education')}</option>
            <option value="Health">{t('health')}</option>
            <option value="Other">{t('other')}</option>
          </select>
        </label>

        <label>
          {t('amountLabel')}
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={editAmount}
            onChange={(event) => setEditAmount(event.target.value)}
            required
          />
        </label>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="cancel-delete"
            onClick={() => setTransactionToEdit(null)}
          >
            {t('cancel')}
          </button>

          <button
            type="submit"
            className="confirm-delete"
            disabled={isSavingEdit}
          >
            {isSavingEdit ? t('saving') : t('saveChanges')}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{transactionToDelete && (
  <div className="modal-overlay">
    <div
      className="delete-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="delete-modal-icon">🗑️</div>
      <h2 id="delete-modal-title">{t('deleteTransactionQuestion')}</h2>
      <p>
        {t('confirmDelete')}{' '}
        <strong>{transactionToDelete.name}</strong> (
        {money(transactionToDelete.amount)})?
      </p>

      <div className="delete-modal-actions">
        <button
          type="button"
          className="cancel-delete"
          onClick={() => setTransactionToDelete(null)}
        >
          {t('cancel')}
        </button>

        
<button
  type="button"
  className="confirm-delete"
  onClick={async () => {
    await handleDelete(transactionToDelete.id)
    setTransactionToDelete(null)
  }}
>
  {t('delete')}
</button>

      </div>
    </div>
  </div>
)}

</main>
</div>
)
}

export default App
