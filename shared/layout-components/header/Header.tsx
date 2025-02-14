'use client';

import { FC, useEffect, useState} from 'react'
import { useAppDispatch } from '@/shared/redux/hooks';
import { useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import Link from 'next/link';
import ModalSearch from '@/shared/layout-components/modal-search/ModalSearch';
import SelectLanguage from './select-language/select-language';
import ThemeToggler from './theme-toggler/theme-toggler';
import CartDropdown from './cart-dropdown/cart-dropdown';
import NotificationsDropdown from './notifications-dropdown/notifications-dropdown';
import FullscreenToggler from './fullscreen-toggler/fullscreen-toggler';
import ProfileDropdown from './profile-dropdown/profile-dropdown';
import Logo from './logo/logo';
import { useSession } from 'next-auth/react';
import { hasPermission } from '@/utils/user-utils';
import { Perimissions } from '@/models/constants';


declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

type Props = {
	path?: string;
}

const Header:FC<Props> = ({path})=> {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);
  const [storedata, SetStoreData] = useState(themeState);
  const { data: session, status } = useSession();
  const user = session?.user;
  const canSeeCart =hasPermission(user,Perimissions.VIEW_CART);

  useEffect(() => {
    const handleResize = () => {
      // console.log('handleResize')
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        console.log('windowObject.innerWidth <= 991')
        dispatch(ThemeChanger({ ...themeState, "dataToggled": "close" }));
      } else {
        // console.log('windowObject.innerWidth > 991')
        dispatch(ThemeChanger({...themeState,"dataToggled":""}));
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch,themeState]);

  useEffect(() => {
    SetStoreData(themeState);
  }, [themeState]);

  function menuClose() {
    console.log('menuClose')
    dispatch(ThemeChanger({ ...themeState, "dataToggled": "close" }));
  }

  const toggleSidebar = () => {
    console.log('toggleSidebar')
    let sidemenuType = themeState.dataNavLayout;
    if (window.innerWidth >= 992) {
      console.log('window.innerWidth >= 992')
      if (sidemenuType === "vertical") {
        let verticalStyle = themeState.dataVerticalStyle;
        const navStyle = themeState.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            dispatch(ThemeChanger({ ...themeState, "dataNavStyle": "" }));
            if (themeState.dataToggled === "close-menu-close") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "close-menu-close" }));
            }
            break;
          // icon-overlay
          case "overlay":
            dispatch(ThemeChanger({ ...themeState, "dataNavStyle": "" }));
            if (themeState.dataToggled === "icon-overlay-close") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              if (window.innerWidth >= 992) {
                dispatch(ThemeChanger({ ...themeState, "dataToggled": "icon-overlay-close" }));
              }
            }
            break;
          // icon-text
          case "icontext":
            dispatch(ThemeChanger({ ...themeState, "dataNavStyle": "" }));
            if (themeState.dataToggled === "icon-text-close") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "icon-text-close" }));
            }
            break;
          // doublemenu
          case "doublemenu":
            dispatch(ThemeChanger({ ...themeState, "dataNavStyle": "" }));
            if (themeState.dataToggled === "double-menu-open") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "double-menu-close" }));
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                dispatch(ThemeChanger({ ...themeState, "dataToggled": "double-menu-open" }));
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {
                  dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
                }
              }
            }
            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (themeState.dataToggled === "detached-close") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "detached-close" }));
            }
            break;
          // default
          case "default":
            dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
        }
        switch (navStyle) {
          case "menu-click":
            if (themeState.dataToggled === "menu-click-closed") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            }
            else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "menu-click-closed" }));
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (themeState.dataToggled === "menu-hover-closed") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "menu-hover-closed" }));
            }
            break;
          case "icon-click":
            if (themeState.dataToggled === "icon-click-closed") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "icon-click-closed" }));
            }
            break;
          case "icon-hover":
            if (themeState.dataToggled === "icon-hover-closed") {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "" }));
            } else {
              dispatch(ThemeChanger({ ...themeState, "dataToggled": "icon-hover-closed" }));
            }
            break;
        }
      }
    }
    else {
      console.log('window.innerWidth > 992')
      if (themeState.dataToggled === "close") {
        dispatch(ThemeChanger({ ...themeState, "dataToggled": "open" }));
        setTimeout(() => {
          const element =  document.querySelector("#responsive-overlay");
          if(element){
            if (themeState.dataToggled == "open") {
              element.classList.add("active");
              element.addEventListener("click", () => {
                element.classList.remove("active");
                menuClose();
              });
            }
            window.addEventListener("resize", () => {
              if (window.screen.width >= 992) {
                element.classList.remove("active");
              }
            });
          }
        }, 100);
      } else {
        dispatch(ThemeChanger({ ...themeState, "dataToggled": "close" }));
      }
    }
  };


  useEffect(() => {
    const navbar = document?.querySelector(".header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky = navbar?.clientHeight;

    function stickyFn() {
      if (sticky && window.pageYOffset >= sticky) {
        navbar?.classList.add("sticky-pin");
        navbar1?.classList.add("sticky-pin");
      } else {
        navbar?.classList.remove("sticky-pin");
        navbar1?.classList.remove("sticky-pin");
      }
    }
    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);
    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);


  return (
    <>
      <div className="app-header">
        <nav className="main-header !h-[3.75rem]" aria-label="Global">
          <div className="main-header-container ps-[0.725rem] pe-[1rem] ">
            <div className="header-content-left">
              <Logo path={path} />
              <div className="header-element md:px-[0.325rem] !items-center" onClick={() => toggleSidebar()}>
                <Link aria-label="Hide Sidebar"
                  className="inline-flex items-center sidemenu-toggle animated-arrow hor-toggle horizontal-navtoggle" href="#!"><span></span></Link>
              </div>
            </div>
            <div className="header-content-right">
              <div className="header-element py-[1rem] md:px-[0.65rem] px-2 header-search">
                <button aria-label="button" type="button" data-hs-overlay="#search-modal"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                  <i className="bx bx-search-alt-2 header-link-icon"></i>
                </button>
              </div>
              <SelectLanguage />
              <ThemeToggler themeStoreState={themeState}/>
              {canSeeCart && <CartDropdown />}
              <NotificationsDropdown />
              <FullscreenToggler />
              <ProfileDropdown />
              <div className="header-element md:px-[0.48rem]">
                <button aria-label="button" type="button"
                  className="hs-dropdown-toggle switcher-icon inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium  align-middle transition-all text-xs dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                  data-hs-overlay="#hs-overlay-switcher">
                  <i className="bx bx-cog header-link-icon animate-spin-slow"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <ModalSearch />
    </>
  )
}

export default Header