import React from 'react'

const Comments = () => {
  return (
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
                            {/* <Link aria-label="anchor" href="#!">
                                <img src="../../../../assets/images/ecommerce/png/13.png" alt="" />
                            </Link>
                            <Link aria-label="anchor" href="#!">
                                <img src="../../../../assets/images/ecommerce/png/15.png" alt="" />
                            </Link> */}
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
  )
}

export default Comments