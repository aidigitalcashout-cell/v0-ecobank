"use client"

import { generateDebitAlert, generateCreditAlert } from "./alert-templates"
import { sendTransactionAlert } from "./sms-client"
import { StorageManager } from "./storage-manager"

export interface Transaction {
  id: string
  type: string
  amount: number
  recipient?: string
  sender?: string
  date: string
  time: string
  status: "Successful" | "Pending" | "Failed"
  reference: string
  description: string
  isDebit: boolean
  section: string
  recipientBank?: string
  senderBank?: string
  recipientAccount?: string
  senderAccount?: string
  fee?: number
}

export interface Beneficiary {
  id: string
  name: string
  accountNumber: string
  bank: string
  phone?: string
}

export interface UserData {
  name: string
  accountNumber: string
  phone: string
  balance: number
  email: string
  address: string
  bvn: string
  profilePicture?: string
  status: "Active" | "Inactive"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "info" | "warning" | "error"
  timestamp: string
  read: boolean
}

export interface LoanApplication {
  id: string
  type: string
  amount: number
  term: number
  purpose: string
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected"
  applicationDate: string
  monthlyPayment: number
  interestRate: number
  totalRepayment: number
}

export interface AppSettings {
  theme: string
  notifications: boolean
  smsAlerts: boolean
  biometricLogin: boolean
  language: string
}

interface AppState {
  userData: UserData
  transactions: Transaction[]
  beneficiaries: Beneficiary[]
  notifications: Notification[]
  loanApplications: LoanApplication[]
  settings: AppSettings
}

