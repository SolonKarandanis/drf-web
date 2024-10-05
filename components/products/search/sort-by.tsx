import Link from 'next/link'
import React from 'react'

const SortBy = () => {
  return (
    <div className="block btn-group xxl:flex hs-dropdown ti-dropdown">
        <button className="ti-btn  !text-[0.75rem] ti-btn-info-full !m-0"
            type="button"
            aria-expanded="false">
            SortBy
            <i className="inline-block align-middle ri-arrow-down-s-line ms-1"></i>
        </button>
        <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
            <li>
                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                    !text-[0.8125rem] !font-medium block"
                    href="#!">
                    Featured
                </Link>
            </li>
            <li>
                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                    !text-[0.8125rem] !font-medium block"
                    href="#!">
                    Price: High to Low
                </Link>
            </li>
            <li>
                <Link className="ti-dropdown-item active !py-2 
                    !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                    href="#!">
                    Price: Low to High
                </Link>
            </li>
            <li>
                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                    !text-[0.8125rem] !font-medium block"
                    href="#!">
                    Newest
                </Link>
            </li>
            <li>
                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                    !text-[0.8125rem] !font-medium block"
                    href="#!">
                    Ratings
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SortBy