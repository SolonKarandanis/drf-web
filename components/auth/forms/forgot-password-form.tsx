"use client"

import CForm from "@/shared/components/form/cform"
import { getClientLocale } from "@/utils/functions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";


const ForgotPasswordForm = () => {
  const locale = getClientLocale();
  const t = useTranslations('REGISTER.FORM');
  const router = useRouter();
  return (
    <>
      <CForm onSubmit={()=>{}}>
        <div className="grid grid-cols-12 gap-y-4">

        </div>
      </CForm>
    </>
  )
}

export default ForgotPasswordForm