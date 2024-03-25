'use client';

import { useEffect, useState} from 'react'
import { useAppDispatch } from '@/shared/redux/hooks';
import { useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";


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
    <div>Header</div>
  )
}

export default Header