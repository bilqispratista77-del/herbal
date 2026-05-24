'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function WhatsAppButton() {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-shadow hover:shadow-xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Chat via WhatsApp"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white">
          Chat via WhatsApp
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
