import { basePath } from '@/next.config';
import Link from 'next/link';
import Image from "next/image";

const Logo = () => {
  return (
    <div className="header-element">
        <div className="horizontal-logo">
            <Link href="/components/dashboards/crm/" className="header-logo">
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='desktop-logo'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='toggle-logo'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='desktop-dark'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='toggle-dark'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='desktop-white'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
                <Image
                    alt="logo"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`} 
                    width={700}
                    height={475}
                    sizes="100vw"
                    className='toggle-white'
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                />
            </Link>
        </div>
    </div>
  )
}

export default Logo