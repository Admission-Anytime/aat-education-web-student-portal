import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Calculator,
    FileSpreadsheet,
    Receipt,
    Building2,
    CreditCard,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Shield,
    Download,
    Phone,
    MessageSquare,
    ChevronDown,
    Briefcase,
    Award,
    Users,
    Check,
    Search,
    DollarSign,
    PieChart,
    BarChart3,
    Landmark,
    FileText,
    Database,
    ShieldCheck,
    Layers,
    Cpu,
    Coins,
    Sparkles,
    Laptop,
    HelpCircle,
    X,
    Rocket
} from 'lucide-react';

const technologyTracks = [
    {
        name: 'Basic Tally & Bookkeeping',
        stack: 'Computer Basics • Accounting Principles • TallyPrime • Ledgers • Vouchers',
        desc: 'Designed for beginners who want to master double-entry bookkeeping, understand debit/credit logic, and navigate the TallyPrime workspace with ease.',
        badge: 'Level 1 • Beginner',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/50',
        borderColor: 'border-2 border-emerald-200 hover:border-emerald-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        badgeColor: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/35',
        glow: 'from-emerald-500 to-teal-400',
        accentText: 'text-emerald-700',
        highlight: 'No prior commerce or accounting background required to get started.'
    },
    {
        name: 'Professional GST & Inventory',
        stack: 'TallyPrime • GST Taxation • Invoicing • Godown Inventory • Banking & BRS',
        desc: 'For learners seeking job-ready accounting skills: generate GST-compliant tax invoices, calculate input tax credits, manage warehouse stock, and reconcile bank accounts.',
        badge: 'Level 2 • GST Ready',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/50',
        borderColor: 'border-2 border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        badgeColor: 'bg-blue-600 text-white shadow-xs shadow-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/35',
        glow: 'from-blue-500 to-cyan-400',
        accentText: 'text-blue-700',
        highlight: 'Practical voucher entry using real-world business bills and statutory tax rates.'
    },
    {
        name: 'Advanced Corporate MIS & Payroll',
        stack: 'Payroll Processing • Staff Payslips • Final Accounts • P&L • Balance Sheet',
        desc: 'Comprehensive accounting mastery covering employee payroll, PF/ESI deductions, balance sheet finalization, year-end adjustments, and executive MIS reporting.',
        badge: 'Level 3 • Advanced MIS',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/50',
        borderColor: 'border-2 border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        badgeColor: 'bg-purple-600 text-white shadow-xs shadow-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/35',
        glow: 'from-purple-500 to-violet-400',
        accentText: 'text-purple-700',
        highlight: 'Prepares candidates for corporate accountant, accounts executive, and auditor roles.'
    },
    {
        name: 'Advanced Excel for Accountants',
        stack: 'VLOOKUP / XLOOKUP • Pivot Tables • SUMIFS • Financial Modeling • BRS Sheets',
        desc: 'Master Microsoft Excel to complement TallyPrime. Build automated reconciliation templates, analyze sales trends, calculate variances, and draft boardroom financial models.',
        badge: 'Excel Mastery',
        cardBg: 'from-amber-100/90 via-amber-50/60 to-orange-50/50',
        borderColor: 'border-2 border-amber-200 hover:border-amber-500',
        shadow: 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]',
        badgeColor: 'bg-amber-600 text-white shadow-xs shadow-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/35',
        glow: 'from-amber-500 to-orange-400',
        accentText: 'text-amber-800',
        highlight: 'Crucial computational superpower expected by chartered accountants and MNCs.'
    }
];

