import { Modal } from '@/shared/components/modal/modal'
import {FC} from 'react'

type Props = {
    params: {
        imageId: number,
    }
}

const ProfileImageModal:FC<Props> = ({
    params:{imageId}
}) => {
  return (
    <Modal>modal page</Modal>
  )
}

export default ProfileImageModal