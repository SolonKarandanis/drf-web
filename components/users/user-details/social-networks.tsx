"use client";

import { Button } from '@/shared/shadcn/components/ui/button';
import {FC, useEffect, useOptimistic, useState, useTransition} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';
import { useParams } from 'next/navigation';
import { UserSocials } from '@/models/social.models';
import { useLazyGetUserSocialsQuery } from '@/shared/redux/features/social/socialApiSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import { setUserSocials, socialsSelector, userAvailableSocialsSelector, userSelectedSocialsSelector } from '@/shared/redux/features/social/socialSlice';

interface Props{
    canEditUser:boolean;
}

const SocialNetworks:FC<Props> = ({canEditUser}) => {
    const params = useParams<{locale:string,userUuid:string}>();
    const dispatch = useAppDispatch();
    const [getUserSocials, response]  = useLazyGetUserSocialsQuery();
    const [isPending, startTransition] = useTransition();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(()=>{
        getUserSocials(params.userUuid)
          .unwrap()
          .then((userSocials) => {
            dispatch(setUserSocials(userSocials))
          })
          .catch((error)=>{
            // dispatch(resetProfileImage())
          })
    },[])

    const socials = useAppSelector(socialsSelector);
    const selectedUserSocials = useAppSelector(userSelectedSocialsSelector);
    
    const [optimisticSocials, setOptimisticSocials] = useOptimistic(selectedUserSocials,(state:UserSocials[],newSocial:UserSocials)=>{
        return [...state, newSocial];
    });
    
    

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
            {response.isLoading && (
                <div role="status" className="mb-1 animate-pulse ">
                    <div role="status" className="animate-pulse">
                        <div className="w-32 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
            )}
            {!response.isLoading && isEdit && (
                <section className="flex flex-col gap-3 mt-3">
                    {selectedUserSocials.map((selectedSocials)=>{
                        const selected = socials.find(s=>s.id===selectedSocials.socialId)!;
                        const rest = socials.filter(s=>s.id !== selectedSocials.socialId);
                        
                        return (
                            <div key={selectedSocials.id} className="flex flex-row gap-8">
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 
                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500">
                                    <option defaultValue={selected.id}>{selected.name}</option>
                                    {rest.map((social)=>(
                                        <option key={social.id} value={social.id}>
                                            {social.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex flex-row items-center text-[0.9375rem]">
                                    <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                        text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger">
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </section>
            )}
            {!response.isLoading && !isEdit && (
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
            )}
        </div>
    )
}

export default SocialNetworks