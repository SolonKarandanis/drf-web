import {FC} from 'react'

const Suggestionsdata = [
    { id: 1, src: "../../../assets/images/faces/15.jpg", name: 'Alister' },
    { id: 2, src: "../../../assets/images/faces/4.jpg", name: 'Samantha Sams' },
    { id: 3, src: "../../../assets/images/faces/11.jpg", name: 'Jason Mama' },
    { id: 4, src: "../../../assets/images/faces/5.jpg", name: 'Alicia Sierra' },
    { id: 5, src: "../../../assets/images/faces/7.jpg", name: 'Kiara Advain' }
  ];

const PreviousOrders = () => {
  return (
    <div className="col-span-12 xl:col-span-4">
        <div className="box">
            <div className="flex justify-between box-header">
                <div className="box-title">
                    Suggestions
                </div>
                <div>
                    <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-success">View All</button>
                </div>
            </div>
            <div className="box-body">
                <ul className="list-group">
                    {Suggestionsdata.map((idx) =>(

                    <li className="list-group-item" key={Math.random()}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center font-semibold">
                                <span className="avatar avatar-xs me-2">
                                    <img src={idx.src} alt="" />
                                </span>{idx.name}
                            </div>
                            <div>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary !mb-0">
                                    <i className="ri-add-line"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default PreviousOrders