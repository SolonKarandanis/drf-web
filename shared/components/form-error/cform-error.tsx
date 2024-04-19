import {FC} from 'react'

interface Props{
    error?:string
}

const CFormError:FC<Props> = ({error}) => {
  return (
    <div className='fv-plugins-message-container'>
        <span role="alert" className='mt-2 text-sm text-red-600'>
            {error}
        </span>
    </div>
  )
}

export default CFormError