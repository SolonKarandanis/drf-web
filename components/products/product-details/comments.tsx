import { Comment } from '@/models/comment.models'
import { FC } from 'react'

interface Props{
   comments:Comment[];
   loading:boolean;
}

const Comments:FC<Props> = ({
    comments,
    loading=false
}) => {
    return (
        <div className="col-span-12 mt-4 xxl:col-span-8 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 xxl:mt-0">
            {loading && (
                <div role="status" className="w-full p-4 border rounded animate-pulse dark:border-gray-700 dark:border-defaultborder/10">
                    <div className="flex flex-row">
                        <div className="flex items-center flex-grow w-full mt-4">
                            <svg className="w-8 h-8 text-gray-700 me-3 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <div>
                                <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-72"></div>
                                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-52"></div>
                                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!loading && comments && comments.map((comment)=>{
                const dateCreated = new Date(comment.dateCreated).toDateString();
                return (
                    <div key={comment.id} className="p-4 border dark:border-defaultborder/10">
                        <div className="flex flex-grow">
                            <div className="me-2">
                                <span className="avatar avatar-sm avatar-rounded">
                                    <img src="../../../../assets/images/faces/15.jpg" alt="" />
                                </span>
                            </div>
                            <div className="leading-none me-2">
                                <p className="mb-1 font-semibold text-[0.875rem]">
                                    {`${comment.userFirstName} ${comment.userLastName} (${comment.userEmail})`}
                                </p>
                            
                                <div className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">
                                    Reviewed on {dateCreated}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:ps-0 sm:mt-0 ps-2">
                            {comment.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments