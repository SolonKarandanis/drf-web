import Link from 'next/link'
import React from 'react'

const Reviews = () => {
  return (
    <div className="mb-0">
        <p className="text-[.9375rem] font-semibold mb-3">Reviews &amp; Ratings :</p>
        <div className="grid-cols-12 gap-6 sm:grid">
            <div className="col-span-12 xxl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                <div className="flex items-start mb-4">
                    <div className="leading-none me-2">
                        <i className="ri-star-fill text-[1.5625rem] text-warning"></i>
                    </div>
                    <div className="leading-none">
                        <p className="mb-1">4.2 out of 5</p>
                        <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.6875rem]">
                            Based on (23,435) ratings
                        </p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-[0.75rem] font-semibold">5 </div>
                    <i className="ri-star-fill text-[.625rem] me-2"></i>
                    <div className="flex-grow progress progress-xs">
                        <div className="progress-bar !bg-success rounded-md w-[55%]" >
                        </div>
                    </div>
                    <div className="text-[#8c9097] dark:text-white/50 ms-2 text-[0.75rem]">(10,893)</div>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-[0.75rem] font-semibold">4 </div>
                    <i className="ri-star-fill text-[.625rem] me-2 "></i>
                    <div className="flex-grow progress progress-xs">
                        <div className="progress-bar rounded-md !bg-success w-[22%]" >
                        </div>
                    </div>
                    <div className="text-[#8c9097] dark:text-white/50 ms-2 text-[0.75rem]">(6,534)</div>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-[0.75rem] font-semibold">3 </div>
                    <i className="ri-star-fill text-[.625rem] me-2 "></i>
                    <div className="flex-grow progress progress-xs">
                        <div className="progress-bar rounded-s-md !bg-success w-[8%]" >
                        </div>
                    </div>
                    <div className="text-[#8c9097] dark:text-white/50 ms-2 text-[0.75rem]">(4,342)</div>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-[0.75rem] font-semibold">2 </div>
                    <i className="ri-star-fill  me-2  text-[.625rem]"></i>
                    <div className="flex-grow progress progress-xs">
                        <div className="progress-bar rounded-md !bg-warning w-[9%]" >
                        </div>
                    </div>
                    <div className="text-[#8c9097] dark:text-white/50 ms-2 text-[0.75rem]">(1,432)</div>
                </div>
                <div className="flex items-center">
                    <div className="text-[0.75rem]  font-semibold">1 </div>
                    <i className="ri-star-fill text-[.625rem] me-2"></i>
                    <div className="flex-grow progress progress-xs">
                        <div className="progress-bar rounded-md !bg-danger w-[6%]" >
                        </div>
                    </div>
                    <div className="text-[#8c9097] dark:text-white/50 ms-2 text-[0.75rem]">(1,453)</div>
                </div>
            </div>
            <div className="col-span-12 mt-4 xxl:col-span-8 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 xxl:mt-0">
                <div className="p-4 border dark:border-defaultborder/10">
                    <div className="flex flex-grow">
                        <div className="me-2">
                            <span className="avatar avatar-sm avatar-rounded">
                                <img src="../../../../assets/images/faces/15.jpg" alt="" />
                            </span>
                        </div>
                        <div className="leading-none me-2">
                            <p className="mb-1 font-semibold text-[0.875rem]">Alex Carey</p>
                            <div className="mb-1">
                                <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                                <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                                <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                                <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                                <i className="ri-star-s-line text-warning align-middle text-[0.75rem]"></i>
                            </div>
                            <div className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">
                                Reviewed on 24 nov,2022
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:ps-0 sm:mt-0 ps-2">
                        <span className="text-white badge bg-success">Verified Purchase</span>
                    </div>
                    <div className="product-images sm:ps-4 ps-0">
                        <div className="grid-cols-12 gap-6 sm:grid">
                            <div className="col-span-12 xl:col-span-6">
                                <div className="flex products-review-images">
                                    <Link aria-label="anchor" href="#!">
                                        <img src="../../../../assets/images/ecommerce/png/13.png" alt="" />
                                    </Link>
                                    <Link aria-label="anchor" href="#!">
                                        <img src="../../../../assets/images/ecommerce/png/15.png" alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-end col-span-12 mt-2 xl:col-span-6 sm:justify-end sm:mt-0">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-light me-2 whitespace-nowrap">
                                    Report abuse
                                </button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary me-2">
                                    <i className="ri-thumb-up-line"></i>
                                </button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary me-2">
                                    <i className="ri-thumb-down-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reviews