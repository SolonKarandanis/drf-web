'use client';

import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/utils/locales";
import { useLocale } from "next-intl";
import { 
    DropdownMenu, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/shared/shadcn/components/ui/dropdown-menu";
import { Button } from "@/shared/shadcn/components/ui/button";
import { GlobeIcon } from "lucide-react";
import { useTransition } from "react";

const SelectLanguage= ()=> {
    const router = useRouter();
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function handleLocaleChange(newLocale: Locale): void {
        startTransition(() => {
            const pathArray = pathname.split("/");
            pathArray[1]=newLocale;
            const newPath = pathArray.join("/");
            router.push(newPath,{scroll:false});
        });
    }

    return (
        <div className=" py-2 md:px-[0.65rem] px-2 ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" >
                        <GlobeIcon className="size-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Language</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuCheckboxItem
                        checked={locale === "en"}
                        disabled={isPending}
                        onClick={() => {
                            handleLocaleChange("en");
                        }}
                        >
                        English
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={locale === "gr"}
                        disabled={isPending}
                        onClick={() => {
                            handleLocaleChange("gr");
                        }}
                        >
                        Greek
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default SelectLanguage