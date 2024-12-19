import { Comment } from '@/models/comment.models'
import { FC } from 'react'

interface Props{
   comments:Comment[];
}

const Comments:FC<Props> = ({
    comments
}) => {
    return (
        <div className="col-span-12 mt-4 xxl:col-span-8 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 xxl:mt-0">
            {comments.map((comment)=>{
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