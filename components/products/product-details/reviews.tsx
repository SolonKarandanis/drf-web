
import React from 'react'
import Comments from './comments'
import Ratings from './ratings'

const Reviews = () => {
  return (
    <div className="mb-0">
        <p className="text-[.9375rem] font-semibold mb-3">Reviews &amp; Ratings :</p>
        <div className="grid-cols-12 gap-6 sm:grid">
            <Ratings />
            <Comments />
        </div>
    </div>
  )
}

export default Reviews