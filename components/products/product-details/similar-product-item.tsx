"use client"

import { SimilarProduct } from '@/models/product.models';
import { useAppSelector } from '@/shared/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react'

interface Props{
    product:SimilarProduct;
}

const SimilarProductItem:FC<Props> = ({
  product
}) => {
  const configState = useAppSelector((state)=>state.config);
  const host = configState.djangoHost
  const path = configState.baseUrl
  const imagePath = product.previewImage ?   `${host}${product.previewImage}` : `${path}/assets/images/ecommerce/png/16.png`;

  return (
    <tr>
      <td>
          <Link href={`/products/${product.uuid}`}>
              <div className="flex items-start">
                  <div className="similar-products-image me-2">
                      <img src={imagePath} alt="" />
                  </div>
                  <div className="flex-grow">
                      <p className="mb-1 text-[0.875rem] font-semibold similar-product-name text-truncate">
                          {`(${product.sku}) ${product.title}`}
                      </p>
                      <p className="mb-0">
                          <span className="text-white badge bg-success">
                              {(product.numberOfRatings && product.numberOfRatings > 0) && (
                                <>
                                  {product.rating}
                                  <i className="ri-star-s-fill ms-1"></i>
                                </>
                              )}
                              {(!product.numberOfRatings || product.numberOfRatings === 0) && (
                                <>
                                  <i className="ri-star-line ms-1"></i>
                                </>
                              )}
                              
                          </span>
                          <span className="text-[#8c9097] dark:text-white/50 ms-1">
                              {(product.numberOfRatings && product.numberOfRatings > 0) && (
                                <>
                                 ({product.numberOfRatings})
                                </>
                              )}
                              {(!product.numberOfRatings || product.numberOfRatings === 0) && (
                                <span className="text-info">(0 Reviews)</span>
                              )}
                              
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