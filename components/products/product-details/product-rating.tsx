import { FC } from "react";

interface Props{
  rating:number;
  reviews:number;
  loading:boolean;
}

const ProductRating:FC<Props> = ({
  rating,
  reviews,
  loading=false
}) => {

  if(loading){
    return (
      <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
          <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-52"></div>
      </div>
    )
  }
  return (
    <p className="text-[1.125rem] mb-4">
      {(!reviews || reviews ===0) &&(
        <>
          <i className="align-middle ri-star-line text-warning"></i>
          <i className="align-middle ri-star-line text-warning"></i>
          <i className="align-middle ri-star-line text-warning"></i>
          <i className="align-middle ri-star-line text-warning"></i>
          <i className="align-middle ri-star-line text-warning"></i>
          <span className="font-semibold text-[#8c9097] dark:text-white/50 ms-1">
              <span className="text-info">(0 Reviews)</span>
          </span>
        </>
      )}
      {reviews && reviews>0 &&(
        <>
          <i className="align-middle ri-star-s-fill text-warning"></i>
          <i className="align-middle ri-star-s-fill text-warning"></i>
          <i className="align-middle ri-star-s-fill text-warning"></i>
          <i className="align-middle ri-star-s-fill text-warning"></i>
          <i className="align-middle ri-star-half-s-fill text-warning"></i>
          <span className="font-semibold text-[#8c9097] dark:text-white/50 ms-1">
              {rating}
              <span className="text-info">({reviews} Reviews)</span>
          </span>
        </>
      )}
    </p>
  )
}

export default ProductRating