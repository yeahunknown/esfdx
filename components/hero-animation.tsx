"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Coins, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroAnimation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[500px] aspect-square">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[80%] h-[80%] rounded-2xl bg-card border border-border shadow-xl shadow-[0_0_40px_hsl(var(--primary)/0.08)] p-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <motion.div className="w-3 h-3 rounded-full bg-red-500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.5 }} />
            <motion.div className="w-3 h-3 rounded-full bg-yellow-400" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.6 }} />
            <motion.div className="w-3 h-3 rounded-full bg-green-500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.7 }} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-4"
              >
                {step === 0 && (
                  <>
                    {["ZYNORA", "1,000,000,000", "$ZNRA"].map((text, i) => (
                      <motion.div
                        key={i}
                        className="w-full h-12 rounded-lg bg-muted border border-border flex items-center px-4"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      >
                        <span className="text-sm font-medium text-muted-foreground">{text}</span>
                      </motion.div>
                    ))}
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-32 h-32 rounded-full bg-muted border border-border flex items-center justify-center"
                      >
                        <Coins className="h-16 w-16 text-primary" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-2 w-full bg-muted rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="text-center text-sm text-muted-foreground"
                    >
                      Adding liquidity...
                    </motion.div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-lg font-bold text-primary">$ZNRA</span>
                        <span className="text-green-400 font-bold">+1337%</span>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-40 h-24"
                      >
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                          <motion.path
                            d="M0,50 Q10,40 20,38 T40,32 T60,20 T80,10 T100,0"
                            fill="none"
                            stroke="#ccbe43"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                        </svg>
                        <motion.div
                          className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[hsl(var(--primary))]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.8 }}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1 }}
                        className="text-center text-sm text-muted-foreground"
                      >
                        To the moon! 🚀
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              {[
                { Icon: Rocket, id: 0 },
                { Icon: Coins, id: 1 },
                { Icon: BarChart3, id: 2 },
              ].map(({ Icon, id }) => (
                <motion.div
                  key={id}
                  className={`w-12 h-12 rounded-lg ${
                    step === id
                      ? "bg-primary"
                      : "bg-muted border border-border"
                  } flex items-center justify-center cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(id)}
                >
                  <Icon className={`h-6 w-6 ${step === id ? "text-background" : "text-primary"}`} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button className="w-full bg-primary hover:brightness-110 text-background font-bold shadow-md shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              gm to the moon
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
