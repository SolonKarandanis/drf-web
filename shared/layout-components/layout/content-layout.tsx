import { FC, ReactNode } from 'react'
import Header from '@/shared/layout-components/header/Header';
import Sidebar from '@/shared/layout-components/sidebar/SideBar';
import Footer from '@/shared/layout-components/footer/Footer';
import Backtotop from '@/shared/layout-components/backtotop/BackToTop';
import Switcher from '../switcher/switcher';
import SideBarHeader from '../sidebar/SideBarHeader';
import ContentLayoutClient from './content-layout-client';
import ContentLayoutClientContent from './content-layout-client-content';

type Props = {
	children: ReactNode;
}

const ContentLayout:FC<Props> = ({children}) => {
    
    return (
       <>
            {/* <Switcher/> */}
            <ContentLayoutClient>
                <div className='page'>
                    {/* <Header/> */}
                    <Sidebar>
                        <SideBarHeader />
                    </Sidebar>
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