import {FC} from 'react'

interface Props{
    error?:string
}

const CFormError:FC<Props> = ({error}) => {
  return (
    <div className='fv-plugins-message-container'>
        <span role="alert" className='fv-help-block'>
            {error}
        </span>
    </div>
  )
}

export default CFormError