import Link from "next/link";
import { ComponentProps, startTransition } from "react";
import { useProgressBar } from "./progress-bar";
import { useRouter } from "next/navigation";

export function ProgressBarLink({
    href,
    children,
    ...rest
  }: ComponentProps<typeof Link>) {
    let progress = useProgressBar(); 
    let router = useRouter();
  
    return (
      <Link
        href={href}
        onClick={(e) => {
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