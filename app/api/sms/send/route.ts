import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Initialize Twilio client with environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, message, type } = body

    if (!to || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields: to, message" }, { status: 400 })
    }

    // Validate Twilio credentials
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error("Twilio credentials not configured")
      return NextResponse.json({ success: false, error: "SMS service not configured" }, { status: 500 })
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken)

    // Format phone number for international format
    const formattedPhone = formatPhoneNumber(to)

    // Send SMS via Twilio
    const twilioMessage = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhone,
    })

    console.log(`SMS sent successfully: ${twilioMessage.sid}`)

    return NextResponse.json({
      success: true,
      messageId: twilioMessage.sid,
      status: twilioMessage.status,
      type: type || "general",
    })
  } catch (error: unknown) {
    console.error("Twilio SMS Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to send SMS"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\s+/g, "").replace(/-/g, "")

  // Convert Nigerian numbers to international format
  if (cleaned.startsWith("0")) {
    cleaned = "+234" + cleaned.substring(1)
  } else if (cleaned.startsWith("234") && !cleaned.startsWith("+")) {
    cleaned = "+" + cleaned
  } else if (!cleaned.startsWith("+")) {
    cleaned = "+234" + cleaned
  }

  return cleaned
}