class DataStore {
  private static instance: DataStore
  private state: AppState
  private listeners: Set<() => void> = new Set()
  private readonly STORAGE_KEY = "ecobank_app_data"

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  private constructor() {
    this.state = this.loadFromStorage()
    this.initializeDefaultData()

    // Auto-save every 5 seconds
    setInterval(() => this.saveToStorage(), 5000)

    // Save on page unload
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => this.saveToStorage())
    }
  }

  private getDefaultState(): AppState {
    return {
      userData: {
        name: "ADEFEMI JOHN OLAYEMI",
        accountNumber: "0099348976",
        phone: "+234 801 234 5678",
        balance: 150000.2,
        email: "john.olayemi@email.com",
        address: "123 Lagos Street, Victoria Island, Lagos",
        bvn: "22123456789",
        status: "Active",
        profilePicture: undefined,
      },
      transactions: [
        {
          id: "1",
          type: "Transfer to other bank",
          amount: 20000,
          recipient: "Pedro Banabas",
          date: "2023-05-19",
          time: "10:15AM",
          status: "Successful",
          reference: "TXN123456789",
          description: "Transfer to First Bank",
          isDebit: true,
          section: "Today",
          recipientBank: "First Bank",
          recipientAccount: "0348483930",
          senderAccount: "0099348976",
          fee: 30,
        },
        {
          id: "2",
          type: "Bank Deposit",
          amount: 50000,
          sender: "John Smith",
          date: "2023-05-19",
          time: "09:30AM",
          status: "Successful",
          reference: "TXN123456788",
          description: "Cash deposit",
          isDebit: false,
          section: "Today",
          senderBank: "Ecobank",
          senderAccount: "0099348977",
        },
      ],
      beneficiaries: [
        {
          id: "1",
          name: "Pedro Banabas",
          accountNumber: "0348483930",
          bank: "First Bank",
          phone: "+234 803 123 4567",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          accountNumber: "0123456789",
          bank: "GTBank",
          phone: "+234 801 987 6543",
        },
      ],
      notifications: [],
      loanApplications: [],
      settings: {
        theme: "default",
        notifications: true,
        smsAlerts: true,
        biometricLogin: false,
        language: "en",
      },
    }
  }

  private loadFromStorage(): AppState {
    return StorageManager.load(this.STORAGE_KEY, this.getDefaultState())
  }

  private saveToStorage(): void {
    StorageManager.save(this.STORAGE_KEY, this.state)
  }

  private initializeDefaultData(): void {
    // Only initialize if no data exists
    if (this.state.transactions.length === 0) {
      const defaultState = this.getDefaultState()
      this.state.transactions = defaultState.transactions
      this.state.beneficiaries = defaultState.beneficiaries
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
    this.saveToStorage() // Auto-save on every change
  }

  // User data methods
  getUserData(): UserData {
    return { ...this.state.userData }
  }

  updateUserData(updates: Partial<UserData>): void {
    this.state.userData = { ...this.state.userData, ...updates }
    this.notify()
  }

  updateBalance(newBalance: number): void {
    this.state.userData.balance = newBalance
    this.notify()
  }

  updateProfilePicture(pictureUrl: string): void {
    this.state.userData.profilePicture = pictureUrl
    this.notify()
  }

  // Transaction methods
  getTransactions(): Transaction[] {
    return [...this.state.transactions].sort(
      (a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime(),
    )
  }

  getTransaction(id: string): Transaction | undefined {
    return this.state.transactions.find((t) => t.id === id)
  }

  async addTransaction(transaction: Omit<Transaction, "id" | "reference">): Promise<string> {
    const id = Date.now().toString()
    const reference = `TXN${id}`

    const newTransaction: Transaction = {
      ...transaction,
      id,
      reference,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    this.state.transactions.unshift(newTransaction)

    // Update balance
    if (newTransaction.isDebit) {
      this.state.userData.balance -= newTransaction.amount + (newTransaction.fee || 0)
    } else {
      this.state.userData.balance += newTransaction.amount
    }

    // Send SMS notifications if enabled
    if (this.state.settings.smsAlerts) {
      if (newTransaction.isDebit && newTransaction.recipient) {
        const debitMessage = generateDebitAlert(
          newTransaction.amount,
          newTransaction.recipient,
          this.state.userData.balance,
          reference,
        )

        await sendTransactionAlert({
          to: this.state.userData.phone,
          message: debitMessage,
          type: "debit",
        })

        // Send credit alert to recipient if phone available
        const beneficiary = this.state.beneficiaries.find((b) => b.name === newTransaction.recipient)
        if (beneficiary?.phone) {
          const creditMessage = generateCreditAlert(
            newTransaction.amount,
            this.state.userData.name,
            0, // We don't know recipient's balance
            reference,
          )

          await sendTransactionAlert({
            to: beneficiary.phone,
            message: creditMessage,
            type: "credit",
          })
        }
      }
    }

    // Add in-app notification
    this.addNotification({
      title: newTransaction.isDebit ? "Money Sent" : "Money Received",
      message: `₦${newTransaction.amount.toLocaleString()} ${newTransaction.isDebit ? "sent to" : "received from"} ${newTransaction.recipient || newTransaction.sender}`,
      type: "success",
    })

    this.notify()
    return id
  }

  // Beneficiary methods
  getBeneficiaries(): Beneficiary[] {
    return [...this.state.beneficiaries]
  }

  findBeneficiaryByAccount(accountNumber: string): Beneficiary | undefined {
    return this.state.beneficiaries.find((b) => b.accountNumber === accountNumber)
  }

  addBeneficiary(beneficiary: Omit<Beneficiary, "id">): string {
    const id = Date.now().toString()
    this.state.beneficiaries.push({ ...beneficiary, id })
    this.notify()
    return id
  }

  // Notification methods
  getNotifications(): Notification[] {
    return [...this.state.notifications].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
  }

  addNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): void {
    const id = Date.now().toString()
    this.state.notifications.unshift({
      ...notification,
      id,
      timestamp: new Date().toISOString(),
      read: false,
    })
    this.notify()
  }

  markNotificationAsRead(id: string): void {
    const notification = this.state.notifications.find((n) => n.id === id)
    if (notification) {
      notification.read = true
      this.notify()
    }
  }

  getUnreadNotificationCount(): number {
    return this.state.notifications.filter((n) => !n.read).length
  }

  // Loan application methods
  getLoanApplications(): LoanApplication[] {
    return [...this.state.loanApplications]
  }

  addLoanApplication(application: Omit<LoanApplication, "id" | "applicationDate">): string {
    const id = Date.now().toString()
    const newApplication: LoanApplication = {
      ...application,
      id,
      applicationDate: new Date().toISOString(),
    }

    this.state.loanApplications.push(newApplication)

    this.addNotification({
      title: "Loan Application Submitted",
      message: `Your ${application.type} application for ₦${application.amount.toLocaleString()} has been submitted`,
      type: "info",
    })

    this.notify()
    return id
  }

  updateLoanApplicationStatus(id: string, status: LoanApplication["status"]): void {
    const application = this.state.loanApplications.find((app) => app.id === id)
    if (application) {
      application.status = status
      this.addNotification({
        title: "Loan Application Update",
        message: `Your loan application status has been updated to: ${status}`,
        type: status === "Approved" ? "success" : status === "Rejected" ? "error" : "info",
      })
      this.notify()
    }
  }

  // Settings methods
  getSettings(): AppSettings {
    return { ...this.state.settings }
  }

  updateSettings(updates: Partial<AppSettings>): void {
    this.state.settings = { ...this.state.settings, ...updates }
    this.notify()
  }

  // Utility methods
  clearAllData(): void {
    StorageManager.clear()
    this.state = this.getDefaultState()
    this.notify()
  }

  exportData(): string {
    return JSON.stringify(this.state, null, 2)
  }

  importData(jsonData: string): boolean {
    try {
      const importedState = JSON.parse(jsonData) as AppState
      this.state = importedState
      this.notify()
      return true
    } catch (error) {
      console.error("Failed to import data:", error)
      return false
    }
  }

  // New account registration method
  registerNewAccount(accountData: {
    name: string
    accountNumber: string
    email: string
    phone: string
    pin: string
  }): void {
    this.state.userData = {
      name: accountData.name,
      accountNumber: accountData.accountNumber,
      phone: accountData.phone,
      balance: 0,
      email: accountData.email,
      address: "",
      bvn: "",
      status: "Active",
      profilePicture: undefined,
    }
    // PIN is handled by the login screen, not stored here for security
    this.state.transactions = []
    this.state.beneficiaries = []
    this.notify()
  }

  // Method to check if account exists
  hasExistingAccount(): boolean {
    return this.state.userData.accountNumber !== ""
  }
}

export const dataStore = DataStore.getInstance()
