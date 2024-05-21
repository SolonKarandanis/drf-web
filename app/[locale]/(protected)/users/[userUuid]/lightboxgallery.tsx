"use client"

import { useState } from "react";
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Link from "next/link";


const Lightboxgallery = () => {
    const [open, setOpen] = useState(false);
    const value = true;
    const div = value.toString();
  return (
    <>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-40.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div> 
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-41.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-42.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-43.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-44.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-45.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-46.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-60.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-26.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-32.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-30.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <div className="col-span-12 xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6">
            <Link href="#!" className="glightbox card" data-gallery="gallery1">
                <img src={"../../../assets/images/media/media-31.jpg"} alt="image"  className="rounded-sm" onClick={() => setOpen(true)} />
            </Link>
        </div>
        <Lightbox open={open} close={() => setOpen(false)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} zoom={{
                maxZoomPixelRatio: 10,
                scrollToZoom: true
            }}
            slides={[{ src: "../../../assets/images/media/media-40.jpg" }, { src: "../../../assets/images/media/media-41.jpg" }, { src: "../../../assets/images/media/media-42.jpg" }, { src: "../../../assets/images/media/media-43.jpg" }, { src: "../../../assets/images/media/media-44.jpg" }, { src: "../../../assets/images/media/media-45.jpg" }, { src: "../../../assets/images/media/media-46.jpg" }, { src: "../../../assets/images/media/media-60.jpg" }, { src: "../../../assets/images/media/media-26.jpg" }
            , { src: "../../../assets/images/media/media-32.jpg" }, { src: "../../../assets/images/media/media-30.jpg" }, { src: "../../../assets/images/media/media-31.jpg" }
            
            ]}/>
    </>
  )
}

export default Lightboxgallery