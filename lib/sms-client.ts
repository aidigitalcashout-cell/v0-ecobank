"use client"

/**
 * Client-side SMS service mock
 */

interface SMSAlert {
  to: string
  message: string
  type: "debit" | "credit" | "balance" | "notification"
}

export async function sendTransactionAlert(alert: SMSAlert): Promise<void> {
  // Mock SMS sending - in production this would call a server endpoint
  console.log(`📱 SMS Alert [${alert.type.toUpperCase()}]:`)
  console.log(`To: ${alert.to}`)
  console.log(`Message: ${alert.message}`)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}
