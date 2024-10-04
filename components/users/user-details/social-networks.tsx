"use client";
import {FC, useEffect, useOptimistic, useState, useTransition} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';
import { useParams } from 'next/navigation';
import { UserSocials } from '@/models/social.models';
import { useLazyGetUserSocialsQuery } from '@/shared/redux/features/social/socialApiSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import { setUserSocials, socialsSelector,  userSelectedSocialsSelector } from '@/shared/redux/features/social/socialSlice';
import * as z from "zod";
import { CreateUserSocialsSchema } from '@/schemas/social.schemas';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userIdSelector } from '@/shared/redux/features/users/usersSlice';
import { Form } from '@/shared/shadcn/components/ui/form';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props{
    canEditUser:boolean;
}

type Inputs = z.infer<typeof CreateUserSocialsSchema>
type SocialsType = z.infer<typeof CreateUserSocialsSchema>["socials"][number];


const SocialNetworks:FC<Props> = ({canEditUser}) => {
    const userId = useAppSelector(userIdSelector);
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

    const defaultSocialValues:SocialsType[] = optimisticSocials.map(({socialId,url})=> {
        return {socialId:String(socialId),url,userId} as SocialsType;
    })
    
    

    

    const formId="socials-form";

    const  {
        handleSubmit,
        register,
        control,
        formState: { isValid, errors, isValidating, isDirty },
        reset
      } = useForm<Inputs>({
        resolver: zodResolver(CreateUserSocialsSchema),
        defaultValues:{
            socials:defaultSocialValues
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "socials",
        control:control
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        console.log(JSON.stringify(data))
    }

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    const handleDeleteAllButtonClick = () =>{

    }

    const handleDeleteItemButtonClick= (index:number) =>{
        remove(index)
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
//       startTransition(() => addSocial(!optimisticTodo.isCompleted))
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
                        fomrId={formId}/>
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
                <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col gap-3 mt-3">
                        {fields.map((field, index) =>{
                            const selected = socials.find(s=>s.id===Number(field.socialId))!;
                            return (
                                <div key={field.id} className="flex flex-row gap-8 ">
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500"
                                        {...register(`socials.${index}.socialId`)}
                                        defaultValue={field.socialId}>
                                        {socials.map((social)=>(
                                            <option key={social.id} value={social.id}>
                                                {social.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input 
                                        {...register(`socials.${index}.userId`)}
                                        type="hidden" 
                                        className='hidden'
                                        />
                                    <input 
                                        {...register(`socials.${index}.url`)}
                                        size={20}
                                        type="text"
                                        placeholder="Url"
                                        className="form-control !rounded-md"/>
                                    <div className="flex flex-row items-center text-[0.9375rem] gap-4">
                                        <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                            text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
                                            onClick={() => handleDeleteItemButtonClick(index)}>
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                        <div className='h-[3rem] w-[2.7rem]'>
                                            {index ===fields.length -1 && userId &&(
                                                <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                                    text-[0.8rem] ti-btn-success ti-btn-success-full"
                                                    onClick={() => append({userId,socialId:'1',url:''})}>
                                                    <i className="ri-add-line"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='flex flex-col items-end mt-3'>
                            <Button 
                                type="reset" 
                                variant="destructive"
                                className="w-[6.5rem]"
                                onClick={handleDeleteAllButtonClick}>
                                Delete All
                            </Button>
                        </div>
                    </section>
                    
                </form>
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


{/* <button
type="button"
className="block p-4 mx-auto bg-blue-300 rounded-lg hover:bg-blue-400"
onClick={() =>
  append({
    postId: "new",
    text: ""
  })
}
>
Append
</button> */}