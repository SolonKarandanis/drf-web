"use client";

import Link from "next/link";
import { ComponentProps, startTransition } from "react";
import { useProgressBar } from "./progress-bar";
import { useRouter } from "next/navigation";
import { Item } from "../sidebar/nav";

interface ProgressBarLinkProps extends ComponentProps<typeof Link>{
  setSidemenu?:(item:Item)=>void
}

export function ProgressBarLink({
    href,
    children,
    onClick,
    setSidemenu,
    ...rest
  }: ProgressBarLinkProps) {
    let progress = useProgressBar(); 
    let router = useRouter();

  
    return (
      <Link
        href={href}
        onClick={(e) => {
          onClick?.call
          e.preventDefault();
          progress.start(); 
          startTransition(() => {
            router.push(href.toString());
            progress.done(); 
          });
        }}
        {...rest}
      >
        {children}
      </Link>
    );
}