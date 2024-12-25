"use client"

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { FC, useState } from 'react';
import { useGetProductDetailsImages } from '../hooks/useGetProductDetailsImages';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/shared/redux/hooks';


interface Props{
    uuid:string;
}

const ImageGallery:FC<Props>= ({uuid}) => {
    const t = useTranslations();
    const {
        isError,
        isLoading,
        productImages
    } = useGetProductDetailsImages(uuid);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const configState = useAppSelector((state)=>state.config);
    const host = configState.djangoHost
    const path = configState.baseUrl
    

    if(isError){
        return <>{t("GLOBAL.FETCH-ERROR")}</>
    }

    return (
        <div className="xxl:col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 md:mb-[3rem] mb-4">
            {!isLoading && (!productImages || productImages.length ===0) &&(
                <p className="text-[.9375rem] font-semibold mb-2">
                    No Images available
                </p>
            )}
            {!isLoading  && productImages && productImages.length >0 &&(
                <Swiper
                    spaceBetween={10} 
                    autoplay={{ delay: 2500, disableOnInteraction: false, }} 
                    navigation={true} 
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]} 
                    className="rounded-md mySwiper2 swiper swiper-preview swiper-preview-details bg-light" >
                    {productImages.map(image=>{
                        const imagePath = image.image ?   `${host}${image.image}` : `${path}/assets/images/ecommerce/png/16.png`;
                        return (
                            <SwiperSlide key={image.id} className="img-container">
                                <img className="img-fluid" src={imagePath} alt={image.alt}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
            {!isLoading  && productImages && productImages.length >0 &&(
                <Swiper 
                    onSwiper={(swiper)=>setThumbsSwiper(swiper)} 
                    autoplay={{ delay: 2500, disableOnInteraction: false, }} 
                    spaceBetween={10} 
                    slidesPerView={4} 
                    freeMode={true} 
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]} className="mySwiper swiper swiper-view">
                    {productImages.map(image=>{
                        const imagePath = image.image ?   `${host}${image.image}` : `${path}/assets/images/ecommerce/png/16.png`;
                        return (
                            <SwiperSlide key={image.id}>
                                <img className="img-fluid" src={imagePath} alt={image.alt}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
        </div>
    )
}

export default ImageGallery