"use client"

import { FC } from 'react'
import Link from 'next/link'
import { TableProps } from '../props'

// const Table:FC<TableProps> = ({columns,data}) => {
    // Use the useTable Hook to send the columns and data to build the table
    // const tableInstance = useTable(
    //     {
    //       columns,
    //       data,
    //     },
    //     useGlobalFilter,
    //     useSortBy,
    //     usePagination
    // );

    // const {
    //     getTableProps, // table props from react-table
    //     getTableBodyProps, // table body props from react-table
    //     headerGroups, // headerGroups, if your table has groupings
    //     rows, // rows for the table based on the data passed
    //     prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    // } = tableInstance;

    
    

//     return (
//         <div className="overflow-x-auto mt-4">
//             <div className="table-responsive">
//                 <div className=" mb-4 flex">

//                 </div>
//                 <table className="table whitespace-nowrap table-borderless 
//                     min-w-full" 
//                     {...getTableProps()}>
//                     <thead>
//                         {headerGroups.map(headerGroup =>{
//                             const {key, ...rest} =headerGroup.getHeaderGroupProps();
//                             return (
//                                 <tr className="border-b border-defaultborder"
//                                     key={key}
//                                     {...rest}>
//                                         {headerGroup.headers.map(column =>{
//                                             const {key,...rest} = column.getHeaderProps();
//                                             return (
//                                                 <th scope="col" 
//                                                     className="text-start"
//                                                     key={key}
//                                                     {...rest}>
//                                                     {column.render("header")}
//                                                 </th>
//                                             )
//                                         })}
//                                 </tr>
//                             )
//                         })}
//                     </thead>
//                     <tbody {...getTableBodyProps()}>
//                     {rows.map((row, i) => {
//                         prepareRow(row);
//                         const {key,...rest} = row.getRowProps();
//                         return (
//                             <tr key={key}
//                                 {...rest}>
//                                 {row.cells.map(cell => {
//                                     return <td {...cell.getCellProps()}>
//                                         {cell.render("Cell")}
//                                     </td>;
//                                 })}
//                             </tr>
//                         );
//                     })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default Table



{/* <tr className="border-b border-defaultborder">
                            <th scope="row" className="text-start">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checkebox-sm" defaultChecked />
                                    <label className="form-check-label" htmlFor="checkebox-sm">
                                        Zelensky
                                    </label>
                                </div>
                            </th>
                            <td>#5182-3467</td>
                            <td>24 May 2022</td>
                            <td>
                                <span className="badge bg-primary text-white">Fixed</span>
                            </td>
                            <td>
                                <div className="hstack flex gap-3 text-[.9375rem]">
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-defaultborder">
                            <th scope="row" className="text-start">
                                Zozo Hadid
                            </th>
                            <td>#5182-3412</td>
                            <td>02 July 2022</td>
                            <td>
                                <span className="badge bg-warning  text-white">In Progress</span>
                            </td>
                            <td>
                                <div className="hstack flex gap-3 text-[.9375rem]">
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-defaultborder">
                            <th scope="row" className="text-start">Martiana</th>
                            <td>#5182-3423</td>
                            <td>15 April 2022</td>
                            <td>
                                <span className="badge bg-success  text-white">Completed</span>
                            </td>
                            <td>
                                <div className="hstack flex gap-3 text-[.9375rem]">
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-defaultborder">
                            <th scope="row" className="text-start">Alex Carey</th>
                            <td>#5182-3456</td>
                            <td>17 March 2022</td>
                            <td>
                                <span className="badge bg-danger  text-white">Pending</span>
                            </td>
                            <td>
                                <div className="hstack flex gap-3 text-[.9375rem]">
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                    <Link aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                </div>
                            </td>
                        </tr> */}