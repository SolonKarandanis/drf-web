'use client'
 
import { useRouter } from 'next/navigation'

const CancelLogoutButton = () => {
    const router = useRouter()
    return (
        <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent 
            font-semibold bg-sky-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            transition-all text-sm"
            onClick={() => router.back()}>
            Cancel
        </button>
    )
}

export default CancelLogoutButton