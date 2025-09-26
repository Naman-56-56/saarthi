"use client"

import ProfileSetup from "@/app/profile-setup/page"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-zinc-800 p-0">
        <div className="overflow-hidden">
          <ProfileSetup isFirstTime={false} onComplete={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}