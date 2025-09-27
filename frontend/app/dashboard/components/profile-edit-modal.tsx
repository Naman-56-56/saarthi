"use client"

import AnimatedProfileForm from "@/app/profile-setup/page"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border-0 shadow-2xl rounded-3xl p-0 relative"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border-b border-border rounded-t-3xl">
          <DialogTitle className="text-2xl font-bold text-primary">Edit Profile</DialogTitle>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-hidden px-2 sm:px-8 pb-8 pt-2">
          <AnimatedProfileForm isFirstTime={false} onComplete={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}