"use client"

import CForm from "@/shared/components/form/cform"
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPasswordSchema,getForgotPasswordSchema } from '@/schemas/auth.schemas';
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from '@/shared/components/password-strength/password-strength';
import FormInput from "@/shared/components/form-input/form-input";
import FormButton from "@/shared/components/button/form-button";



const ForgotPasswordForm = () => {
  const t = useTranslations('FORGOT-PASSWORD.FORM');
  const formT = useTranslations("USERS.VALIDATION");
  const router = useRouter();
  
  const {register,handleSubmit,formState: { errors },watch} = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(getForgotPasswordSchema(formT)),
  });

  const [passStrength,setPassStrength]= useState<number>(0);

  useEffect(() => {
    const strength =passwordStrength(watch().newPassword);
    setPassStrength(strength.id);
  }, [watch().newPassword]);

  // const handleError =(error:ErrorResponse)=>{
	// 	const {status, data:{detail}} = error;
	// 	toast.error(`(${status}) ${detail}`);
	// }

  const onSubmit:SubmitHandler<ForgotPasswordSchema> = (values: ForgotPasswordSchema) =>{
    const {email,newPassword,confirmPassword} = values;
  }
  
  return (
    <>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-y-4">
          <FormInput 
              type='email'
              required={true}
              name='email' 
              placeholder={t("LABELS.email")}
              className={"w-full !rounded-md"}
              sectionClassName="col-span-12 xl:col-span-12"
              props={register("email")}
              error={errors.email?.message}>
                  {t("LABELS.email")}
          </FormInput>
          <FormInput
              type='password'
              required={true}
              name='newPassword' 
              placeholder={t("LABELS.password")}
              autoComplete="new-password"
              className={"!rounded-e-none"}
              sectionClassName="col-span-12 xl:col-span-12"
              props={register("newPassword")}
              error={errors.newPassword?.message}>
                  {t("LABELS.password")}
          </FormInput>
          <PasswordStrength passStrength={passStrength} />
          <FormInput 
              type='password'
              required={true}
              name='confirmpassword' 
              placeholder={t("LABELS.confirm-password")}
              autoComplete="new-password"
              className={"!rounded-e-none"}
              sectionClassName="col-span-12 xl:col-span-12"
              props={register("confirmPassword")}
              error={errors.confirmPassword?.message}>
                  {t("LABELS.confirm-password")}
          </FormInput>
          <div className="grid col-span-12 mt-2 xl:col-span-12">
              <FormButton 
                  intent="violet" 
                  size="md" 
                  type="submit">
                  {t("BUTTONS.create-new-password")}
              </FormButton>
          </div>
        </div>
      </CForm>
    </>
  )
}

export default ForgotPasswordForm