const modules = [
    {
        id: '01',
        category: 'foundation',
        title: 'Computer & Office Fundamentals',
        subtitle: 'Build the foundational digital skills required for computerized accounting and modern office work.',
        icon: Cpu,
        badge: 'Office Basics',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-sky-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-600'
        },
        topics: [
            'Computer Hardware & System Fundamentals',
            'Operating System Basics & Windows Navigation',
            'File & Folder Organization for Financial Documents',
            'Keyboard Shortcuts & Efficient Numeric Keypad Skills',
            'Internet Fundamentals & Secure Web Browsing',
            'Professional Email Communication & Attachment Handling',
            'Basic Office Documentation & Data Entry Standards'
        ]
    },
    {
        id: '02',
        category: 'foundation',
        title: 'Accounting Fundamentals & Principles',
        subtitle: 'Master the core concepts of financial accounting, double-entry rules, and transaction analysis.',
        icon: Calculator,
        badge: 'Core Accounting',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-teal-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'Introduction to Accounting: Scope, Objectives & Branches',
            'Essential Accounting Terminology (Assets, Liabilities, Capital)',
            'Understanding Business Transactions & Financial Events',
            'Capital, Drawings, Debtor & Creditor Concepts',
            'Income, Revenue, Capital Expenditure vs Revenue Expenditure',
            'Golden Rules of Accounting & Modern Classification',
            'Principles of Double-Entry Bookkeeping',
            'Constructing Journal Entries & Debit/Credit Logic',
            'Ledger Posting & Account Balancing Concepts',
            'Preparation & Understanding of Trial Balance'
        ]
    },
    {
        id: '03',
        category: 'foundation',
        title: 'Journal & Ledger Accounting Systems',
        subtitle: 'Learn how day-to-day commercial transactions are systematically recorded in subsidiary books.',
        icon: FileText,
        badge: 'Bookkeeping',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Journalizing Real-World Business Transactions',
            'Cash Book: Single Column, Double Column & Petty Cash',
            'Bank Book & Direct Bank Transaction Entries',
            'Purchase Book & Purchase Return (Debit Note) Accounting',
            'Sales Book & Sales Return (Credit Note) Accounting',
            'Expense Recording, Accruals & Prepaid Expenses',
            'Closing & Adjustment Entries at Month/Year End',
            'Techniques for Accurate Ledger Balancing'
        ]
    },
    {
        id: '04',
        category: 'tally',
        title: 'TallyPrime Environment & Software Setup',
        subtitle: 'Explore the modern TallyPrime interface, configuration options, and essential data management.',
        icon: Database,
        badge: 'Software Setup',
        theme: {
            cardBg: 'from-cyan-50/90 via-white to-blue-50/40',
            border: 'border-cyan-200 hover:border-cyan-400',
            badge: 'bg-cyan-600 text-white shadow-xs shadow-cyan-500/20',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
            accent: 'text-cyan-700'
        },
        topics: [
            'Introduction to TallyPrime & Software Evolution',
            'TallyPrime Navigation, Top Bar, Gateway of Tally & Shortcuts',
            'Company Creation with Detailed Statutory & Financial Info',
            'Company Alteration, Deletion & Financial Year Selection',
            'F11 Company Features (Accounting, Inventory, Statutory)',
            'F12 Configuration Settings for Tailored Workflows',
            'Security Controls, User Roles & Password Administration',
            'Data Backup, Restore & Multi-Company Management'
        ]
    },
    {
        id: '05',
        category: 'tally',
        title: 'Company Creation & Business Configuration',
        subtitle: 'Configure commercial setups, industry specific rules, and administrative controls in TallyPrime.',
        icon: Building2,
        badge: 'Configuration',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-emerald-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Complete Company Master Setup for Traders & Service Providers',
            'Configuring Address, State, PIN, Currency & Multi-Currency',
            'Enabling Inventory & Multi-Godown Storage Capabilities',
            'Enabling GST, PAN, TAN & Tax Configurations',
            'Configuring Numbering Systems for Invoices & Vouchers',
            'User Access Management & Operator Privilege Controls',
            'Data Splitting at Year End & Company Maintenance'
        ]
    },
    {
        id: '06',
        category: 'tally',
        title: 'Chart of Accounts: Groups & Ledgers',
        subtitle: 'Organize financial accounts systematically using primary groups, sub-groups, and custom ledgers.',
        icon: Layers,
        badge: 'Account Masters',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-orange-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Understanding 28 Pre-defined Groups in TallyPrime',
            'Primary Groups vs Secondary Sub-Groups Explained',
            'Creating Custom Groups for Specific Business Requirements',
            'Creating, Altering & Deleting Single & Multiple Ledgers',
            'Setting Up Cash & Bank Ledgers with Details',
            'Creating Sundry Debtors (Customers) & Sundry Creditors (Suppliers)',
            'Configuring Direct & Indirect Expense / Income Accounts',
            'Capital Accounts, Reserves & Loan Account Masters'
        ]
    },
    {
        id: '07',
        category: 'tally',
        title: 'Voucher Entry & Day-to-Day Transactions',
        subtitle: 'Master the entry of operational business transactions through standard accounting voucher types.',
        icon: Receipt,
        badge: 'Voucher Entry',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'Overview of Standard Accounting Voucher Types (F4 to F9)',
            'Contra Voucher (F4): Cash-to-Bank & Bank-to-Bank Transfers',
            'Payment Voucher (F5): Vendor Payments, Office & Utility Expenses',
            'Receipt Voucher (F6): Customer Collections, Capital & Incomes',
            'Journal Voucher (F7): Non-Cash Adjustments & Depreciation Entries',
            'Sales Voucher (F8): Cash & Credit Sales Entry',
            'Purchase Voucher (F9): Inward Supplies & Commercial Purchases',
            'Debit Note (Alt+F5) & Credit Note (Alt+F6) Processing',
            'Practical Simulation of Daily Trading Transactions'
        ]
    },
    {
        id: '08',
        category: 'inventory',
        title: 'Inventory & Stock Management',
        subtitle: 'Manage items, stock categories, units of measure, godowns, and stock valuation methods.',
        icon: Landmark,
        badge: 'Inventory',
        theme: {
            cardBg: 'from-indigo-50/90 via-white to-blue-50/40',
            border: 'border-indigo-200 hover:border-indigo-400',
            badge: 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20',
            iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xs',
            accent: 'text-indigo-700'
        },
        topics: [
            'Inventory Fundamentals & Trading Flow in Business',
            'Creating Units of Measure (Simple & Compound: Pcs, Kgs, Box)',
            'Setting Up Stock Groups & Product Categories',
            'Stock Item Creation with Opening Balances & Reorder Levels',
            'Godown / Location Creation & Stock Transfers between Branches',
            'Stock Journal Voucher for Inter-Godown Transfers',
            'Physical Stock Verification & Adjustment Vouchers',
            'Stock Valuation Methods: FIFO, Weighted Average & LIFO',
            'Stock Summary, Item Movement Analysis & Ageing Reports'
        ]
    },
    {
        id: '09',
        category: 'taxation',
        title: 'Billing & Commercial Invoicing',
        subtitle: 'Generate compliant tax invoices, bill-of-supply, discount structures, and print layouts.',
        icon: CreditCard,
        badge: 'Billing',
        theme: {
            cardBg: 'from-blue-50/90 via-white to-sky-50/40',
            border: 'border-blue-200 hover:border-blue-400',
            badge: 'bg-blue-600 text-white shadow-xs shadow-blue-500/20',
            iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs',
            accent: 'text-blue-700'
        },
        topics: [
            'Invoice Modes: Item Invoice, Accounting Invoice & As Voucher',
            'Creating Commercial Sales Invoices with Quantities & Rates',
            'Recording Purchase Invoices with Vendor Challans & Ref Nos',
            'Applying Trade Discounts, Cash Discounts & Separate Discount Columns',
            'Additional Charges: Freight, Packing, Courier & Delivery Fees',
            'Customer Billing & Shipping Address Setup',
            'Invoice Printing, Multi-Copy Layouts & Logo Customization'
        ]
    },
    {
        id: '10',
        category: 'taxation',
        title: 'GST & Taxation Fundamentals',
        subtitle: 'Understand GST law basics, tax ledgers, interstate vs intrastate supplies, and GST reports.',
        icon: ShieldCheck,
        badge: 'GST & Tax',
        theme: {
            cardBg: 'from-emerald-50/90 via-white to-green-50/40',
            border: 'border-emerald-200 hover:border-emerald-400',
            badge: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20',
            iconBg: 'bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-xs',
            accent: 'text-emerald-700'
        },
        topics: [
            'GST Architecture in India: Dual GST Model & Tax Slabs',
            'Registration Concepts: Regular vs Composition Taxpayers',
            'Tax Components: CGST, SGST, IGST & Compensation Cess',
            'Intrastate (Local) vs Interstate (Outside State) Transactions',
            'HSN (Goods) & SAC (Services) Codes Configuration',
            'Setting Up GST Tax Ledgers (Input CGST, Output SGST, etc.)',
            'Creating GST Compliant Sales & Purchase Invoices',
            'Input Tax Credit (ITC) Rules, Eligibility & Reversals',
            'GST Reports: GSTR-1, GSTR-2B/3B View & E-Way Bill Basics'
        ]
    },
    {
        id: '11',
        category: 'banking',
        title: 'Banking Operations & Bank Reconciliation (BRS)',
        subtitle: 'Manage multi-currency bank accounts, cheque registers, electronic transfers, and BRS reconciliation.',
        icon: Landmark,
        badge: 'Banking & BRS',
        theme: {
            cardBg: 'from-purple-50/90 via-white to-violet-50/40',
            border: 'border-purple-200 hover:border-purple-400',
            badge: 'bg-purple-600 text-white shadow-xs shadow-purple-500/20',
            iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xs',
            accent: 'text-purple-700'
        },
        topics: [
            'Configuring Bank Accounts with Branch, IFSC & Account Numbers',
            'Cheque Book Management & Cheque Printing Configuration',
            'Recording Deposits, Clearances & Electronic Transfers (NEFT/RTGS/UPI)',
            'Recording Bank Charges, Loan Interest & Automatic Debits',
            'Understanding Causes for Differences between Cash Book & Passbook',
            'Step-by-Step Bank Reconciliation Statement (BRS) Process',
            'Auto Bank Reconciliation via Bank Statements (Excel/CSV Upload)',
            'Managing Post-Dated Cheques (PDC) & Dishonored Cheques'
        ]
    },
    {
        id: '12',
        category: 'banking',
        title: 'Accounts Receivable & Accounts Payable',
        subtitle: 'Track customer dues, vendor commitments, credit periods, payment reminders, and aging analysis.',
        icon: Coins,
        badge: 'Receivables & Payables',
        theme: {
            cardBg: 'from-amber-50/90 via-white to-yellow-50/40',
            border: 'border-amber-200 hover:border-amber-400',
            badge: 'bg-amber-600 text-white shadow-xs shadow-amber-500/20',
            iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
            accent: 'text-amber-800'
        },
        topics: [
            'Bill-Wise Details Configuration for Debtors & Creditors',
            'Methods of Adjustment: New Ref, Against Ref, Advance, On Account',
            'Tracking Customer Invoices & Managing Credit Periods / Limits',
            'Recording Customer Receipts with Accurate Bill Settlement',
            'Vendor Bill Settlement & Advance Payment Adjustments',
            'Receivable Reports: Bills Outstanding & Due Date Tracking',
            'Payable Reports: Pending Vendor Dues & Cash Flow Planning',
            'Ageing Analysis: 0-30 Days, 30-60 Days, 60+ Days Overdue'
        ]
    },
    {
        id: '13',
        category: 'payroll',
        title: 'Payroll Accounting & Salary Processing',
        subtitle: 'Set up employee masters, salary components, attendance tracking, and monthly payslip generation.',
        icon: Users,
        badge: 'Payroll',
        theme: {
            cardBg: 'from-teal-50/90 via-white to-cyan-50/40',
            border: 'border-teal-200 hover:border-teal-400',
            badge: 'bg-teal-600 text-white shadow-xs shadow-teal-500/20',
            iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xs',
            accent: 'text-teal-700'
        },
        topics: [
            'Payroll Module Activation & Basic Regulatory Workflow',
            'Creating Employee Groups & Individual Employee Master Records',
            'Defining Earnings Pay Heads: Basic Pay, HRA, DA, Conveyance',
            'Defining Deductions Pay Heads: PF, ESI, TDS, Professional Tax',
            'Configuring Salary Structure for Different Designation Bands',
            'Recording Attendance & Leave Records (Present, Absent, Leaves)',
            'Monthly Payroll Voucher Entry & Salary Processing',
            'Generating Automated Pay Slips & Pay Sheets for Staff'
        ]
    },
    {
        id: '14',
        category: 'final',
        title: 'Final Financial Statements & Year-End Closing',
        subtitle: 'Convert transaction entries into final business balance sheets, P&L accounts, and closing entries.',
        icon: TrendingUp,
        badge: 'Final Statements',
        theme: {
            cardBg: 'from-rose-50/90 via-white to-pink-50/40',
            border: 'border-rose-200 hover:border-rose-400',
            badge: 'bg-rose-600 text-white shadow-xs shadow-rose-500/20',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
            accent: 'text-rose-700'
        },
        topics: [
            'Generating & Reading the Complete Trial Balance',
            'Trading Account: Gross Profit / Loss Calculation',
            'Profit & Loss (P&L) Account: Net Profit / Loss Determination',
            'Balance Sheet: Liabilities vs Assets Presentation',
            'Vertical vs Horizontal Financial Statement Layouts',
            'Cash Flow Statement & Funds Flow Summaries',
            'Auditing Working Papers & Ledger Verification Techniques',
            'Financial Year-End Closing Entries & Opening Balances Roll-Forward'
        ]
    },
    {
        id: '15',
        category: 'final',
        title: 'Management Information System (MIS) Reports',
        subtitle: 'Extract high-value business insights, ratio analysis, profitability reports, and executive dashboards.',
        icon: BarChart3,
        badge: 'MIS Reporting',
        theme: {
            cardBg: 'from-violet-50/90 via-white to-purple-50/40',
            border: 'border-violet-200 hover:border-violet-400',
            badge: 'bg-violet-600 text-white shadow-xs shadow-violet-500/20',
            iconBg: 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xs',
            accent: 'text-violet-700'
        },
        topics: [
            'Importance of MIS in Business Decision-Making',
            'Cash Flow & Funds Flow Analytical Reports',
            'Ratio Analysis: Current Ratio, Quick Ratio, Debt-Equity Ratio',
            'Product & Brand-Wise Profitability Reports',
            'Sales Register & Purchase Register Analysis',
            'Stock Valuation Summaries & Dead Stock Identification',
            'Budgeting & Cost Centre Variance Reporting',
            'Exporting Tally Data to Excel, PDF & HTML Formats'
        ]
    },
    {
        id: '16',
        category: 'excel',
        title: 'Microsoft Excel for Professional Accountants',
        subtitle: 'Harness formulas, lookup functions, pivot tables, and reconciliation sheets to complement TallyPrime.',
        icon: FileSpreadsheet,
        badge: 'Excel Mastery',
        theme: {
            cardBg: 'from-green-50/90 via-white to-emerald-50/40',
            border: 'border-green-200 hover:border-green-400',
            badge: 'bg-green-600 text-white shadow-xs shadow-green-500/20',
            iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xs',
            accent: 'text-green-700'
        },
        topics: [
            'Excel Interface, Data Formatting & Cell Formatting for Finance',
            'Essential Math Formulas: SUM, AVERAGE, ROUND, MIN, MAX',
            'Logical Formulas: IF, Nested IF, AND, OR, IFS',
            'Counting & Totaling: COUNT, COUNTA, COUNTIF, SUMIF, SUMIFS',
            'Lookup Masterclass: VLOOKUP, HLOOKUP, XLOOKUP & INDEX-MATCH',
            'Data Cleaning: Text-to-Columns, Remove Duplicates & Trim',
            'Conditional Formatting for Highlighting Outstanding & Deficits',
            'Pivot Tables & Pivot Charts for Instant Financial Summaries',
            'Building Automated Bank Reconciliation & MIS Templates in Excel'
        ]
    }
];

