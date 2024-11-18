import React from 'react'

const ProductRating = () => {
  return (
    <p className="text-[1.125rem] mb-4">
        <i className="align-middle ri-star-s-fill text-warning"></i>
        <i className="align-middle ri-star-s-fill text-warning"></i>
        <i className="align-middle ri-star-s-fill text-warning"></i>
        <i className="align-middle ri-star-s-fill text-warning"></i>
        <i className="align-middle ri-star-half-s-fill text-warning"></i>
        <span className="font-semibold text-[#8c9097] dark:text-white/50 ms-1">
            4.3
            <span className="text-info">(2.4k Reviews)</span>
        </span>
    </p>
  )
}

export default ProductRating