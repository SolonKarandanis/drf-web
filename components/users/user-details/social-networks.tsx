"use client";

import { Button } from '@/shared/shadcn/components/ui/button';
import {FC, useOptimistic, useState, useTransition} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';
import { useParams } from 'next/navigation';
import { UserSocials } from '@/models/social.models';
import { useGetUserSocialsQuery } from '@/shared/redux/features/social/socialApiSlice';


interface Props{
    canEditUser:boolean;
}

const SocialNetworks:FC<Props> = ({canEditUser}) => {
    const params = useParams<{locale:string,userUuid:string}>();
    const {data: socials=[],isLoading,} = useGetUserSocialsQuery(params.userUuid);
    const [optimisticSocials, setOptimisticSocials] = useOptimistic(socials,(state:UserSocials[],newSocial:UserSocials)=>{
        return [...state, newSocial];
    });
    const [isPending, startTransition] = useTransition();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    const handleSaveButtonClick = () =>{

    }

    // const [search, { isLoading, }] = useSearchUsersMutation();
    // async function addSocial() {
    //     try {
    //         setOptimisticSocials(newTodo) 
    //         await search(newTodo);
    //     } catch (error) {
    //         console.error(error);
    //     } 
    // }
//     <button
//     onClick={() =>
//       startTransition(() => handleUpdate(!optimisticTodo.isCompleted))
//     }
//     disabled={isPending}
//   >
//     {optimisticTodo.isCompleted ? 'Uncheck' : 'Check'}
//   </button>

    return (
        <div className="items-center w-full p-6 border-b border-dashed dark:border-defaultborder/10">
            <section className="flex items-center justify-between">
                <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    Social Networks :
                </p>
                {canEditUser && isEdit && (
                    <UserEditGroupButtons 
                        onCancelClick={handleEditButtonClick} 
                        />
                )}
                {canEditUser && !isEdit && (
                    <UserEditButton onClick={handleEditButtonClick} />
                )}
            </section>
            {isLoading ? (
                <div role="status" className="mb-1 animate-pulse ">
                    <div role="status" className="animate-pulse">
                        <div className="w-32 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
            ):(
                <>
                    <div className="mb-0 btn-list">
                        {optimisticSocials?.map(social=> (
                            <button 
                                key={social.id} 
                                aria-label="button" 
                                type="button" 
                                className={`ti-btn ti-btn-sm mb-1 ${social.buttonCssClass}`}>
                                <a href={social.url} target="_blank" className={`font-semibold ${social.socialIcon}`}></a>
                            </button>
                        ))}
                    </div>
                </>
            )}
            
        </div>
    )
}

export default SocialNetworks