import React from 'react'

const SideBarLoading = () => {
  return (
    <div role="status" className="animate-pulse">
        <div className="w-32 h-2 mb-1 bg-gray-400 rounded-full dark:bg-gray-700"></div>
        <div className="w-32 h-2 mb-1 bg-gray-400 rounded-full dark:bg-gray-700"></div>
        <div className="w-32 h-2 mb-1 bg-gray-400 rounded-full dark:bg-gray-700"></div>
    </div>
  )
}

export default SideBarLoading