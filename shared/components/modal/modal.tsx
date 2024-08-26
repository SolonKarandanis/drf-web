"use client"

import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/shared/shadcn/components/ui/dialog"
import { useRouter } from "next/navigation"

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

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="p-0 bg-transparent border-0 max-w-7xl">
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