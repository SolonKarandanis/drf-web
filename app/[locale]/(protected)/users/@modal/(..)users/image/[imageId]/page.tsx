"use client"

import { Modal } from '@/shared/components/modal/modal'
import { useAppSelector } from '@/shared/redux/hooks'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {FC} from 'react'

type Props = {
    params: {
        imageId: number,
    }
}

const ProfileImageModal:FC<Props> = ({
    params:{imageId}
}) => {
  const t = useTranslations();
  const configState = useAppSelector((state) => state.config);
  const profileImage = useAppSelector((state)=> state.users.userProfileImage);
  const host = configState.djangoHost
  const path = configState.baseUrl
  const imagePath = profileImage ?   `${host}${profileImage.image}` : `${path}/assets/images1/faces/21.jpg`;
  return (
    <div>
      <Modal description={t("USERS.DETAILS.LABELS.view-profile-modal-description")} 
        title={t("USERS.DETAILS.LABELS.view-profile-modal-title")}>
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
          <Image src={imagePath} fill alt={profileImage?.alt || ''} className="object-contain w-full h-full" />
        </div>
      </Modal>
    </div>
    
  )
}

export default ProfileImageModal