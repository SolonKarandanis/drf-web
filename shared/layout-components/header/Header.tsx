'use client';

import { useEffect, useState} from 'react'
import { useAppDispatch } from '@/shared/redux/hooks';
import { useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import { basePath } from '@/next.config';
import Link from 'next/link';


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
  const data=  <span className="font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pink/10 text-pink text-[0.625rem]">Free shipping</span>
  const cartProduct = [
    {
      id: 1,
      src: "/assets/images/ecommerce/jpg/1.jpg",
      name: 'SomeThing Phone',
      price: '$1,299.00',
      color: 'Metallic Blue',
      text: '6gb Ram',
      class: '',
    },
    {
      id: 2,
      src: "/assets/images/ecommerce/jpg/3.jpg",
      name: 'Stop Watch',
      price: '$179.29',
      color: 'Analog',
      text: data,
      class: '',
    },
    {
      id: 3,
      src: "/assets/images/ecommerce/jpg/5.jpg",
      name: 'Photo Frame',
      price: '$29.00',
      color: 'Decorative',
      text: '',
      class: '',
    },
    {
      id: 4,
      src: "/assets/images/ecommerce/jpg/4.jpg",
      name: 'Kikon Camera',
      price: '$4,999.00',
      color: 'Black',
      text: '50MM',
      class: '',
    },
    {
      id: 5,
      src: "/assets/images/ecommerce/jpg/6.jpg",
      name: 'Canvas Shoes',
      price: '$129.00',
      color: 'Gray',
      text: 'Sports',
      class: 'border-b-0',
    },
  ];

  const [cartItems, setCartItems] = useState([...cartProduct]);
  const [cartItemCount, setCartItemCount] = useState(cartProduct.length);

  const handleRemove = (itemId:number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    setCartItemCount(updatedCartItems.length);
  };

   //Notifications

   const span1 = <span className="text-warning">ID: #1116773</span>
   const span2 = <span className="text-success">ID: 7731116</span>
 
   const notifydata = [
     { id: 1, class: "Your Order Has Been Shipped", data: "Order No: 123456 Has Shipped To Your Delivery Address", icon: "gift", class2: "", color: "primary" },
     { id: 2, class: "Discount Available", data: "Discount Available On Selected Products", icon: "discount-2", class2: "", color: "secondary" },
     { id: 3, class: "Account Has Been Verified", data: "Your Account Has Been Verified Sucessfully", icon: "user-check", class2: "", color: "pink" },
     { id: 4, class: "Order Placed", data: "Order Placed Successfully", icon: "circle-check", class2: span1, color: "warning" },
     { id: 5, class: "Order Delayed", data: "Order Delayed Unfortunately", icon: "clock", class2: span2, color: "success" },
   ]

  const [notifications, setNotifications] = useState([...notifydata]);

  const handleNotificationClose = (index:number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const handleRemoveNotification = (notificationId:number) => {
    // Handle remove logic for notifications here
    // For example, you can filter out the notification with the given notificationId
    const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
    setNotifications(updatedNotifications);
  };

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
        // ThemeChanger({ ...local_varaiable, "dataToggled": "close" })
      } else {
        // ThemeChanger({...local_varaiable,"dataToggled":""})
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  //Dark Model
  const ToggleDark = () => {
    dispatch(ThemeChanger({
      ...themeState,
      "class": themeState.class == "dark" ? "light" : "dark",
      "dataHeaderStyles": themeState.dataHeaderStyles == "dark" ? "light" : "dark",
      "dataMenuStyles": themeState.dataNavLayout == "horizontal" ? themeState.dataMenuStyles == "dark" ? "light" : "dark" : "dark"

    }));
    if (themeState.class != "dark") {
      dispatch(ThemeChanger({
        ...themeState,
        "bodyBg": "",
        "darkBg": "",
        "inputBorder": "",
        "Light": "",
        "dataHeaderStyles": "",
      }));
      localStorage.setItem("ynexdarktheme", "dark");
      localStorage.removeItem("ynexdarktheme");
      localStorage.removeItem("ynexHeader");
      localStorage.removeItem("ynexMenu");
    }
    else {
      localStorage.setItem("ynexdarktheme", "dark");
      localStorage.removeItem("ynexlighttheme");
    }
  };


  useEffect(() => {
    const navbar = document?.querySelector(".header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

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
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} 
                      alt="logo" 
                      className="desktop-logo" />
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} 
                      alt="logo" 
                      className="toggle-logo" />
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} 
                      alt="logo" 
                      className="desktop-dark" />
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} 
                      alt="logo" 
                      className="toggle-dark" />
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} 
                      alt="logo" 
                      className="desktop-white" />
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`} 
                      alt="logo" 
                      className="toggle-white" />
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
              <div className="header-element py-[1rem] md:px-[0.65rem] px-2  
                header-country hs-dropdown ti-dropdown  hidden sm:block [--placement:bottom-left]">
                  <button id="dropdown-flag" type="button"
                    className="hs-dropdown-toggle ti-dropdown-toggle !p-0 flex-shrink-0  !border-0 !rounded-full !shadow-none">
                    <img 
                      src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`} 
                      alt="flag-img" 
                      className="h-[1.25rem] w-[1.25rem] rounded-full" />
                  </button>
                  <div className="hs-dropdown-menu ti-dropdown-menu min-w-[10rem] hidden !-mt-3" 
                    aria-labelledby="dropdown-flag">
                      <div className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10">
                        <div className="py-2 first:pt-0 last:pb-0">
                          
                          <div className="ti-dropdown-item !p-[0.65rem] ">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse w-full">
                              <div className="h-[1.375rem] flex items-center w-[1.375rem] rounded-full">
                                <img 
                                  src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`} 
                                  alt="flag-img"
                                  className="h-[1rem] w-[1rem] rounded-full" />
                              </div>
                              <div>
                                <p className="!text-[0.8125rem] font-medium">
                                  English
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                  </div>
              </div>
              <div 
                className="header-element header-theme-mode hidden !items-center sm:block !py-[1rem] md:!px-[0.65rem] px-2" 
                onClick={() => ToggleDark()}>
                  <Link aria-label="anchor"
                    className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                    href="#!" data-hs-theme-click-value="dark">
                    <i className="bx bx-moon header-link-icon"></i>
                  </Link>
                  <Link aria-label="anchor"
                    className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                    href="#!" data-hs-theme-click-value="light">
                    <i className="bx bx-sun header-link-icon"></i>
                  </Link>
              </div>
              <div 
                className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 
                  [--placement:bottom-right]">
                  <button id="dropdown-cart" type="button"
                    className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                    <i className="bx bx-cart header-link-icon"></i>
                    <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                      <span className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-primary text-white justify-center items-center"
                        id="cart-icon-badge">{cartItemCount}</span>
                    </span>
                  </button>

                  <div className="main-header-dropdown bg-white !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu 
                    w-[22rem] border-0 border-defaultborder hidden"
                    aria-labelledby="dropdown-cart">
                    <div className="ti-dropdown-header !bg-transparent flex justify-between items-center !m-0 !p-4">
                      <p className="text-defaulttextcolor  !text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">Cart Items</p>
                      <Link href="#!"
                        className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-success/10 text-success text-[0.75em] "
                        id="cart-data">{cartItemCount} Item{cartItemCount !== 1 ? 's' : ''}</Link>
                    </div>
                    <div>
                      <hr className="dropdown-divider dark:border-white/10" />
                    </div>
                    <ul className="list-none mb-0" id="header-cart-items-scroll">
                      {cartItems.map((idx) => (
                        <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder ${idx.class}`} key={Math.random()}>
                          <div className="flex items-start cart-dropdown-item">

                            <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}${idx.src}`} alt="img"
                              className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3" />

                            <div className="grow">
                              <div className="flex items-start justify-between mb-0">
                                <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                  <Link href="#!">{idx.name}</Link>
                                </div>

                                <div className="inline-flex">
                                  <span className="text-black mb-1 dark:text-white !font-medium">{idx.price}</span>
                                  <Link aria-label="anchor" href="#!" className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" onClick={(event) => handleRemove(idx.id)}><i
                                    className="ti ti-trash"></i></Link>
                                </div>
                              </div>
                              <div className="min-w-fit flex  items-start justify-between">
                                <ul className="header-product-item dark:text-white/50 flex">
                                  <li>{idx.color}</li>
                                  <li>{idx.text}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header