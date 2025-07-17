import * as React from "react"
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, Check } from "lucide-react"

interface FakePaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount?: number
  onPaymentSuccess?: () => void
}

export function FakePaymentModal({ open, onOpenChange, amount = 0.1, onPaymentSuccess }: FakePaymentModalProps) {
  const [address, setAddress] = React.useState("")
  const [step, setStep] = React.useState<"input" | "sending" | "sent">("input")

  React.useEffect(() => {
    if (open) {
      setAddress("")
      setStep("input")
    }
  }, [open])

  const handleFakeSend = () => {
    setStep("sending")
    setTimeout(() => {
      setStep("sent")
      setTimeout(() => {
        if (onPaymentSuccess) onPaymentSuccess()
        onOpenChange(false)
      }, 1200)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="p-0 gap-0 bg-neutral-950 border border-neutral-800 max-w-md rounded-xl overflow-hidden shadow-lg">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cube className="h-6 w-6 text-white" />
                <span className="text-white font-semibold text-lg tracking-tight">PGPAY</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-white text-black hover:bg-neutral-200 border-none shadow-sm"
              >
                Sign Up
              </Button>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Solana Payment</h2>
              <p className="text-sm text-neutral-400">
                Please enter your wallet address below to proceed with the payment.
              </p>
            </div>

            {step === "input" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">
                    Solana Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-md bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/10"
                    placeholder="Enter your Solana address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full py-3 bg-green-400 text-black font-medium hover:bg-green-300 transition-colors"
                  onClick={handleFakeSend}
                  disabled={!address.trim()}
                >
                  Pay {amount} SOL
                </Button>
              </div>
            )}

            {step === "sending" && (
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-green-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span className="text-white">Processing transaction...</span>
              </div>
            )}

            {step === "sent" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Check className="h-8 w-8 text-green-400 mb-4" />
                <span className="text-white font-semibold">Payment successful</span>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
