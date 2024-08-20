import React from 'react'
import { FaPaypal,FaLandmark, FaPlus,FaPencilAlt } from "react-icons/fa";
import { basePath } from '@/next.config';

const PaymentMethod = () => {
    const path = process.env.NODE_ENV === "production" ? basePath : "";
    return (
        <div className="max-w-full px-3 mb-4 lg:mb-0 lg:w-full lg:flex-none">
            <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                            <h6 className="mb-0 text-base font-bold">Payment Method</h6>
                        </div>
                        <div className="flex-none w-1/2 max-w-full px-3 text-right">
                            <a className="inline-block w-48 px-6 py-3 text-xs font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25" > 
                                <div className='flex items-center justify-center gap-3'>
                                    <FaPlus />
                                    <span>Add New Card</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap -mx-3">
                        <div className="max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                            <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                <img className="mb-0 mr-4 w-[10%]" src={`${path}/assets/images/logos/mastercard.png`} alt="logo" />
                                <h6 className="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
                                <FaPencilAlt  className="ml-auto cursor-pointer text-slate-700" data-target="tooltip_trigger" data-placement="top"/>
                                <div data-target="tooltip" className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg">
                                    Edit Card
                                    <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                            <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                <img className="mb-0 mr-4 w-[10%]" src={`${path}/assets/images/logos/visa.png`} alt="logo" />
                                <h6 className="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248</h6>
                                <FaPencilAlt  className="ml-auto cursor-pointer text-slate-700" data-target="tooltip_trigger" data-placement="top"/>
                                <div data-target="tooltip" className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg">
                                    Edit Card
                                    <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod