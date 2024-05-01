"use client"

import React from 'react'
import Link from 'next/link'

const Table = () => {
  return (
    
    <div className="overflow-x-auto">
        <div className="table-responsive">
            <table className="table whitespace-nowrap table-borderless 
                min-w-full">
                <thead>
                    <tr className="border-b border-defaultborder">
                        <th scope="col" className="text-start">
                            User Name
                        </th>
                        <th scope="col" className="text-start">
                            Transaction Id
                        </th>
                        <th scope="col" className="text-start">
                            Created
                        </th>
                        <th scope="col" className="text-start">
                            Status
                        </th>
                        <th scope="col" className="text-start">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-defaultborder">
                        <th scope="row" className="text-start">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="checkebox-sm" defaultChecked />
                                <label className="form-check-label" htmlFor="checkebox-sm">
                                    Zelensky
                                </label>
                            </div>
                        </th>
                        <td>#5182-3467</td>
                        <td>24 May 2022</td>
                        <td>
                            <span className="badge bg-primary text-white">Fixed</span>
                        </td>
                        <td>
                            <div className="hstack flex gap-3 text-[.9375rem]">
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-defaultborder">
                        <th scope="row" className="text-start">
                            Zozo Hadid
                        </th>
                        <td>#5182-3412</td>
                        <td>02 July 2022</td>
                        <td>
                            <span className="badge bg-warning  text-white">In Progress</span>
                        </td>
                        <td>
                            <div className="hstack flex gap-3 text-[.9375rem]">
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-defaultborder">
                        <th scope="row" className="text-start">Martiana</th>
                        <td>#5182-3423</td>
                        <td>15 April 2022</td>
                        <td>
                            <span className="badge bg-success  text-white">Completed</span>
                        </td>
                        <td>
                            <div className="hstack flex gap-3 text-[.9375rem]">
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-defaultborder">
                        <th scope="row" className="text-start">Alex Carey</th>
                        <td>#5182-3456</td>
                        <td>17 March 2022</td>
                        <td>
                            <span className="badge bg-danger  text-white">Pending</span>
                        </td>
                        <td>
                            <div className="hstack flex gap-3 text-[.9375rem]">
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Table