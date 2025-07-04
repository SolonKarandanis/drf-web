const WishlistHeader = () => {
  return (
    <div className="col-span-12 xl:col-span-12">
        <div className="box">
            <div className="items-center justify-between box-body sm:flex">
                <div className="text-[.9375rem] mb-0">Total <span className="text-white badge bg-success">12</span> products are wishlisted</div>
                <div className="flex mt-2 sm:mt-0" role="search">
                    <input className="form-control form-control-sm me-2 !rounded-sm" type="search" placeholder="Search" aria-label="Search"  />
                    <button className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-light" type="submit">Search</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishlistHeader