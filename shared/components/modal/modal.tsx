"use client"

import { Dialog, DialogContent, DialogOverlay } from "@/shared/shadcn/components/ui/dialog"
import { useRouter } from "next/navigation"

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden">
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}