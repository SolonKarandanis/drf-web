import {FC} from 'react'
import Image from 'next/image';

interface Props{
    firstName:string;
    lastName:string;
    roles:string;
    country:string;
    city:string;
    image:string
}

const Profile:FC<Props> = ({
    firstName,
    lastName,
    city,
    country,
    roles,
    image
}) => {
  return (
    <div className="items-start p-6 sm:flex main-profile-cover">
        <div>
            <span className="avatar avatar-xxl avatar-rounded online me-4">
                <Image
                    alt="profile-picture"
                    src={image}
                    width={700}
                    height={475}
                    sizes="100vw"/>
            </span>
        </div>
        <div className="flex-grow main-profile-info">
        <div className="flex items-center !justify-between">
            <h6 className="font-semibold mb-1 text-black text-[1rem]">Json Taylor</h6>
            <button type="button" className="ti-btn ti-btn-light !font-medium !gap-0"><i className="inline-block align-middle ri-add-line me-1"></i>Follow</button>
        </div>
        <p className="mb-1 text-black  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
        <p className="text-[0.75rem] text-black mb-6 opacity-[0.5]">
            <span className="inline-flex text-black me-4"><i className="align-middle ri-building-line me-1"></i>Georgia</span>
            <span className="inline-flex text-black"><i className="align-middle ri-map-pin-line me-1"></i>Washington D.C</span>
        </p>
        <div className="flex mb-0">
            <div className="me-6">
                <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">113</p>
                <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Projects</p>
            </div>
            <div className="me-6">
                <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">12.2k</p>
                <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Followers</p>
            </div>
            <div className="me-6">
                <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">128</p>
                <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Following</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Profile