const projects = [
    {
        tier: 'Tier 1: Beginner Business Bookkeeping',
        tag: 'Level 1',
        tagBg: 'bg-blue-600 text-white shadow-xs shadow-blue-500/25',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        cardBg: 'from-blue-100/90 via-blue-50/60 to-cyan-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md',
        glow: 'from-blue-500 to-cyan-400',
        titleColor: 'text-blue-950',
        items: [
            { name: 'Company Master File Setup', desc: 'Create a complete company file in TallyPrime with financial year dates, PAN, address, currency, and statutory settings.' },
            { name: 'Chart of Accounts & Ledger Classification', desc: 'Build 40+ ledgers covering capital, assets, liabilities, sundry debtors, sundry creditors, expenses, and revenues.' },
            { name: 'Cash, Bank & Petty Cash Registers', desc: 'Record daily cash-to-bank deposits, withdrawals, petty cash vouchers, and routine administrative office expenses.' }
        ]
    },
    {
        tier: 'Tier 2: Trading Business & GST Simulation',
        tag: 'Level 2',
        tagBg: 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/25',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        cardBg: 'from-emerald-100/90 via-emerald-50/60 to-teal-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md',
        glow: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        items: [
            { name: 'Multi-Godown Inventory & Stock Transfers', desc: 'Set up warehouse godowns, units of measure, categories, reorder levels, and process stock transfers using stock journals.' },
            { name: 'GST-Compliant Invoicing & Tax Registers', desc: 'Configure HSN codes, create CGST/SGST/IGST tax ledgers, generate tax invoices, and prepare GSTR-1 and GSTR-3B summaries.' },
            { name: 'Bank Reconciliation Statement (BRS)', desc: 'Reconcile commercial company bank books with real bank passbooks containing uncredited cheques and bank charges.' }
        ]
    },
    {
        tier: 'Tier 3: Corporate Payroll, Final Accounts & MIS',
        tag: 'Level 3',
        tagBg: 'bg-purple-600 text-white shadow-xs shadow-purple-500/25',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        cardBg: 'from-purple-100/90 via-purple-50/60 to-violet-50/40',
        shadow: 'hover:shadow-[0_16px_36px_rgba(147,51,234,0.18)]',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md',
        glow: 'from-purple-500 to-violet-400',
        titleColor: 'text-purple-950',
        items: [
            { name: 'Full Staff Payroll & Automated Payslips', desc: 'Process monthly salaries, PF and ESI contributions, professional tax deductions, and generate automated employee payslips.' },
            { name: 'Final Accounts & Balance Sheet Audit', desc: 'Prepare Trading Account, Profit & Loss Account, and complete Balance Sheet with depreciation and prepaid adjustment entries.' },
            { name: 'Advanced Excel MIS Financial Model', desc: 'Export Tally data to Excel, construct Pivot Tables, XLOOKUP reconciliation sheets, and executive profitability dashboard decks.' }
        ]
    }
];

