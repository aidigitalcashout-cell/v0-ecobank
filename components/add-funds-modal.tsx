"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [amount, setAmount] = useState("")
  const [account, setAccount] = useState("")
  const [currentBalance, setCurrentBalance] = useState(150000.2)

  const handleAddFunds = () => {
    const addAmount = Number.parseFloat(amount)
    if (addAmount > 0) {
      setCurrentBalance((prev) => prev + addAmount)
      setAmount("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Balance */}
          <div className="bg-[#004A9F] text-white p-4 rounded-lg text-center">
            <div className="text-sm opacity-80">Current Balance</div>
            <div className="text-2xl font-bold">₦ {currentBalance.toLocaleString()}</div>
          </div>

          {/* Account Selection */}
          <div className="space-y-2">
            <Label htmlFor="account">Select Account</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Choose account to credit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings Account - 0099348976</SelectItem>
                <SelectItem value="current">Current Account - 0099348977</SelectItem>
                <SelectItem value="domiciliary">Domiciliary Account - 0099348978</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Add</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[1000, 5000, 10000].map((quickAmount) => (
              <Button key={quickAmount} variant="outline" size="sm" onClick={() => setAmount(quickAmount.toString())}>
                ₦{quickAmount.toLocaleString()}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleAddFunds}
              className="flex-1 bg-[#A4D233] hover:bg-[#8BC220] text-black"
              disabled={!amount || !account}
            >
              Add Funds
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
