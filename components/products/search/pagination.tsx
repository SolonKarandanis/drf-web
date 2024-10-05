import Link from "next/link"


const Pagination = () => {
  return (
    <ul className="ti-pagination !px-3 !py-[0.375rem] !text-[1rem] !mb-4 flex justify-end">
        <li className="page-item disabled">
            <Link className="page-link !px-3 !py-[0.375rem]" href="#!">Previous</Link>
        </li>
        <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">1</Link></li>
        <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">2</Link></li>
        <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">3</Link></li>
        <li className="page-item">
            <Link className="page-link !px-3 !py-[0.375rem]" href="#!">Next</Link>
        </li>
    </ul>
  )
}

export default Pagination