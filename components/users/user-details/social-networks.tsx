"use client";
import {FC} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';
import { useParams } from 'next/navigation';
import { CreateUserSocialRequest } from '@/models/social.models';
import { useAppSelector } from '@/shared/redux/hooks';
import * as z from "zod";
import { CreateUserSocialsSchema } from '@/schemas/social.schemas';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userIdSelector } from '@/shared/redux/features/users/usersSlice';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useTranslations } from 'next-intl';
import { useGetSocialNetworks } from '../hooks/useGetSocialNetworks';
import { useMutateSocialNetworks } from '../hooks/useMutateSocialNetworks';
import { defaultSocialValuesSelector, socialsSelector, userSelectedSocialsSelector } from '@/shared/redux/features/social/socialSlice';

interface Props{
    canEditUser:boolean;
}

type Inputs = z.infer<typeof CreateUserSocialsSchema>


const SocialNetworks:FC<Props> = ({canEditUser}) => {
    const t = useTranslations();
    const userId = useAppSelector(userIdSelector);
    const socials = useAppSelector(socialsSelector);
    const selectedUserSocials = useAppSelector(userSelectedSocialsSelector);
    const defaultSocialValues = useAppSelector(defaultSocialValuesSelector(userId!));
    const params = useParams<{locale:string,uuid:string}>();

    const {
        response
    } = useGetSocialNetworks(params.uuid);
    const {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleCreateMutation,
        handleDeleteAllMutation,
        handleDeleteOneMutation
    } = useMutateSocialNetworks();

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
        const request= data.socials.map(({socialId,url,userId})=> {
            return {
                userId,
                socialId: Number(socialId),
                url
            } as CreateUserSocialRequest
        })
        handleCreateMutation(params.uuid,request);
    }

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    const handleDeleteAllButtonClick = () =>{
        handleDeleteAllMutation(params.uuid);
        remove();
    }

    const handleDeleteItemButtonClick= (index:number) =>{
        const field =fields.find((field,idx)=> idx===index);
        if(field){
            remove(index)
            const selected = selectedUserSocials.find(s=>s.socialId===Number(field.socialId) && s.url===field.url);
            if(selected){
                handleDeleteOneMutation(params.uuid,selected.id);
            }
        }
    }

    return (
        <div className="items-center w-full p-6 border-b border-dashed dark:border-defaultborder/10">
            <section className="flex items-center justify-between">
                <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    {t("USERS.DETAILS.LABELS.social-networks")} :
                </p>
                {canEditUser && isEdit && (
                    <UserEditGroupButtons 
                        onCancelClick={handleEditButtonClick} 
                        fomrId={formId}
                        isLoading={mutationLoading}/>
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
                                <div key={field.id} className="flex flex-row gap-8 rounded-lg shadow-sm shadow-[#f6f7f6] p-5 
                                    text-[1rem] border-t-[10px] border-solid border-[#f0f0f0] relative transition-all">
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500"
                                        {...register(`socials.${index}.socialId`)}
                                        defaultValue={field.socialId}
                                        disabled={mutationLoading}>
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
                                        disabled={mutationLoading}
                                        size={20}
                                        type="text"
                                        placeholder="Url"
                                        className="form-control !rounded-md"/>
                                    <div className="flex flex-row items-center text-[0.9375rem] gap-4">
                                        <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                            text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
                                            type='button'
                                            disabled={mutationLoading}
                                            onClick={() => handleDeleteItemButtonClick(index)}>
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                        <div className='h-[3rem] w-[2.7rem]'>
                                            {userId && index ===fields.length -1 &&(
                                                <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                                    text-[0.8rem] ti-btn-success ti-btn-success-full"
                                                    type='button'
                                                    disabled={mutationLoading}
                                                    onClick={() => append({userId,socialId:'1',url:''})}>
                                                    <i className="ri-add-line"></i>
                                                </button>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {userId &&fields.length===0 &&(
                             <div className="flex flex-col items-end lex">
                                <button  className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[3rem] !w-[2.7rem] 
                                    text-[0.8rem] ti-btn-success ti-btn-success-full"
                                    type='button'
                                    onClick={() => append({userId,socialId:'1',url:''})}>
                                    <i className="ri-add-line"></i>
                                </button>
                             </div>
                            
                        )}
                        {fields.length>0 && (
                            <div className='flex flex-col items-end mt-3'>
                                <Button 
                                    type="reset" 
                                    variant="destructive"
                                    className="w-[6.5rem]"
                                    disabled={mutationLoading}
                                    onClick={()=>handleDeleteAllButtonClick()}>
                                    {t("USERS.DETAILS.BUTTONS.delete-all")}
                                </Button>
                            </div>
                        )}
                        
                    </section>
                    
                </form>
            )}
            {!response.isLoading && !isEdit && (
                <div className="mb-0 btn-list">
                    {selectedUserSocials?.map(social=> (
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