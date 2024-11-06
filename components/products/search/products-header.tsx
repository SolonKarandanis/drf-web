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
                                    </Link>
                                </li>
                                <li className="nav-item xxl:mb-mb-0 mb-2 xxl:ms-0 !ms-4">
                                    <SortBy />
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