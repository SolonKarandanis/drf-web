import React from 'react'

const ProductInfo = () => {
  return (
    <div className="mb-4">
        <p className="text-[.9375rem] font-semibold mb-2">Product Details :</p>
        <div className="min-w-full table-responsive">
            <table className="table w-full table-bordered whitespace-nowrap">
                <tbody>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Brand
                        </th>
                        <td>Orange.Inc</td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Model Name
                        </th>
                        <td>
                            Orange watch series 4
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Color
                        </th>
                        <td>
                            Raging Brass
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Style
                        </th>
                        <td>
                            GPS
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Special Features
                        </th>
                        <td>
                            Heart rate sensor,GPS,Wifi calling,SAmoled display e.t.c
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductInfo