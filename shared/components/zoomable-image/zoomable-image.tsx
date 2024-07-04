import Image from 'next/image'
import {DetailedHTMLProps, ImgHTMLAttributes} from 'react'
import { Dialog,DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/shared/shadcn/components/ui/dialog'


export default function ZoomableImage({
    src,
    alt,
    className,
    title,
  }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    if (!src) return null
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={src}
            alt={alt || ''}
            sizes="100vw"
            className={className}
            width={700}
            height={475}
          />
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-0 max-w-7xl">
            <DialogDescription>
                Description
            </DialogDescription>
            <DialogTitle>{title}</DialogTitle>
            <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
                <Image src={src} fill alt={alt || ''} className="object-contain w-full h-full" />
            </div>
        </DialogContent>
      </Dialog>
    )
}