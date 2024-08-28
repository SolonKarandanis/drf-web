"use client"

import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/shared/shadcn/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react";

export function Modal({
    children,
    title,
    description,
}: {
    children: React.ReactNode,
    title:string,
    description:string,
}) {
    const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    const handleOpenChange = (event:boolean) => {
        setIsDialogOpen(event)
        setTimeout(() => {
            if (!open) {
              document.body.style.pointerEvents = ''
            }
        }, 100)
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={isDialogOpen} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="p-0 border-0 max-w-7xl">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}