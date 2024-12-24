"use client"

import { SimilarProduct } from '@/models/product.models';
import Link from 'next/link';
import {FC} from 'react'

interface Props{
    product:SimilarProduct;
}

const SimilarProductItem:FC<Props> = ({
  product
}) => {
  return (
    <tr>
      <td>
          <Link href={`/products/${product.uuid}`}>
              <div className="flex items-start">
                  <div className="similar-products-image me-2">
                      <img src="../../../../assets/images/ecommerce/png/16.png" alt="" />
                  </div>
                  <div className="flex-grow">
                      <p className="mb-1 text-[0.875rem] font-semibold similar-product-name text-truncate">
                          {`(${product.sku}) ${product.title}`}
                      </p>
                      <p className="mb-0">
                          <span className="text-white badge bg-success">
                              {product.rating}
                              <i className="ri-star-s-fill ms-1"></i>
                          </span>
                          <span className="text-[#8c9097] dark:text-white/50 ms-1">
                              ({product.numberOfRatings})
                          </span>
                      </p>
                  </div>
                  <div className="text-center">
                      <p className="mb-0 text-[1rem] font-semibold">
                          ${product.salePrice}
                      </p>
                      <p className="mb-0 text-[#8c9097] dark:text-white/50">
                          <s>${product.price}</s>
                      </p>
                  </div>
              </div>
          </Link>
      </td>
    </tr>
  )
}

export default SimilarProductItem