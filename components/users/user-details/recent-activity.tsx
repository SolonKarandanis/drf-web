import Link from 'next/link'
import {FC} from 'react'

const RecentPostsdata = [
    { id: 1, src: "../../../assets/images/media/media-39.jpg", name: 'Animals', text: 'There are many variations of passages of Lorem Ipsum available' },
    { id: 2, src: "../../../assets/images/media/media-56.jpg", name: 'Travel', text: 'Latin words, combined with a handful of model sentence' },
    { id: 3, src: "../../../assets/images/media/media-54.jpg", name: 'Interior', text: 'Contrary to popular belief, Lorem Ipsum is not simply random' },
    { id: 4, src: "../../../assets/images/media/media-64.jpg", name: 'Nature', text: 'It is a long established fact that a reader will be distracted by the readable content' }
];

const RecentActivity = () => {
  return (
    <div className="col-span-12 xl:col-span-4">
        <div className="box">
            <div className="flex justify-between box-header">
                <div className="box-title">
                    Recent Posts
                </div>
                <div>
                    <span className="badge bg-primary/10 text-primary">Today</span>
                </div>
            </div>
            <div className="box-body">
                <ul className="list-group">
                    {RecentPostsdata.map((idx)=>(

                    <li className="list-group-item" key={Math.random()}>
                        <Link href="#!">
                            <div className="flex flex-wrap items-center">
                                <span className="avatar avatar-md me-4 !mb-0">
                                    <img src={idx.src} className="img-fluid !rounded-md" alt="..." />
                                </span>
                                <div className="flex-grow">
                                    <p className="mb-0 font-semibold">{idx.name}</p>
                                    <p className="mb-0 text-[0.75rem] profile-recent-posts text-truncate text-[#8c9097] dark:text-white/50">
                                        {idx.text}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RecentActivity