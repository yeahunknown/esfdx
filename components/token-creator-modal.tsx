"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { TokenCreator } from "@/components/token-creator"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Symbol must be at least 2 characters.",
  }),
  supply: z.string().min(1, {
    message: "Supply is required.",
  }),
  decimals: z.number().min(0).max(9),
  description: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  burnable: z.boolean(),
  mintable: z.boolean(),
  taxFee: z.number().min(0).max(10),
})

interface TokenCreatorModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
  onSuccess?: () => void
}

export function TokenCreatorModal(props: TokenCreatorModalProps) {
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      supply: "1000000000",
      decimals: 9,
      description: "",
      website: "",
      twitter: "",
      telegram: "",
      burnable: false,
      mintable: false,
      taxFee: 0,
      ...props.defaultValues,
    },
  })

  // Update form values if defaultValues prop changes
  useEffect(() => {
    if (props.defaultValues) {
      form.reset({
        name: "",
        symbol: "",
        supply: "1000000000",
        decimals: 9,
        description: "",
        website: "",
        twitter: "",
        telegram: "",
        burnable: false,
        mintable: false,
        taxFee: 0,
        ...props.defaultValues,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValues])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsCreating(true)

    // Simulate token creation
    setTimeout(() => {
      setIsCreating(false)
      setIsCreated(true)
      if (props.onSuccess) props.onSuccess()
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const resetForm = () => {
    form.reset()
    setStep(1)
    setIsCreated(false)
  }

  // Add this to ensure the form resets when dialog closes
  const handleDialogClose = () => {
    setTimeout(() => {
      resetForm()
    }, 300)
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => {
        if (props.onOpenChange) props.onOpenChange(open)
        if (!open) handleDialogClose()
      }}
    >
      {/* Only show trigger if not controlled */}
      {!props.open && (
        <DialogTrigger asChild>
          <Button
  size="lg"
  className="bg-[#ccbe43] hover:bg-[#b3a936] text-black font-bold group transition-all duration-300 transform hover:translate-y-[-2px]"
>
  Create Token 🚀
</Button>

        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[900px] bg-gray-900 border-[#ccbe43]/30">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-[#ccbe43]">
  Create Your Meme Coin
</DialogTitle>

            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="p-0">
          <TokenCreator defaultValues={props.defaultValues} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
