import Link from "next/link"
import Image from "next/image";
import { basePath } from '@/next.config';


const AppsDropdown= () => {
  return (
    <div className="header-element header-apps dark:text-[#8c9097] 
        dark:text-white/50 py-[1rem] md:px-[0.65rem] px-2 hs-dropdown ti-dropdown md:!block !hidden [--placement:bottom-left]">
        <button aria-label="button" id="dropdown-apps" type="button"
            className="hs-dropdown-toggle ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none text-xs">
            <i className="bx bx-grid-alt header-link-icon text-[1.125rem]"></i>
        </button>
        <div
            className="main-header-dropdown !-mt-3 hs-dropdown-menu ti-dropdown-menu !w-[22rem] border-0 border-defaultborder hidden"
            aria-labelledby="dropdown-apps">

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="mb-0 text-defaulttextcolor text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">Related Apps</p>
                </div>
            </div>
            <div className="dropdown-divider mb-0"></div>
            <div className="ti-dropdown-divider divide-y divide-gray-200 
                dark:divide-white/10 main-header-shortcuts p-2" id="header-shortcut-scroll">
                <div className="grid grid-cols-3 gap-2">
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <div>
                                <Image
                                    alt="figma"
                                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/figma.png`}
                                    width={700}
                                    height={475}
                                    sizes="100vw"
                                    className="!h-[1.75rem] !w-[1.75rem] text-2xl avatar text-primary flex justify-center items-center mx-auto"
                                />
                                <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Figma</div>
                            </div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="miscrosoft"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/microsoft-powerpoint.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-[1.75] text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Power Point</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="miscrodoftword"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/microsoft-word.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">MS Word</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="calander"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/calender.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Calendar</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="apps"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/sketch.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Sketch</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="docs"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-docs.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Docs</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="google"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Google</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="translate"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/translate.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto" 
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Translate</div>
                        </Link>
                    </div>
                    <div className="">
                        <Link href="#!" className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20">
                            <Image
                            alt="sheets"
                            src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-sheets.png`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                            />
                            <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Sheets</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-4 first:pt-0 border-t">
                <Link className="w-full ti-btn ti-btn-primary-full p-2 !m-0" href="#!">
                    View All
                </Link>
            </div>
        </div>
    </div>
  )
}

export default AppsDropdown