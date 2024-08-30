
import UploadPicture from '@/components/users/user-details/upload-picture';
import { Modal } from '@/shared/components/modal/modal'

const UploadProfileImageModal = () => {
    return (
        <div>
            <Modal description='Upload Profile Image' title='Upload File'>
                <UploadPicture />
            </Modal>
        </div>
    )
}

export default UploadProfileImageModal