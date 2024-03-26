'use client';

import { useEffect, useState} from 'react'
import { useAppDispatch } from '@/shared/redux/hooks';
import { useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import { basePath } from '@/next.config';
import Link from 'next/link';
import Image from "next/image";
import ModalSearch from '@/shared/layout-components/modal-search/ModalSearch';
import SelectLanguage from './select-language/select-language';
import ThemeToggler from './theme-toggler/theme-toggler';
import CartDropdown from './cart-dropdown/cart-dropdown';
import NotificationsDropdown from './notifications-dropdown/notifications-dropdown';
import AppsDropdown from './apps-dropdown/apps-dropdown';


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

const Header = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);

  const [storedata, SetStoreData] = useState(themeState);

  // //full screen
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // Enter fullscreen mode
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        // element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        dispatch(ThemeChanger({ ...themeState, "dataToggled": "close" }));
      } else {
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
    dispatch(ThemeChanger({ ...themeState, "dataToggled": "close" }));
  }

  const toggleSidebar = () => {
    let sidemenuType = themeState.dataNavLayout;
    if (window.innerWidth >= 992) {
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
              <div className="header-element md:px-[0.325rem] !items-center" onClick={() => toggleSidebar()}>
                <Link aria-label="Hide Sidebar"
                  className="sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center" href="#!"><span></span></Link>
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
              <ThemeToggler />
              <CartDropdown />
              <NotificationsDropdown />
              <AppsDropdown />

              <div className="header-element header-fullscreen py-[1rem] md:px-[0.65rem] px-2">
                <Link aria-label="anchor"
                  onClick={() => toggleFullscreen()}
                  href="#!"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2  !rounded-full font-medium dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                 {isFullscreen ? (
                    <i className="bx bx-exit-fullscreen full-screen-close header-link-icon"></i>
                  ) : (
                    <i className="bx bx-fullscreen full-screen-open header-link-icon"></i>
                  )}
                </Link>
              </div>
              <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center 
                ti-dropdown [--placement:bottom-left] profile-data">
                <button id="dropdown-profile" type="button"
                  className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent ">
                  <Image
                    alt="Image Description"
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/9.jpg`}
                    width={32}
                    height={32}
                    sizes="100vw"
                    className="inline-block rounded-full "
                  />
                </button>
                <div className="md:block hidden dropdown-profile">
                  <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">Json Taylor</p>
                  <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">Web Designer</span>
                </div>
                <div
                  className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                  aria-labelledby="dropdown-profile">

                  <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                    <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="#!">
                        <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="#!"><i
                        className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>Inbox <span
                          className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">25</span>
                      </Link>
                    </li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!"><i
                      className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>Task Manager</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!"><i
                      className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>Settings</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex " href="#!"><i
                      className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>Bal: $7,12,950</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="#!"><i
                      className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>Support</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="#!"><i
                      className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>Log Out</Link></li>
                  </ul>
                </div>
              </div>
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