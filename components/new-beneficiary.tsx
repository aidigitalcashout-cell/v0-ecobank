"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ChevronDown, Home } from "lucide-react"

interface NewBeneficiaryProps {
  onBack: () => void
  onContinue: () => void
}

export function NewBeneficiary({ onBack, onContinue }: NewBeneficiaryProps) {
  const [activeTab, setActiveTab] = useState("New Beneficiary")
  const [formData, setFormData] = useState({
    accountNumber: "",
    bank: "",
    amount: "",
    remark: "",
    saveAsBeneficiary: true,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Transfer</h1>
        <Button variant="ghost" size="icon">
          <Home className="h-5 w-5" />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex gap-2">
          {["New Beneficiary", "Saved Beneficiary"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-6 ${
                activeTab === tab ? "bg-[#A4D233] hover:bg-[#8BC220] text-black" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 space-y-6">
        {/* From Account */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">From account</label>
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              <div>
                <div className="text-sm font-medium">Savings account</div>
                <div className="text-xs text-gray-600">ADEFEMI JOHN OLAYEMI</div>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Account Number */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Account Number</label>
          <Input
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            className="bg-white"
          />
        </div>

        {/* Bank */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Bank</label>
          <Select value={formData.bank} onValueChange={(value) => setFormData({ ...formData, bank: value })}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-bank">First Bank</SelectItem>
              <SelectItem value="gtbank">GTBank</SelectItem>
              <SelectItem value="access-bank">Access Bank</SelectItem>
              <SelectItem value="zenith-bank">Zenith Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Amount</label>
          <Input
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="bg-white"
          />
        </div>

        {/* Remark */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Remark (optional)</label>
          <Input
            placeholder="Enter remark"
            value={formData.remark}
            onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
            className="bg-white"
          />
        </div>

        {/* Save as Beneficiary */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="save-beneficiary"
            checked={formData.saveAsBeneficiary}
            onCheckedChange={(checked) => setFormData({ ...formData, saveAsBeneficiary: checked as boolean })}
          />
          <label htmlFor="save-beneficiary" className="text-sm font-medium text-gray-700">
            Save as beneficiary
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button onClick={onContinue} className="w-full bg-[#004A9F] hover:bg-[#003875] text-white py-3 rounded-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
