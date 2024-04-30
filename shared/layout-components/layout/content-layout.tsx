import { FC, ReactNode } from 'react'
import Header from '@/shared/layout-components/header/Header';
import Sidebar from '@/shared/layout-components/sidebar/SideBar';
import Footer from '@/shared/layout-components/footer/Footer';
import Backtotop from '@/shared/layout-components/backtotop/BackToTop';
import Switcher from '../switcher/switcher';
import ContentLayoutClient from './content-layout-client';
import ContentLayoutClientContent from './content-layout-client-content';
import { basePath } from '@/next.config';

type Props = {
	children: ReactNode;
}

const ContentLayout:FC<Props> = ({children}) => {
    const path = process.env.NODE_ENV === "production" ? basePath : "";
    return (
       <>
            {/* <Switcher/> */}
            <ContentLayoutClient>
                <div className='page'>
                    <Header path={path}/>
                    <Sidebar path={path} />
                    <ContentLayoutClientContent>
                        {children}
                    </ContentLayoutClientContent>
                    <Footer/>
                </div>
                <Backtotop />
            </ContentLayoutClient>
       </>
    )
}

export default ContentLayout