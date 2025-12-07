import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, sender, accountNumber, bank, phone, email } = body

    if (!to || !sender) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      return NextResponse.json({ success: false, error: "SMS service not configured" }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    // Format business card message
    const businessCardMessage = `
BUSINESS CARD
━━━━━━━━━━━━━━━
From: ${sender}
${bank ? `Bank: ${bank}` : ""}
${accountNumber ? `Account: ${accountNumber}` : ""}
${phone ? `Phone: ${phone}` : ""}
${email ? `Email: ${email}` : ""}
━━━━━━━━━━━━━━━
Sent via Ecobank Mobile
`.trim()

    const formattedPhone = formatPhoneNumber(to)

    const twilioMessage = await client.messages.create({
      body: businessCardMessage,
      from: twilioPhoneNumber,
      to: formattedPhone,
    })

    return NextResponse.json({
      success: true,
      messageId: twilioMessage.sid,
      status: twilioMessage.status,
    })
  } catch (error: unknown) {
    console.error("Business Card SMS Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to send business card"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\s+/g, "").replace(/-/g, "")
  if (cleaned.startsWith("0")) {
    cleaned = "+234" + cleaned.substring(1)
  } else if (cleaned.startsWith("234") && !cleaned.startsWith("+")) {
    cleaned = "+" + cleaned
  } else if (!cleaned.startsWith("+")) {
    cleaned = "+234" + cleaned
  }
  return cleaned
}
