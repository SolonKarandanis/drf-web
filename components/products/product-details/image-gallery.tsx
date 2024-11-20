"use client"

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { useState } from 'react';


const ImageGallery= () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="xxl:col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 md:mb-[3rem] mb-4">
            <Swiper
                spaceBetween={10} 
                autoplay={{ delay: 2500, disableOnInteraction: false, }} 
                navigation={true} 
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]} 
                className="rounded-md mySwiper2 swiper swiper-preview swiper-preview-details bg-light" >
                <SwiperSlide id="img-container">
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/15.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/13.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/14.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/17.png" alt="img" />
                </SwiperSlide>
            </Swiper>
            <Swiper 
                onSwiper={(swiper)=>setThumbsSwiper(swiper)} 
                autoplay={{ delay: 2500, disableOnInteraction: false, }} 
                spaceBetween={10} 
                slidesPerView={4} 
                freeMode={true} 
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]} className="mySwiper swiper swiper-view">
                <SwiperSlide className="rtl:me-0">
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/15.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/13.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/14.png" alt="img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="img-fluid" src="../../../../assets/images/ecommerce/png/17.png" alt="img" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ImageGallery