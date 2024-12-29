"use client";

import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <button className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white 
        text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
        onClick={() => signOut()}>
        Sign out
    </button>
  )
}

export default LogoutButton