import Image from "next/image";
import { basePath } from '@/next.config';

const SelectLanguage = () => {
  return (
    <div className="header-element py-[1rem] md:px-[0.65rem] px-2  
        header-country hs-dropdown ti-dropdown  hidden sm:block [--placement:bottom-left]">
        <button id="dropdown-flag" type="button"
        className="hs-dropdown-toggle ti-dropdown-toggle !p-0 flex-shrink-0  !border-0 !rounded-full !shadow-none">
        <Image
            alt="flag-img"
            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`}
            width={700}
            height={475}
            sizes="100vw"
            className="h-[1.25rem] w-[1.25rem] rounded-full"
        />
        </button>
        <div className="hs-dropdown-menu ti-dropdown-menu min-w-[10rem] hidden !-mt-3" 
            aria-labelledby="dropdown-flag">
            <div className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10">
                <div className="py-2 first:pt-0 last:pb-0">
                    <div className="ti-dropdown-item !p-[0.65rem] ">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse w-full">
                            <div className="h-[1.375rem] flex items-center w-[1.375rem] rounded-full">
                                <Image
                                    alt="flag-img"
                                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`}
                                    width={700}
                                    height={475}
                                    sizes="100vw"
                                    className="h-[1.25rem] w-[1.25rem] rounded-full"
                                />
                            </div>
                            <div>
                                <p className="!text-[0.8125rem] font-medium">
                                    English
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SelectLanguage