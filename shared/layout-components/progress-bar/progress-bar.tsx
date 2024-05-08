"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
} from "framer-motion";
import {
  ReactNode,
  createContext,
  useContext,
} from "react";
import useProgress from "./use-progress";

const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(
  null
);

export function useProgressBar() {
  let progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

export function ProgressBar({ className, children }: { className: string, children: ReactNode }) {
  let progress = useProgress(); 
  let width = useMotionTemplate`${progress.value}%`; 

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}





