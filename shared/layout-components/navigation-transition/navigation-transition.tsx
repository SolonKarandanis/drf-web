"use client"

import {FC,ReactNode} from 'react'
import { motion } from "framer-motion";


interface Props{
    children:ReactNode
}


const NavigationTransition:FC<Props>= ({children}) => {
  return (
    <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        }}
    >
        {children}
    </motion.div>
  )
}

export default NavigationTransition