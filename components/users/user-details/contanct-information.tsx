import {FC} from 'react'

interface Props{
    email:string;
    phone?:string;
    country?:string;
    city?:string;
    state?:string;
    zipCode?:string;
    address?:string
}

const ContactInformation:FC<Props> = ({
    email,
    phone,
    country,
    city,
    state,
    zipCode,
    address
}) => {
    const location = `${address}, ${city}, ${state}, ${country}, ${zipCode}`
    return (
        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
            <p className="text-[.9375rem] mb-2 me-6 font-semibold">
            Contact Information :
            </p>
            <div className="text-[#8c9097] dark:text-white/50">
            <p className="mb-2">
                <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                    <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                </span>
                {email}
            </p>
            <p className="mb-2">
                <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                    <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                </span>
                {phone}
            </p>
            <p className="mb-0">
                <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                    <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                </span>
                {location}
            </p>
            </div>
        </div>
    )
}

export default ContactInformation