import React from 'react'

const RecentInvoices = () => {
  return (
    <div className="col-span-12 xl:col-span-4">
        <div className="box">
            <div className="w-full max-w-full ">
            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                    <h6 className="mb-0 font-bold text-[.9375rem]">Invoices</h6>
                    </div>
                    <div className="flex-none w-1/2 max-w-full px-3 text-right">
                    <button className="inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75">View All</button>
                    </div>
                </div>
                </div>
                <div className="flex-auto p-4 pb-0">
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                    <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal text-slate-700">March, 01, 2020</h6>
                        <span className="text-xs leading-tight">#MS-415646</span>
                    </div>
                    <div className="flex items-center text-sm leading-normal">
                        $180
                        <button className="inline-block px-0 py-3 mb-0 ml-6 text-sm font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 text-lg fas fa-file-pdf"></i> PDF</button>
                    </div>
                    </li>
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                    <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal text-slate-700">February, 10, 2021</h6>
                        <span className="text-xs leading-tight">#RV-126749</span>
                    </div>
                    <div className="flex items-center text-sm leading-normal">
                        $250
                        <button className="inline-block px-0 py-3 mb-0 ml-6 text-sm font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 text-lg fas fa-file-pdf"></i> PDF</button>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RecentInvoices