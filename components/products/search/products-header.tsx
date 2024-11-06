import Link from 'next/link';
import SearchBar from './search-bar';
import SortBy from './sort-by';

const ProductsHeader = () => {
  return (
      <div className="col-span-12 xl:col-span-12">
        <div className="box">
            <div className="box-body !p-0">
                <nav className="w-full mx-auto px-4 xxl:flex sm:items-center xxl:justify-between navbar 
                    navbar-expand-xxl bg-white dark:bg-bodybg !py-2" aria-label="Global">
                    <div id="navbar-collapse-with-animation" 
                        className="overflow-hidden transition-all duration-300 hs-collapse basis-full grow xxl:block">
                        <div className="flex flex-col flex-wrap mt-5 xxl:flex-row gap-x-5 gap-y-2 sm:mt-0">
                            <ul className="flex flex-col flex-wrap items-center flex-grow mt-2 sm:justify-center xxl:justify-start xxl:flex-row navbar-nav me-auto lg:mb-0 xxl:items-center xxl:flex xxl:mt-0">
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600" aria-current="page"
                                        href="#!">
                                        Men
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600" href="#!">
                                        Women
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0 hs-dropdown ti-dropdown">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor hover:text-gray-600 dark:text-defaulttextcolor/70 dropdown-toggle" href="#!"
                                        id="navbarDropdown"
                                        aria-expanded="false">
                                        Kids
                                        <i className="inline-block align-middle ri-arrow-down-s-line ms-1"></i>
                                    </Link>
                                    <ul className="hidden hs-dropdown-menu ti-dropdown-menu"
                                        aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                                href="#!">
                                                Action
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                                href="#!">
                                                Another action
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                            href="#!">
                                            Something else here
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600">
                                        Today Deals
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600">
                                        Electronics
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600">
                                        Home &amp; Kitchen
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600">
                                        Fashion
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-600">
                                        <i className="inline-block align-middle ri-customer-service-line me-2"></i>
                                        Customer Service
                                    </Link>
                                </li>
                                <li className="nav-item xxl:mb-mb-0 mb-2 xxl:ms-0 !ms-4">
                                    <SortBy />
                                </li>
                                <li className="nav-item xxl:mb-0 mb-2 xxl:ms-4 !ms-4">
                                    <div className="inline-flex">
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-black !rounded-e-none">
                                            IV
                                        </button>
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-black !rounded-none">
                                            III
                                        </button>
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-black !rounded-s-none">
                                            II
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <SearchBar />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default ProductsHeader