const skillsWithThemes = [
    { name: 'TallyPrime Navigation & Setup', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Double-Entry Bookkeeping', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'GST Calculation & E-Way Bills', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
    { name: 'GSTR-1 & GSTR-3B Reports', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'Bank Reconciliation (BRS)', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Multi-Godown Inventory', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { name: 'Accounts Payable & Receivable', bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { name: 'Payroll Processing & PF/ESI', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { name: 'Balance Sheet & P&L Statements', bg: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { name: 'Advanced Microsoft Excel (VLOOKUP/Pivot)', bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100' },
    { name: 'MIS Financial Reporting', bg: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' }
];

const careerRoles = [
    {
        title: 'Accounts Executive',
        desc: 'Manage day-to-day voucher entries, vendor invoices, customer collections, and bank transactions.',
        cardBg: 'from-blue-100/90 via-blue-50/70 to-indigo-50/50',
        border: 'border-2 border-blue-200 hover:border-blue-500',
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        titleColor: 'text-blue-950 group-hover:text-blue-600'
    },
    {
        title: 'GST & Billing Specialist',
        desc: 'Generate compliant tax invoices, maintain input tax credit records, and prepare monthly GST filings.',
        cardBg: 'from-emerald-100/90 via-emerald-50/70 to-teal-50/50',
        border: 'border-2 border-emerald-200 hover:border-emerald-500',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
        titleColor: 'text-emerald-950 group-hover:text-emerald-600'
    },
    {
        title: 'Inventory & Store Accountant',
        desc: 'Oversee multi-location warehouse stock, monitor reorder levels, and manage stock valuations.',
        cardBg: 'from-purple-100/90 via-purple-50/70 to-violet-50/50',
        border: 'border-2 border-purple-200 hover:border-purple-500',
        iconBg: 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
        titleColor: 'text-purple-950 group-hover:text-purple-600'
    },
    {
        title: 'Payroll Executive',
        desc: 'Process monthly salaries, calculate statutory PF and ESI contributions, and generate staff payslips.',
        cardBg: 'from-cyan-100/90 via-cyan-50/70 to-sky-50/50',
        border: 'border-2 border-cyan-200 hover:border-cyan-500',
        iconBg: 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-500/30',
        titleColor: 'text-cyan-950 group-hover:text-cyan-600'
    },
    {
        title: 'Senior Accountant / MIS Analyst',
        desc: 'Finalize financial statements, coordinate with statutory auditors, and deliver board-level MIS reports.',
        cardBg: 'from-amber-100/90 via-amber-50/70 to-orange-50/50',
        border: 'border-2 border-amber-200 hover:border-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
        titleColor: 'text-amber-950 group-hover:text-amber-600'
    }
];

const roadmapStages = [
    { step: '01', stage: 'FOUNDATION', desc: 'Accounting Principles, Golden Rules & Office Digital Basics', cardBg: 'from-blue-100/90 via-blue-50/60 to-white', border: 'border-2 border-blue-200 hover:border-blue-400', stepColor: 'text-blue-600' },
    { step: '02', stage: 'TALLY MASTERS', desc: 'Company Setup, 28 Groups & Chart of Accounts', cardBg: 'from-indigo-100/90 via-indigo-50/60 to-white', border: 'border-2 border-indigo-200 hover:border-indigo-400', stepColor: 'text-indigo-600' },
    { step: '03', stage: 'VOUCHER ENTRY', desc: 'Payment, Receipt, Contra, Sales & Purchase Entries', cardBg: 'from-cyan-100/90 via-cyan-50/60 to-white', border: 'border-2 border-cyan-200 hover:border-cyan-400', stepColor: 'text-cyan-700' },
    { step: '04', stage: 'GST & INVENTORY', desc: 'HSN Codes, Tax Invoices, Godowns & Stock Summaries', cardBg: 'from-teal-100/90 via-teal-50/60 to-white', border: 'border-2 border-teal-200 hover:border-teal-400', stepColor: 'text-teal-700' },
    { step: '05', stage: 'BANKING & PAYROLL', desc: 'Bank Reconciliation (BRS), Salary Slips & PF/ESI', cardBg: 'from-purple-100/90 via-purple-50/60 to-white', border: 'border-2 border-purple-200 hover:border-purple-400', stepColor: 'text-purple-600' },
    { step: '06', stage: 'FINAL ACCOUNTS & EXCEL', desc: 'P&L, Balance Sheet, Excel Pivot Tables & Placement', cardBg: 'from-rose-100/90 via-rose-50/60 to-white', border: 'border-2 border-rose-200 hover:border-rose-400', stepColor: 'text-rose-600' }
];

const faqItems = [
    {
        q: 'Do I need a commerce background (11th/12th/B.Com) to learn TallyPrime?',
        a: 'No prior commerce or accounting background is required. The curriculum begins with Module 01 & 02, teaching accounting terminology, the Golden Rules of accounting, and debit/credit logic from absolute scratch.'
    },
    {
        q: 'Which software version is taught in the course?',
        a: 'We train on the latest official TallyPrime software version, including modern interface navigation, e-invoicing capabilities, and GST statutory updates.'
    },
    {
        q: 'Is Microsoft Excel included in the Tally & Accounting training?',
        a: 'Yes! Module 16 is dedicated to Advanced Excel for Accountants, covering financial formulas (SUMIFS, COUNTIFS), lookup functions (VLOOKUP, XLOOKUP), data cleaning, Pivot Tables, and automated BRS templates.'
    },
    {
        q: 'What certificate will I receive upon completion?',
        a: 'Upon successfully completing all modules, practical voucher entry assignments, and the final business accounting simulation, you receive an authorized Institute Certificate in Computerized Financial Accounting from Aayush Institute (Est. 2002).'
    },
    {
        q: 'What kind of career and placement support is provided?',
        a: 'We provide comprehensive career guidance, including resume building, practical voucher entry tests, mock accounting interviews, and placement assistance through our active employer recruitment network at no additional cost.'
    },
    {
        q: 'What are the batch timings and class modes?',
        a: 'We offer flexible weekday morning, afternoon, and evening batches, as well as dedicated weekend batches for college students, business owners, and working professionals. Classes include classroom instruction and practical computer lab sandbox sessions.'
    }
];

export default function TallyAccounting() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModule, setOpenModule] = useState('01');
    const [openFaq, setOpenFaq] = useState(0);

    const categories = [
        { id: 'all', label: 'All 16 Modules' },
        { id: 'foundation', label: 'Foundation & Principles' },
        { id: 'tally', label: 'TallyPrime & Vouchers' },
        { id: 'inventory', label: 'Inventory & Stock' },
        { id: 'taxation', label: 'GST & Invoicing' },
        { id: 'banking', label: 'Banking & BRS' },
        { id: 'payroll', label: 'Payroll Processing' },
        { id: 'final', label: 'Final Accounts & MIS' },
        { id: 'excel', label: 'Excel for Accountants' }
    ];

    const filteredModules = useMemo(() => {
        return modules.filter(m => {
            const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesQuery = !q ||
                m.title.toLowerCase().includes(q) ||
                m.subtitle.toLowerCase().includes(q) ||
                m.badge.toLowerCase().includes(q) ||
                m.topics.some(t => t.toLowerCase().includes(q));
            return matchesCategory && matchesQuery;
        });
    }, [searchQuery, selectedCategory]);

    const handleExpandAll = () => {
        if (openModule === 'ALL') {
            setOpenModule(null);
        } else {
            setOpenModule('ALL');
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f8fc]">
            {/* ── 1. HERO SECTION (Light Sky-Blue Matching Standard Layout) ── */}
            <div
                className="relative overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] flex items-center"
                style={{
                    backgroundImage: "url('/course_hero.png')",
                    backgroundColor: '#d6ecff'
                }}
            >
                {/* Mobile overlay for crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d6ecff]/95 via-[#d6ecff]/80 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
                    <div className="flex flex-col justify-center py-5 sm:py-6 lg:py-7 max-w-full sm:max-w-[460px] md:max-w-[520px] lg:max-w-2xl">
                        {/* Glowing Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-[#0055cc] text-[11px] font-semibold tracking-wide mb-2.5 border border-blue-200/60 shadow-xs w-fit backdrop-blur-xs">
                            <Calculator className="w-3.5 h-3.5 text-[#0055cc]" />
                            <span>TALLYPRIME &amp; FINANCIAL ACCOUNTING • OFFICIAL CURRICULUM</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-bold text-[#0a1f3c] leading-[1.18] mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                            Master TallyPrime &amp;{' '}
                            <span className="text-[#0055ff] block sm:inline">Financial Accounting</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#3b516d] text-xs sm:text-sm leading-relaxed max-w-lg mb-3.5 font-normal">
                            Master professional double-entry accounting, GST taxation, inventory management, bank reconciliations (BRS), payroll processing, final balance sheets, and advanced Microsoft Excel with 100% practical computer lab training.
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-5">
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <BookOpen className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">16 Core Modules</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Layers className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">4 Accounting Tracks</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-1 md:p-0 rounded-lg border border-blue-200/60 md:border-none shadow-2xs md:shadow-none">
                                <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold text-[#1e3a5f] leading-tight">100% Practical &amp; Placement</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <a
                                href="#curriculum"
                                className="inline-flex items-center justify-center gap-2 bg-[#0055ff] hover:bg-[#0044dd] text-white font-semibold text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Explore Curriculum</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </a>
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#004b93] font-semibold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-[#0066ff]" />
                                <span>Enquire for Batch</span>
                            </NavLink>
                            <a
                                href="/tally_accounting_doc.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 bg-white/80 hover:bg-white text-slate-700 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-full border border-slate-200/80 shadow-2xs transition-all duration-200"
                            >
                                <Download className="w-3.5 h-3.5 text-blue-600" />
                                <span>Download Syllabus</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. ARCHITECTURE & OVERVIEW MATRIX (Ultra-Colorful 4 Cards) ── */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                    {/* Card 1: What is Computerized Accounting */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100/90 via-blue-50/70 to-indigo-50/50 rounded-2xl p-5 border-2 border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/35">
                            <Calculator className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-blue-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                            What is Tally &amp; Accounting?
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Computerized accounting records daily commercial business operations, manages GST statutory taxes, controls inventories, processes employee payroll, and finalizes financial statements.
                        </p>
                    </div>

                    {/* Card 2: Accounting Stack Layers */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-indigo-50/70 to-purple-50/50 rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/35">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-indigo-950 mb-1.5 group-hover:text-indigo-600 transition-colors">
                            Core Financial Modules
                        </h2>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-emerald-600">Vouchers:</span> Sales, Purchases, Receipts
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-blue-600">Taxation:</span> GST, CGST, SGST, IGST
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-purple-600">Inventory:</span> Godowns, Stock Valuation
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="font-semibold text-amber-600">Reports:</span> Balance Sheet, P&amp;L &amp; Excel
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: Who Can Enroll */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-purple-100/90 via-purple-50/70 to-fuchsia-50/50 rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-500 shadow-sm hover:shadow-[0_16px_36px_rgba(168,85,247,0.18)] transition-all duration-300 hover:-translate-y-1 group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/35">
                            <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm sm:text-base font-semibold text-purple-950 mb-1.5 group-hover:text-purple-600 transition-colors">
                            Who Can Enroll?
                        </h2>
                        <ul className="space-y-1 text-xs text-slate-600 font-normal">
                            <li>• 12th Pass (Any stream: Commerce, Arts, Science)</li>
                            <li>• B.Com, BBA, BA &amp; College Graduates</li>
                            <li>• Business Owners wanting accounting control</li>
                            <li>• Freshers seeking corporate accounts jobs</li>
                            <li>• Working accountants upskilling in GST &amp; MIS</li>
                        </ul>
                    </div>

                    {/* Card 4: Active Batch Snapshot */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-100/90 via-emerald-50/70 to-teal-50/50 rounded-2xl p-5 border-2 border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 opacity-20 blur-xl pointer-events-none group-hover:opacity-40 transition-opacity" />
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/35">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                    Spring 2026 Open
                                </span>
                            </div>
                            <h2 className="text-sm sm:text-base font-semibold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
                                Accounts Admissions
                            </h2>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-2">
                                100% practical voucher entry lab sessions on real GST trading company datasets with senior accounting faculties.
                            </p>
                        </div>
                        <div className="pt-2.5 border-t border-emerald-200 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700">Helpline:</span>
                            <a href="tel:8800817447" className="text-xs font-semibold text-blue-600 hover:underline">
                                0120-2611111 / +91-8800817447
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── 3. SPECIALIZED TECHNOLOGY TRACKS (Vivid Colorful Cards) ── */}
                <div className="mb-14">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <Receipt className="w-3.5 h-3.5" />
                            <span>SPECIALIZED ACCOUNTING PATHWAYS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Choose Your Financial Accounting Specialization
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Select the curriculum suited to your background — from fundamental ledger bookkeeping to GST taxation, corporate payroll, and executive Excel MIS models.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {technologyTracks.map((track, idx) => (
                            <div
                                key={idx}
                                className={`relative overflow-hidden bg-gradient-to-br ${track.cardBg} rounded-2xl p-5 sm:p-6 ${track.borderColor} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${track.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
                            >
                                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${track.glow} opacity-15 blur-2xl pointer-events-none group-hover:opacity-35 transition-opacity`} />

                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3.5">
                                        <div className={`w-9 h-9 rounded-xl ${track.iconBg} flex items-center justify-center font-semibold text-xs`}>
                                            <Laptop className="w-4.5 h-4.5" />
                                        </div>
                                        <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full ${track.badgeColor}`}>
                                            {track.badge}
                                        </span>
                                    </div>
                                    <h3 className={`text-base font-semibold text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors`}>
                                        {track.name}
                                    </h3>
                                    <div className="text-[11px] font-mono text-slate-800 bg-white/80 rounded-lg px-2.5 py-1 mb-3 border border-slate-200/80 shadow-2xs">
                                        {track.stack}
                                    </div>
                                    <p className="text-xs text-slate-600 font-normal leading-relaxed mb-3.5">
                                        {track.desc}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-normal italic">
                                    💡 {track.highlight}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 4. COMPLETE 16 MODULE CURRICULUM (Interactive Accordion) ── */}
                <div id="curriculum" className="mb-14 scroll-mt-6">
                    <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-sm">
                        {/* Header & Controls */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>STRUCTURED ACCOUNTING SYLLABUS</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                                    Complete Curriculum (All 16 Modules)
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                                    A structured journey from office computer fundamentals and double-entry accounting to TallyPrime, GST invoices, payroll, and financial statements.
                                </p>
                            </div>

                            {/* Search & Expand All */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="relative min-w-[220px] sm:min-w-[260px]">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search TallyPrime, GST, BRS, Payroll, Excel..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={handleExpandAll}
                                    className="px-4 py-2 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                                >
                                    {openModule === 'ALL' ? 'Collapse All' : 'Expand All'}
                                </button>
                            </div>
                        </div>

                        {/* Category Filter Chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {categories.map((cat) => {
                                const active = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                            active
                                                ? 'bg-[#0055ff] text-white shadow-xs scale-[1.02]'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                            <span className="text-xs text-slate-500 font-normal ml-auto">
                                Showing {filteredModules.length} of {modules.length} modules
                            </span>
                        </div>

                        {/* Colorful Module Accordion List in 1*2 Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                            {filteredModules.length === 0 ? (
                                <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm font-semibold text-slate-700">No modules match &ldquo;{searchQuery}&rdquo;</p>
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">Try searching for keywords like GST, BRS, Inventory, Vouchers, or Excel</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                        className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            ) : (
                                filteredModules.map((m) => {
                                    const isOpen = openModule === 'ALL' || openModule === m.id;

                                    return (
                                        <div
                                            key={m.id}
                                            className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                                                isOpen
                                                    ? `${m.theme.border} shadow-md bg-white`
                                                    : `border-slate-200 hover:${m.theme.border} bg-gradient-to-r ${m.theme.cardBg} hover:bg-white`
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (openModule === 'ALL') {
                                                        setOpenModule(m.id);
                                                    } else {
                                                        setOpenModule(isOpen ? null : m.id);
                                                    }
                                                }}
                                                className="w-full px-3.5 sm:px-4.5 py-3.5 sm:py-4 flex items-start justify-between text-left gap-2.5 sm:gap-3 cursor-pointer"
                                            >
                                                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                                                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-semibold text-xs mt-0.5 ${m.theme.iconBg}`}>
                                                        {m.id}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                                            <h3 className="text-xs sm:text-[13.5px] font-semibold text-slate-800 leading-snug">
                                                                {m.title}
                                                            </h3>
                                                            <span className={`text-[9.5px] font-medium px-2 py-0.5 rounded-full ${m.theme.badge}`}>
                                                                {m.badge}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                                                            {m.subtitle}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                                    <span className="text-[10px] font-semibold text-slate-400 hidden xl:inline">
                                                        {m.topics.length} topics
                                                    </span>
                                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                                                        isOpen ? 'rotate-180 bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 shadow-2xs'
                                                    }`}>
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </div>
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-3.5 sm:px-5 pb-4 pt-2 border-t border-slate-100 bg-[#fbfdff]">
                                                    <div className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400 mb-2 pt-1">
                                                        Key Topics &amp; Competencies in Module {m.id}:
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                                        {m.topics.map((topic, tIdx) => (
                                                            <div
                                                                key={tIdx}
                                                                className="bg-white rounded-lg p-2 border border-slate-200/90 flex items-start gap-1.5 shadow-2xs hover:border-blue-300 transition-colors"
                                                            >
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                                                                <span className="text-[11px] font-normal text-slate-700 leading-snug">
                                                                    {topic}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* ── 5. REAL PROJECT DEVELOPMENT (Ultra-Colorful 3 Tiers) ── */}
                <div className="mb-14">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-semibold mb-2 border border-emerald-200">
                            <Rocket className="w-3.5 h-3.5" />
                            <span>PRACTICAL ACCOUNTING LAB</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Hands-On Real Business Accounting Simulations
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                            Practice with authentic trading receipts, supplier tax invoices, employee salary registers, and real bank passbooks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                        {projects.map((tier, pIdx) => (
                            <div
                                key={pIdx}
                                className={`relative overflow-hidden bg-gradient-to-br ${tier.cardBg} rounded-3xl p-5 sm:p-6 ${tier.border} shadow-[0_6px_22px_rgba(0,0,0,0.06)] ${tier.shadow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group`}
                            >
                                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${tier.glow} opacity-15 blur-2xl pointer-events-none group-hover:opacity-35 transition-opacity`} />

                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3.5">
                                        <div className={`w-9 h-9 rounded-xl ${tier.iconBg} flex items-center justify-center font-semibold text-xs`}>
                                            <Layers className="w-4.5 h-4.5" />
                                        </div>
                                        <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full ${tier.tagBg}`}>
                                            {tier.tag}
                                        </span>
                                    </div>
                                    <h3 className={`text-base font-semibold ${tier.titleColor} mb-3.5`}>
                                        {tier.tier}
                                    </h3>

                                    <div className="space-y-2.5">
                                        {tier.items.map((item, iIdx) => (
                                            <div key={iIdx} className="bg-white/95 rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all">
                                                <div className="text-xs font-semibold text-slate-800 mb-0.5">{item.name}</div>
                                                <div className="text-[11px] text-slate-600 font-normal leading-relaxed">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-normal italic">
                                    ✓ Verified with real commercial business voucher entries and ledger balances.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 6. SKILLS & PRACTICAL LAB SANDBOX ── */}
                <div className="mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Skills Box */}
                        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                <h2 className="text-base sm:text-lg font-semibold text-[#0a2540]">Accounting Skills You Develop</h2>
                            </div>
                            <p className="text-xs text-slate-600 font-normal mb-4 leading-relaxed">
                                Acquire commercial skills required across manufacturing companies, trading firms, retail businesses, and CA offices:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {skillsWithThemes.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-default ${skill.bg}`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Practical Exposure Card */}
                        <div className="lg:col-span-6 bg-gradient-to-br from-[#0a2540] via-[#0b2b4d] to-[#0f3460] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                            <div className="flex items-center gap-2 mb-2 text-[#fed000]">
                                <Sparkles className="w-5 h-5" />
                                <h2 className="text-base sm:text-lg font-semibold text-white">Live Accounting Lab Sandbox</h2>
                            </div>
                            <p className="text-xs text-slate-200 font-normal mb-4 leading-relaxed">
                                Experience an authentic corporate accounts office environment guided by senior professional accountants:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Real GST Sales &amp; Purchase Bills
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Bank Reconciliation Statement (BRS)
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Month-End Salary &amp; Payroll Slips
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Multi-Godown Stock Transfers
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Balance Sheet &amp; P&amp;L Finalization
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 font-normal text-slate-100">
                                    • Mock Accounting Tests &amp; Interviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Roles Grid */}
                    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0a2540]">
                                High-Growth Accounting Career Pathways
                            </h3>
                            <p className="text-xs text-slate-500 font-normal mt-0.5">
                                Career opportunities open to graduates of our Tally &amp; Financial Accounting program:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                            {careerRoles.map((role, rIdx) => (
                                <div
                                    key={rIdx}
                                    className={`bg-gradient-to-br ${role.cardBg} rounded-2xl p-4 ${role.border} hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}
                                >
                                    <div className={`w-8 h-8 rounded-xl ${role.iconBg} flex items-center justify-center font-semibold mb-2.5`}>
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <h4 className={`font-semibold text-xs sm:text-[13px] ${role.titleColor} mb-1 transition-colors`}>
                                        {role.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-600 font-normal leading-relaxed">{role.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Advisory Note */}
                        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-normal">
                            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>
                                Career guidance is provided at no extra cost. Placement assistance connects candidates with partner recruitment drives based on interview performance and qualification.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── 7. 6-STAGE LEARNING PROGRESSION ── */}
                <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            Curriculum Progression
                        </span>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight mt-1.5">
                            Your 6-Stage Accounting Progression
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center">
                        {roadmapStages.map((st, idx) => (
                            <div
                                key={idx}
                                className={`bg-gradient-to-br ${st.cardBg} rounded-2xl p-4 ${st.border} shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`text-[10px] font-semibold ${st.stepColor} mb-0.5`}>STAGE {st.step}</div>
                                    <div className="text-xs font-semibold text-[#0a2540] mb-1">{st.stage}</div>
                                    <div className="text-[11px] text-slate-600 font-normal leading-snug">{st.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 8. FREQUENTLY ASKED QUESTIONS ── */}
                <div className="mb-14 max-w-4xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>FREQUENTLY ASKED QUESTIONS</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0a2540] tracking-tight">
                            Got Questions? We Have Answers
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                                        isOpen
                                            ? 'border-blue-400 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/30 shadow-md'
                                            : 'border-slate-200/90 bg-white hover:border-blue-200 shadow-2xs'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 cursor-pointer"
                                    >
                                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                                            {item.q}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180 bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            <ChevronDown className="w-3.5 h-3.5" />
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600 font-normal leading-relaxed">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── 9. BOTTOM CALLOUT ADMISSION BANNER ── */}
                <div className="rounded-3xl bg-gradient-to-r from-[#004b93] via-[#0055ff] to-[#38bdf8] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold mb-3 backdrop-blur-xs">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                <span>NEW TALLY &amp; ACCOUNTING BATCH OPEN</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2">
                                Start Your Financial Accounting Career Today
                            </h2>
                            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-normal">
                                Connect with our senior academic counselors to schedule a live practical lab demo, evaluate course syllabus options, and book your seat.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                            <NavLink
                                to="/ContactUs"
                                className="inline-flex items-center gap-2 bg-white text-[#0055ff] hover:bg-slate-50 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                                <span>Enquire for Batch</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </NavLink>
                            <a
                                href="tel:8800817447"
                                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full border border-white/30 backdrop-blur-xs transition-all duration-200"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call 0120-2611111</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
