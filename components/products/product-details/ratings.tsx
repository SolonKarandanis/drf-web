import React from 'react'

const Ratings = () => {
  return (
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
  )
}

export default Ratings