
import Dropzone from '@/shared/components/dropzone/dropzone';
import { Modal } from '@/shared/components/modal/modal'

const UploadProfileImageModal = () => {
    return (
        <div>
            <Modal description='Upload Profile Image' title='Upload File'>
                <Dropzone />
            </Modal>
        </div>
    )
}

export default UploadProfileImageModal