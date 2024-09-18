"use client"

import UploadPicture from '@/components/users/user-details/upload-picture';
import { Modal } from '@/shared/components/modal/modal'
import { useTranslations } from 'next-intl';

const UploadProfileImageModal = () => {
    const t = useTranslations();
    return (
        <div>
            <Modal description={t("USERS.DETAILS.LABELS.upload-profile-modal-description")} 
                title={t("USERS.DETAILS.LABELS.upload-profile-modal-title")}>
                <UploadPicture />
            </Modal>
        </div>
    )
}

export default UploadProfileImageModal