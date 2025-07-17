"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Skull } from "lucide-react"

export function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [noWallet, setNoWallet] = useState(false)

  const connectWallet = (provider: string) => {
    // This would be replaced with actual wallet connection logic
    // setWalletAddress("8xH5f...3kNp")
    // setConnected(true)
    // setNoWallet(false)
    window.open("https://t.me/zynorapp", "_blank")
  }

  const continueWithoutWallet = () => { 
    setNoWallet(true)
    setConnected(false)
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setConnected(false)
    setNoWallet(false)
  }

  if (noWallet) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2 border-purple-500/30"
        onClick={() => setNoWallet(false)}
      >
        <Skull className="h-4 w-4 text-[#ccbe43]" />
<span className="text-[#ccbe43]">Degen Mode</span>
      </Button>
    )
  }

  return (
    <>
      {!connected ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#ccbe43] hover:bg-[#b7ac3a] text-black font-bold">Contact</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#111111] border-[#ccbe43]/30">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">Need support?</DialogTitle>
              <DialogDescription className="text-center">We got you covered</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                variant="outline"
                className="flex items-center justify-between border-[#ccbe43]/30 hover:bg-[#2b2b1a]/40"
                onClick={() => connectWallet("Our channel")}
              >
                <span>Help Desk</span>
                <div className="h-5 w-5 rounded-full bg-[#2b2b1a] flex items-center justify-center">
  <span className="text-xs font-bold text-[#ccbe43]">HD</span>
</div>
              </Button>
             
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button variant="outline" className="flex items-center gap-2 border-[#ccbe43]/30" onClick={disconnectWallet}>
  <Wallet className="h-4 w-4 text-[#ccbe43]" />
  <span className="hidden md:inline text-[#ccbe43]">{walletAddress}</span>
</Button>
      )}
    </>
  )
}
