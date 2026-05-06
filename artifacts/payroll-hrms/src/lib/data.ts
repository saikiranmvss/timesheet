export const EMPLOYEES = [
  { id: 1, name: "Sarah Chen", initials: "SC", number: "EMP001", email: "sarah.chen@company.com", designation: "Software Engineer", department: "Engineering", payType: "Hourly", hourlyRate: 45, monthlySalary: null, payFrequency: "Fortnightly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 2, name: "Marcus Johnson", initials: "MJ", number: "EMP002", email: "marcus.j@company.com", designation: "Senior Designer", department: "Design", payType: "Hourly", hourlyRate: 52, monthlySalary: null, payFrequency: "Fortnightly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 3, name: "Priya Patel", initials: "PP", number: "EMP003", email: "priya.patel@company.com", designation: "Project Manager", department: "PMO", payType: "Salary", hourlyRate: null, monthlySalary: 7083, payFrequency: "Monthly", overtimeThreshold: 45, currency: "USD", status: "Active" },
  { id: 4, name: "Tom Williams", initials: "TW", number: "EMP004", email: "tom.w@company.com", designation: "Full Stack Developer", department: "Engineering", payType: "Hourly", hourlyRate: 55, monthlySalary: null, payFrequency: "Weekly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 5, name: "Lisa Rodriguez", initials: "LR", number: "EMP005", email: "lisa.r@company.com", designation: "HR Manager", department: "Human Resources", payType: "Salary", hourlyRate: null, monthlySalary: 5833, payFrequency: "Monthly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 6, name: "David Kim", initials: "DK", number: "EMP006", email: "david.kim@company.com", designation: "Data Analyst", department: "Analytics", payType: "Hourly", hourlyRate: 42, monthlySalary: null, payFrequency: "Fortnightly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 7, name: "Emma Davis", initials: "ED", number: "EMP007", email: "emma.d@company.com", designation: "Marketing Specialist", department: "Marketing", payType: "Salary", hourlyRate: null, monthlySalary: 5417, payFrequency: "Monthly", overtimeThreshold: 40, currency: "USD", status: "On Leave" },
  { id: 8, name: "James Wilson", initials: "JW", number: "EMP008", email: "james.w@company.com", designation: "DevOps Engineer", department: "Infrastructure", payType: "Hourly", hourlyRate: 60, monthlySalary: null, payFrequency: "Fortnightly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 9, name: "Rachel Torres", initials: "RT", number: "EMP009", email: "rachel.t@company.com", designation: "QA Engineer", department: "Engineering", payType: "Hourly", hourlyRate: 38, monthlySalary: null, payFrequency: "Fortnightly", overtimeThreshold: 40, currency: "USD", status: "Active" },
  { id: 10, name: "Alex Nguyen", initials: "AN", number: "EMP010", email: "alex.n@company.com", designation: "Product Designer", department: "Design", payType: "Salary", hourlyRate: null, monthlySalary: 6250, payFrequency: "Monthly", overtimeThreshold: 40, currency: "USD", status: "Inactive" },
];

export const PROJECTS = [
  { id: 1, name: "Project Alpha", number: "P001", description: "Core platform rebuild", status: "Active", workPacks: ["WP-001 Frontend", "WP-002 Backend", "WP-003 Testing"] },
  { id: 2, name: "Project Beta", number: "P002", description: "Mobile application launch", status: "Active", workPacks: ["WP-004 UI Design", "WP-005 iOS Dev", "WP-006 Android Dev"] },
  { id: 3, name: "Infrastructure Upgrade", number: "P003", description: "Cloud migration initiative", status: "In Progress", workPacks: ["WP-007 Kubernetes", "WP-008 CI/CD Pipeline"] },
  { id: 4, name: "Marketing Campaign Q2", number: "P004", description: "Q2 digital marketing push", status: "Completed", workPacks: ["WP-009 Content", "WP-010 Analytics"] },
  { id: 5, name: "Data Warehouse Migration", number: "P005", description: "Legacy DB to Snowflake", status: "Active", workPacks: ["WP-011 ETL Design", "WP-012 Validation"] },
];

export const TIMESHEETS = [
  { id: 1, date: "2026-05-06", project: "Project Alpha", workPack: "WP-001 Frontend", location: "Office", shiftType: "Regular", description: "Component development and code review", hours: 7.5, status: "Submitted" },
  { id: 2, date: "2026-05-06", project: "Project Beta", workPack: "WP-004 UI Design", location: "Remote", shiftType: "Regular", description: "Design system updates", hours: 1.5, status: "Submitted" },
  { id: 3, date: "2026-05-05", project: "Project Alpha", workPack: "WP-002 Backend", location: "Office", shiftType: "Regular", description: "API endpoint implementation", hours: 8, status: "Approved" },
  { id: 4, date: "2026-05-05", project: "Infrastructure Upgrade", workPack: "WP-007 Kubernetes", location: "Remote", shiftType: "Overtime", description: "Cluster configuration", hours: 2, status: "Approved" },
  { id: 5, date: "2026-05-02", project: "Project Alpha", workPack: "WP-003 Testing", location: "Office", shiftType: "Regular", description: "Unit tests and integration tests", hours: 8, status: "Approved" },
  { id: 6, date: "2026-05-01", project: "Project Beta", workPack: "WP-005 iOS Dev", location: "Office", shiftType: "Regular", description: "Push notifications integration", hours: 7, status: "Rejected" },
  { id: 7, date: "2026-04-30", project: "Project Alpha", workPack: "WP-001 Frontend", location: "Remote", shiftType: "Regular", description: "Dashboard components", hours: 8, status: "Approved" },
];

export const PAYROLL_HISTORY = [
  { id: 1, period: "Apr 16–30, 2026", gross: 3375, tax: 675, net: 2700, hours: 75, overtime: 5, status: "Paid", date: "2026-05-01" },
  { id: 2, period: "Apr 1–15, 2026", gross: 3150, tax: 630, net: 2520, hours: 70, overtime: 0, status: "Paid", date: "2026-04-16" },
  { id: 3, period: "Mar 16–31, 2026", gross: 3600, tax: 720, net: 2880, hours: 80, overtime: 8, status: "Paid", date: "2026-04-01" },
  { id: 4, period: "Mar 1–15, 2026", gross: 3150, tax: 630, net: 2520, hours: 70, overtime: 0, status: "Paid", date: "2026-03-16" },
  { id: 5, period: "Feb 16–29, 2026", gross: 3375, tax: 675, net: 2700, hours: 75, overtime: 5, status: "Paid", date: "2026-03-01" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Timesheet Approved", message: "Your timesheet for Apr 16–30 has been approved by Priya Patel.", time: "10 minutes ago", date: "Today", type: "success", read: false },
  { id: 2, title: "Payroll Processed", message: "Payroll for the period Apr 16–30 has been processed. Your net pay is $2,700.", time: "1 hour ago", date: "Today", type: "info", read: false },
  { id: 3, title: "Approval Required", message: "Marcus Johnson has submitted a timesheet requiring your approval.", time: "3 hours ago", date: "Today", type: "warning", read: false },
  { id: 4, title: "Timesheet Rejected", message: "Your timesheet entry for May 1 was rejected. Reason: Incorrect project code.", time: "Yesterday", date: "Yesterday", type: "error", read: true },
  { id: 5, title: "Unlock Request", message: "Tom Williams has requested to unlock their submitted timesheet.", time: "Yesterday", date: "Yesterday", type: "warning", read: true },
  { id: 6, title: "Timesheet Submitted", message: "Emma Davis has submitted their weekly timesheet for review.", time: "2 days ago", date: "May 4", type: "info", read: true },
  { id: 7, title: "New Team Member", message: "Rachel Torres has joined the Engineering team.", time: "3 days ago", date: "May 3", type: "info", read: true },
];

export const TEAM_MEMBERS = [
  { id: 1, name: "Sarah Chen", role: "Engineer", avatar: "SC", hoursThisWeek: 38.5, overtime: 0, status: "Active", pendingTimesheets: 1 },
  { id: 2, name: "Marcus Johnson", role: "Designer", avatar: "MJ", hoursThisWeek: 42, overtime: 2, status: "Active", pendingTimesheets: 0 },
  { id: 4, name: "Tom Williams", role: "Developer", avatar: "TW", hoursThisWeek: 45, overtime: 5, status: "Active", pendingTimesheets: 2 },
  { id: 9, name: "Rachel Torres", role: "QA Engineer", avatar: "RT", hoursThisWeek: 36, overtime: 0, status: "Active", pendingTimesheets: 0 },
  { id: 6, name: "David Kim", role: "Analyst", avatar: "DK", hoursThisWeek: 40, overtime: 0, status: "Active", pendingTimesheets: 1 },
];

export const APPROVALS = [
  { id: 1, employee: "Sarah Chen", avatar: "SC", period: "Apr 29–May 5, 2026", hours: 38.5, overtime: 0, submittedAt: "May 5, 2026", status: "Pending" },
  { id: 2, employee: "Tom Williams", avatar: "TW", period: "Apr 29–May 5, 2026", hours: 45, overtime: 5, submittedAt: "May 5, 2026", status: "Pending" },
  { id: 3, employee: "David Kim", avatar: "DK", period: "Apr 29–May 5, 2026", hours: 40, overtime: 0, submittedAt: "May 5, 2026", status: "Pending" },
  { id: 4, employee: "Emma Davis", avatar: "ED", period: "Apr 22–28, 2026", hours: 36, overtime: 0, submittedAt: "Apr 28, 2026", status: "Approved" },
  { id: 5, employee: "Marcus Johnson", avatar: "MJ", period: "Apr 22–28, 2026", hours: 42, overtime: 2, submittedAt: "Apr 28, 2026", status: "Approved" },
  { id: 6, employee: "James Wilson", avatar: "JW", period: "Apr 22–28, 2026", hours: 44, overtime: 4, submittedAt: "Apr 28, 2026", status: "Rejected" },
];

export const WEEKLY_HOURS = [
  { day: "Mon", regular: 8, overtime: 0 },
  { day: "Tue", regular: 8, overtime: 0 },
  { day: "Wed", regular: 8, overtime: 1.5 },
  { day: "Thu", regular: 8, overtime: 0 },
  { day: "Fri", regular: 7.5, overtime: 0 },
  { day: "Sat", regular: 0, overtime: 0 },
  { day: "Sun", regular: 0, overtime: 0 },
];

export const MONTHLY_PAYROLL_TREND = [
  { month: "Nov", amount: 24800 },
  { month: "Dec", amount: 23100 },
  { month: "Jan", amount: 26200 },
  { month: "Feb", amount: 25400 },
  { month: "Mar", amount: 27800 },
  { month: "Apr", amount: 26900 },
];

export const PAYROLL_EMPLOYEES = [
  { id: 1, name: "Sarah Chen", avatar: "SC", designation: "Software Engineer", payType: "Hourly", rate: 45, hours: 75, overtime: 5, overtimePay: 337.5, gross: 3712.5, tax: 742.5, deductions: 150, net: 2820, status: "Processing" },
  { id: 2, name: "Marcus Johnson", avatar: "MJ", designation: "Senior Designer", payType: "Hourly", rate: 52, hours: 72, overtime: 2, overtimePay: 156, gross: 3900, tax: 780, deductions: 150, net: 2970, status: "Pending" },
  { id: 3, name: "Priya Patel", avatar: "PP", designation: "Project Manager", payType: "Salary", rate: null, hours: 80, overtime: 0, overtimePay: 0, gross: 7083, tax: 1770, deductions: 200, net: 5113, status: "Paid" },
  { id: 4, name: "Tom Williams", avatar: "TW", designation: "Full Stack Developer", payType: "Hourly", rate: 55, hours: 85, overtime: 5, overtimePay: 412.5, gross: 5087.5, tax: 1017.5, deductions: 150, net: 3920, status: "Processing" },
  { id: 5, name: "Lisa Rodriguez", avatar: "LR", designation: "HR Manager", payType: "Salary", rate: null, hours: 78, overtime: 0, overtimePay: 0, gross: 5833, tax: 1458, deductions: 200, net: 4175, status: "Paid" },
  { id: 6, name: "David Kim", avatar: "DK", designation: "Data Analyst", payType: "Hourly", rate: 42, hours: 70, overtime: 0, overtimePay: 0, gross: 2940, tax: 588, deductions: 100, net: 2252, status: "Pending" },
  { id: 8, name: "James Wilson", avatar: "JW", designation: "DevOps Engineer", payType: "Hourly", rate: 60, hours: 82, overtime: 2, overtimePay: 180, gross: 5100, tax: 1020, deductions: 150, net: 3930, status: "Paid" },
];
