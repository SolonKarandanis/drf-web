import Link from "next/link"
import Image from "next/image";
import { basePath } from '@/next.config';

const SideBarHeader = () => {
    return (
        <div className="main-sidebar-header">
            <Link href="/dashboard/" className="header-logo">
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`}
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo desktop-logo"/>
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo toggle-logo"/>
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo desktop-dark"/>
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo toggle-dark"/>
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo desktop-white"/>
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`}
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="main-logo toggle-white"/>
            </Link>
        </div>
    )
}

export default SideBarHeader