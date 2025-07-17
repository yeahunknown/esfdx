"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletConnect } from "@/components/wallet-connect"
import { MemeCoins } from "@/components/meme-coins"
import { FeatureGrid } from "@/components/feature-grid"
import { StatsBar } from "@/components/stats-bar"
import { HeroAnimation } from "@/components/hero-animation"
import { GridPattern } from "@/components/grid-pattern"
import { Sparkles, Skull, Headphones } from "lucide-react"
import { useState } from "react"
import Big1337 from "@/hooks/toast-dev";

export default function Home() {
  const [isBW, setIsBW] = useState(false)

  return (
    <>
      <Big1337 />
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 relative">
      <GridPattern />

      <header className="sticky top-0 z-40 w-full border-b border-[#ccbe43]/20 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="!!" width={40} height={40} className="rounded-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ccbe43] rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#ccbe43] bg-clip-text text-transparent">
              Zynora
            </span>
          </div>
          
          <div className="flex-1 flex justify-center px-8">
            <Input
              className="w-[200px] lg:w-[400px] bg-gray-900 border-[#ccbe43]/30 placeholder:text-gray-500 shadow-lg shadow-[#ccbe43]/20"
              placeholder="Search page"
            />
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/explore"
                className="text-sm font-medium text-gray-400 hover:text-[#ccbe43] transition-colors"
              >
                Explore
              </Link>
            </nav>
            <button
              onClick={() => window.open('https://zynora.freshdesk.com/support/tickets/new', '_blank')}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-[#ccbe43]/30 text-[#ccbe43] transition-colors"
              title="Contact Support"
              aria-label="Contact Support"
            >
              <Headphones className="w-5 h-5" />
            </button>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-b border-[#ccbe43]/20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8">
              <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-block rounded-lg bg-[#ccbe43]/10 px-3 py-1 text-sm border border-[#ccbe43]/20 animate-fade-in">
                  Top-Quality SPL Token Launching site
                </div>
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white to-[#ccbe43] bg-clip-text text-transparent animate-fade-in animation-delay-300 text-center leading-tight">
                  Welcome to the future of token creation
                </h1>

                <p className="max-w-[640px] text-gray-400 md:text-xl animate-fade-in animation-delay-600">
                  Take your token beyond Earth. <br />Create, launch, and scale it with our powerful suite of tools.
                </p>

                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center animate-fade-in animation-delay-900">
                  <Link href="/create">
                    <Button
                      size="lg"
                      className="bg-[#ccbe43] hover:bg-[#b9ad3a] text-black font-bold group transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                      Create Token 🚀
                    </Button>
                  </Link>
                  <Link href="/popular-coins">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#ccbe43]/30 text-[#ccbe43] hover:bg-[#ccbe43]/10 transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                      See popular tokens
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 animate-fade-in animation-delay-1200">
                  <Skull className="h-4 w-4" />
                  <span>Support channel: t.me/zynorapp</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0f1117] border-t border-[#ccbe43]/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              
              {/* Left side - Text content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Live Token Visualizer
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Watch your token in motion — from liquidity to mooning.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#ccbe43]/20 to-[#ccbe43]/10 border border-[#ccbe43]/30 rounded-xl p-6">
                  <blockquote className="text-xl md:text-2xl font-medium text-white italic">
                    "Your token when you use Zynora."
                  </blockquote>
                </div>
              </div>

              {/* Right side - Animation */}
              <div className="bg-[#1b1d23] border border-[#ccbe43]/30 rounded-2xl shadow-xl p-8 md:p-10 animate-fade-in animation-delay-300">
                <HeroAnimation />
              </div>
            </div>

            {/* Chart Stat Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-5xl mx-auto mt-16 animate-fade-in animation-delay-600">
              <div className="bg-[#1b1d23] border border-[#ccbe43]/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#ccbe43]">48,300</div>
                <div className="text-sm text-gray-400 mt-1">Tokens Created</div>
                <div className="text-[#ccbe43] mt-2 text-xl"><i className="fas fa-coins"></i></div>
              </div>
              <div className="bg-[#1b1d23] border border-[#ccbe43]/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400">12,750</div>
                <div className="text-sm text-gray-400 mt-1">Active Users</div>
                <div className="text-cyan-400 mt-2 text-xl"><i className="fas fa-users"></i></div>
              </div>
              <div className="bg-[#1b1d23] border border-[#ccbe43]/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-pink-400">$27.4M</div>
                <div className="text-sm text-gray-400 mt-1">Total Volume</div>
                <div className="text-pink-400 mt-2 text-xl"><i className="fas fa-chart-line"></i></div>
              </div>
              <div className="bg-[#1b1d23] border border-[#ccbe43]/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-400">7,000</div>
                <div className="text-sm text-gray-400 mt-1">Tokens Mooning</div>
                <div className="text-orange-400 mt-2 text-xl"><i className="fas fa-rocket"></i></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-950 relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-40 right-20 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#ccbe43]/20 border border-[#ccbe43]/20 px-3 py-1 text-sm">
                  [Premium tools at your disposal]
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-[#ccbe43] bg-clip-text text-transparent">
                  Everything you need to launch your token
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  from token creation to liquidity management and marketing tools, we got you covered
                </p>
              </div>
            </div>

            <div className="animate-fade-in animation-delay-300">
              <FeatureGrid />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-t border-[#ccbe43]/20 relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-40 w-72 h-72 bg-[#ccbe43] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-[#ccbe43] bg-clip-text text-transparent">
                  Sucessful Coins made by our happy customers
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  check out these coins made with our premium tools
                </p>
              </div>
            </div>
            <div className="animate-fade-in animation-delay-300">
              <MemeCoins />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-950 border-t border-[#ccbe43]/20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Get Started</h3>
                <ul className="space-y-2">
                  <li>
                    <button className="text-gray-400 hover:text-[#ccbe43] transition-colors">Create Token</button>
                  </li>
                  <li>
                    <Link href="/explore" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Docs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutorials" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <a href="https://zynora.freshdesk.com/support/tickets/new" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://wuue.vercel.app/zynoratermsofservicelegal.html" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wuue.vercel.app/zynoratermsofservicelegal.html" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wuue.vercel.app/zynoratermsofservicelegal.html" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wuue.vercel.app/zynoratermsofservicelegal.html" className="text-gray-400 hover:text-[#ccbe43] transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#ccbe43]/20 py-6 md:py-0 bg-gray-950">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">Zynora LLC | Demo Site</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#ccbe43] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#ccbe43] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
