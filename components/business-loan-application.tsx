"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  PenTool,
  AlertCircle,
  ArrowLeft,
  Building2,
} from "lucide-react"

export function BusinessLoanApplication() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToAgreement, setAgreedToAgreement] = useState(false)
  const [depositCompleted, setDepositCompleted] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [signature, setSignature] = useState("")

  const loanDetails = {
    loanType: "Business Loan - Startup",
    company: "Wal is Global Ventures",
    purpose: "Paint Production",
    amount: 2500000,
    currency: "₦",
    depositRequired: 50000,
    timeframe: "24 hours",
  }

  const requirements = [
    {
      id: "deposit",
      label: "Initial Deposit",
      amount: loanDetails.depositRequired,
      completed: depositCompleted,
      icon: DollarSign,
    },
    {
      id: "terms",
      label: "Terms & Conditions",
      completed: agreedToTerms,
      icon: FileText,
    },
    {
      id: "agreement",
      label: "Loan Agreement",
      completed: agreedToAgreement,
      icon: FileText,
    },
    {
      id: "signature",
      label: "Digital Signature",
      completed: signature.length > 0,
      icon: PenTool,
    },
  ]

  const canSubmit = depositCompleted && agreedToTerms && agreedToAgreement && signature.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900">Echo Bank</h1>
            <p className="text-xs text-slate-500">Business Loan Application</p>
          </div>
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-8">
        {/* Loan Details Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Business Loan</h2>
            </div>
            <p className="text-white/80 text-sm mb-6 max-w-md leading-relaxed">
              Startup loan for paint production approved for {loanDetails.company}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20">
              <div>
                <p className="text-white/60 text-sm mb-1">Loan Amount</p>
                <p className="text-2xl font-bold">
                  {loanDetails.currency}
                  {loanDetails.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Transfer Timeline</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <p className="text-2xl font-bold">{loanDetails.timeframe}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Action - Deposit Required */}
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-orange-900">Action Required: Deposit</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-orange-800">
              A facilitation deposit is required to proceed with this loan transaction. This deposit will be debited
              from your account within 24 hours of approval.
            </p>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Required Deposit</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {loanDetails.currency}
                    {loanDetails.depositRequired.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="deposit"
                    checked={depositCompleted}
                    onCheckedChange={(checked) => setDepositCompleted(checked as boolean)}
                    className="w-6 h-6 rounded-full"
                  />
                  <label htmlFor="deposit" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Confirm Deposit
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              Completion Requirements
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">Complete all requirements to submit your application</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {requirements.map((requirement) => {
              const Icon = requirement.icon
              return (
                <div
                  key={requirement.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      requirement.completed
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{requirement.label}</p>
                    {requirement.id === "deposit" && (
                      <p className="text-sm text-slate-600 mt-1">
                        {loanDetails.currency}
                        {requirement.amount?.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      requirement.completed
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {requirement.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <p className="mb-3">
                <strong>1. Loan Terms</strong>
              </p>
              <p className="mb-3">
                This business loan is provided subject to the terms outlined herein. The borrower agrees to utilize the
                funds solely for the stated purpose of paint production operations.
              </p>
              <p className="mb-3">
                <strong>2. Interest Rate & Repayment</strong>
              </p>
              <p className="mb-3">
                The loan will accrue interest at the rate specified in the loan agreement. Monthly payments are due on
                the specified dates. Late payments will incur applicable penalties.
              </p>
              <p className="mb-3">
                <strong>3. Collateral & Security</strong>
              </p>
              <p>
                The borrower may be required to pledge collateral as security for this loan. Echo Bank reserves the
                right to enforce security interests if default occurs.
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer flex-1">
                I have read and agree to the <span className="font-semibold">Terms & Conditions</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Loan Agreement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Loan Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <p className="mb-3">
                <strong>LOAN AGREEMENT BETWEEN ECHO BANK AND WAL IS GLOBAL VENTURES</strong>
              </p>
              <p className="mb-3">
                This Loan Agreement ("Agreement") is entered into as of the date of execution between Echo Bank
                ("Lender") and Wal is Global Ventures ("Borrower").
              </p>
              <p className="mb-3">
                <strong>PRINCIPAL TERMS:</strong>
              </p>
              <p className="mb-3">Loan Amount: ₦2,500,000</p>
              <p className="mb-3">Purpose: Paint Production Operations</p>
              <p className="mb-3">
                The borrower acknowledges receipt of the loan funds and agrees to all terms specified herein and in the
                accompanying disclosure documents.
              </p>
              <p>
                Both parties shall be bound by the terms of this agreement, which shall remain in effect until the full
                loan amount is repaid with accrued interest.
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Checkbox
                id="agreement"
                checked={agreedToAgreement}
                onCheckedChange={(checked) => setAgreedToAgreement(checked as boolean)}
              />
              <label htmlFor="agreement" className="text-sm text-slate-700 cursor-pointer flex-1">
                I accept the <span className="font-semibold">Loan Agreement</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Digital Signature */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Digital Signature
            </CardTitle>
            <p className="text-xs text-slate-600 mt-2">Sign electronically to complete your application</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <button
              onClick={() => setShowSignature(!showSignature)}
              className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center text-slate-600 hover:text-blue-600 font-medium"
            >
              {signature ? (
                <div>
                  <p className="text-green-600 font-semibold">✓ Signed by: {signature}</p>
                  <p className="text-xs text-slate-500 mt-1">Click to modify signature</p>
                </div>
              ) : (
                "Click to add your digital signature"
              )}
            </button>

            {showSignature && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Enter your full name as signature</label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your name here"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500">
                  By entering your name, you agree to the authenticity and accuracy of this digital signature.
                </p>
              </div>
            )}

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-xs text-emerald-700">
                <strong>Security Notice:</strong> Your signature is encrypted and securely stored. This digital signature
                has the same legal validity as a handwritten signature.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((requirements.filter((r) => r.completed).length / requirements.length) * 100) | 0
                  }%`,
                }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {requirements.filter((r) => r.completed).length}/{requirements.length}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {requirements.filter((r) => r.completed).length === requirements.length
              ? "All requirements completed. Ready to submit!"
              : `${requirements.length - requirements.filter((r) => r.completed).length} requirement(s) remaining`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-12 text-slate-700 border-slate-300 hover:bg-slate-50"
          >
            Save as Draft
          </Button>
          <Button
            disabled={!canSubmit}
            className={`h-12 font-semibold transition-all ${
              canSubmit
                ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {canSubmit ? "Submit Application" : "Complete Requirements"}
          </Button>
        </div>

        {/* Final Confirmation */}
        {canSubmit && (
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Ready for Submission</h3>
            <p className="text-sm text-emerald-800">
              All requirements have been completed. Click "Submit Application" to proceed with your business loan
              application.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
