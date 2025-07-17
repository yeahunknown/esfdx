"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletConnect } from "@/components/wallet-connect"
import { GridPattern } from "@/components/grid-pattern"
import { Sparkles, Skull, Moon, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TokenCreatorModal } from "@/components/token-creator-modal"
import { useRouter } from "next/navigation"
import { SolanaIcon } from "@/components/SolanaIcon"

interface Coin {
  name: string
  symbol: string
  description?: string
  marketCap: number
  link: string
  image: string
}

const staticCoins: Coin[] = [
  {
    name: "It's just a dip",
    symbol: "Dip",
    marketCap: 28420,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/QmW2JAW9rACj1oRYDP3aAGahE4KPAadQ69KTJvdQD4NUgc",
  },
  {
    name: "LOBSTER AND STEAK",
    symbol: "LOBSTEAK",
    marketCap: 35300,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/bafybeid3ss6i5vglsje3w77r5g7ejavxt724y2sfnpya6rgcvdynpijh3m",
  },
  {
    name: "Water",
    symbol: "Water",
    marketCap: 36650,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/bafybeiggqvteo7fyjdrqf2ojbttssz6xa2opiuxd3k7nioxqswku3aj7le",
  },
  {
    name: "the Great AI Sloppening",
    symbol: "SLOPPENING",
    marketCap: 25800,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/QmeQDsQKT8QEB4uftDFFhh5xPBTCvYx3cfH2SrfRwtwYG7",
  },
  {
    name: "50000 PUFFS LIVE",
    symbol: "50K PUFFS",
    marketCap: 32130,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/bafybeiavhsesycthjyocdd7oecc45rhd6nlqfz5ziod3v6v67vfe5gvayu",
  },
  {
    name: "₽etro Coin",
    symbol: "Petro",
    marketCap: 25030,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/bafkreifppn7ozuph3q2ikfu6pf5xbloj4nnts2ivtqm3nrhbnxr7gbl54a",
  },
  {
    name: "Another One",
    symbol: "Another",
    marketCap: 32980,
    link: "https://pump.fun/",
    image: "https://pump.mypinata.cloud/ipfs/bafybeialozhnmqh3kj42ytu57dahy3aefd6p6cwku6ktflj6iv3tgywxau",
  },
]

const solanaColors = [
  "#A259FF", // purple
  "#00FFD0", // teal
  "#FF8C42", // orange
  "#B6FF5B", // lime
  "#FF4FCE", // magenta
  "#4F8CFF", // blue
  "#FFD600", // gold
  "#FF5C5C", // red
  "linear-gradient(90deg, #43E6FC 0%, #A259FF 100%)", // cyan to purple gradient
  "linear-gradient(90deg, #FF6B9A 0%, #FFD600 100%)", // pink to yellow gradient
]

export default function PopularCoinsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalToken, setModalToken] = useState<Partial<Coin> | null>(null)
  const [isBW, setIsBW] = useState(false)
  const router = useRouter()

  const handleCreateClick = (coin: Coin) => {
    setModalToken(coin)
    setModalOpen(true)
  }

  const handleCreateSuccess = () => {
    setModalOpen(false)
    router.push("/create")
  }

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
  <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white relative">
    <GridPattern />
    {/* Top Bar */}
    <header className="sticky top-0 z-40 w-full border-b border-[#ccbe43]/20 bg-[#0a0a0a]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="!!" width={40} height={40} className="rounded-lg" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ccbe43] rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#ccbe43] to-[#ccbe43] bg-clip-text text-transparent">
            Zynora
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Input
            className="hidden md:flex w-[200px] lg:w-[300px] bg-[#1a1a1a] border-[#ccbe43]/30 placeholder:text-gray-500"
            placeholder="Search page"
          />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm font-medium text-gray-400 hover:text-[#ccbe43] transition-colors">
              Tools
            </Link>
            <Link href="/explore" className="text-sm font-medium text-gray-400 hover:text-[#ccbe43] transition-colors">
              Explore
            </Link>
          </nav>
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-colors"
            title={isBW ? "Switch to normal theme" : "Switch to black & white"}
            aria-label="Toggle black & white theme"
          >
            {isBW ? <Star className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <WalletConnect />
        </div>
      </div>
    </header>

    {/* Background Blobs */}
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <main className="flex-1">
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] border-b border-[#ccbe43]/20 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="inline-block rounded-lg bg-[#ccbe43]/10 px-3 py-1 text-sm border border-[#ccbe43]/20 animate-fade-in">
              🚀 Trending Pump.fun Tokens
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-br from-white to-[#ccbe43] bg-clip-text text-transparent animate-fade-in animation-delay-300">
              Discover & Copy the Hottest Coins
            </h1>
            <p className="max-w-[600px] text-gray-400 md:text-xl animate-fade-in animation-delay-600">
              Instantly clone trending tokens and launch your own with one click.
            </p>
          </div>
          <div className="flex flex-col gap-8 items-center w-full max-w-2xl mx-auto">
            {staticCoins.map((coin, idx) => (
              <Card key={idx} className="overflow-hidden bg-[#1a1a1a] border-[#ccbe43]/20 hover:border-[#ccbe43]/40 transition-all w-full">
                <CardContent className="p-0">
                  <div className="p-4 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#ccbe43]/20 bg-[#111] flex items-center justify-center">
                      <Image src={coin.image} alt={coin.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <a href={coin.link} target="_blank" rel="noopener noreferrer" className="font-bold text-white truncate hover:underline">
                            {coin.name}
                          </a>
                          <span className="text-xs text-[#ccbe43] truncate">${coin.symbol}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#ccbe43]/30 text-[#ccbe43] hover:bg-[#ccbe43]/10 ml-2"
                          onClick={() => handleCreateClick(coin)}
                        >
                          Create Token
                        </Button>
                      </div>
                      {coin.description && (
                        <div className="text-xs text-gray-400 mt-1 truncate">{coin.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between text-sm text-gray-500 border-t border-[#ccbe43]/20">
                    <span>Market Cap:</span>
                    <span>${coin.marketCap.toLocaleString()} </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {modalOpen && modalToken && (
            <TokenCreatorModal
              open={modalOpen}
              onOpenChange={setModalOpen}
              defaultValues={{
                name: modalToken.name,
                symbol: modalToken.symbol,
              }}
              onSuccess={handleCreateSuccess}
            />
          )}
        </div>
      </section>
    </main>
  </div>
)

} 