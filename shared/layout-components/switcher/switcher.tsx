import { ThemeChanger } from '@/shared/redux/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import{ CSSProperties, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Themeprimarycolor, * as switcherdata from './switcher-data'

const Switcher = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);
  
  useEffect(() => {
    dispatch(ThemeChanger({
      ...themeState,
      "dir": "ltr",
      "dataNavLayout": "vertical",
      "dataMenuStyles": "dark",
      "dataHeaderStyles": "light",
      "dataToggled": ""
    }))
  }, [dispatch,themeState])

  useEffect(() => {
    switcherdata.LocalStorageBackup(ThemeChanger,dispatch,themeState)
  }, [])

  const style = { 
    "--primary-rgb": themeState.colorPrimaryRgb,
    "--primary": themeState.colorPrimary,
    "--dark-bg": themeState.darkBg,
    "--body-bg": themeState.bodyBg,
    "--input-border": themeState.inputBorder,
    "--light": themeState.Light
  } as CSSProperties;


  return (
   <>
    <HelmetProvider>
      <Helmet>
        <html dir={themeState.dir}
            className={themeState.class}
            data-header-styles={themeState.dataHeaderStyles}
            data-vertical-style={themeState.dataVerticalStyle}
            data-nav-layout={themeState.dataNavLayout}
            data-menu-styles={themeState.dataMenuStyles}
            data-toggled={themeState.dataToggled}
            data-nav-style={themeState.dataNavStyle}
            hor-style={themeState.horStyle}
            data-page-style={themeState.dataPageStyle}
            data-width={themeState.dataWidth}
            data-menu-position={themeState.dataMenuPosition}
            data-header-position={themeState.dataHeaderPosition}
            icon-overlay={themeState.iconOverlay}
            bg-img={themeState.bgImg}
            icon-text={themeState.iconText}

            //Styles
            style={style}
        ></html>
      </Helmet>
      <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
        <div className="ti-offcanvas-header z-10 relative">
          <h5 className="ti-offcanvas-title">
            Switcher
          </h5>
          <button type="button"
            className="ti-btn flex-shrink-0 p-0  transition-none text-defaulttextcolor 
              dark:text-defaulttextcolor/70 hover:text-gray-700 focus:ring-gray-400 
              focus:ring-offset-white  dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            data-hs-overlay="#hs-overlay-switcher">
            <span className="sr-only">Close modal</span>
            <i className="ri-close-circle-line leading-none text-lg"></i>
          </button>
        </div>
        <div className="ti-offcanvas-body !p-0 !border-b dark:border-white/10 z-10 relative !h-auto">
          <div className="flex rtl:space-x-reverse" aria-label="Tabs" role="tablist">
            <button type="button"
              className="hs-tab-active:bg-success/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent 
                text-defaultsize border-0 hs-tab-active:text-success dark:hs-tab-active:bg-success/20 
                dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-success -mb-px bg-white font-semibold 
                text-center  text-defaulttextcolor dark:text-defaulttextcolor/70 rounded-none hover:text-gray-700 
                dark:bg-bodybg dark:border-white/10  active"
              id="switcher-item-1" data-hs-tab="#switcher-1" aria-controls="switcher-1" role="tab">
              Theme Style
            </button>
            <button type="button"
              className="hs-tab-active:bg-success/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent 
                text-defaultsize border-0 hs-tab-active:text-success dark:hs-tab-active:bg-success/20 
                dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-success -mb-px  bg-white font-semibold 
                text-center  text-defaulttextcolor dark:text-defaulttextcolor/70 rounded-none hover:text-gray-700 
                dark:bg-bodybg dark:border-white/10  dark:hover:text-gray-300"
              id="switcher-item-2" data-hs-tab="#switcher-2" aria-controls="switcher-2" role="tab">
              Theme Colors
            </button>
          </div>
        </div>
        <div className="ti-offcanvas-body" id="switcher-body">
          <div id="switcher-1" role="tabpanel" aria-labelledby="switcher-item-1" className="">
            <div className="">
              <p className="switcher-style-head">Theme Color Mode:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme" checked={themeState.class != "dark"} onChange={e => { }}
                    onClick={() => switcherdata.Light(ThemeChanger)} />
                  <label htmlFor="switcher-light-theme"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Light</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme" checked={themeState.class == "dark"} onChange={e => { }}
                    onClick={() => switcherdata.Dark(ThemeChanger,dispatch,themeState)} />
                  <label htmlFor="switcher-dark-theme"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Dark</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Directions:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr" checked={themeState.dir == "ltr"} onChange={e => { }}
                    onClick={() => { switcherdata.Ltr(ThemeChanger); }} />
                  <label htmlFor="switcher-ltr" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">LTR</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl" checked={themeState.dir == "rtl"} onChange={e => { }}
                    onClick={() => { switcherdata.Rtl(ThemeChanger); }} />
                  <label htmlFor="switcher-rtl" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">RTL</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Navigation Styles:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-vertical" checked={themeState.dataNavLayout == "vertical"} onChange={e => { }}
                    onClick={() => switcherdata.Vertical(ThemeChanger)} />
                  <label htmlFor="switcher-vertical"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Vertical</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-horizontal" checked={themeState.dataNavLayout == "horizontal"} onChange={e => { }}
                    onClick={() => switcherdata.HorizontalClick(ThemeChanger)} />
                  <label htmlFor="switcher-horizontal"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Horizontal</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Navigation Menu Style:</p>
              <div className="grid grid-cols-2 gap-2 switcher-style">
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-click"
                    checked={themeState.dataNavStyle == "menu-click"} onChange={e => { }}
                    onClick={() => switcherdata.Menuclick(ThemeChanger)} />
                  <label htmlFor="switcher-menu-click" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Menu
                    Click</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-hover" checked={themeState.dataNavStyle == "menu-hover"} onChange={e => { }}
                    onClick={() => switcherdata.MenuHover(ThemeChanger)} />
                  <label htmlFor="switcher-menu-hover" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Menu
                    Hover</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-click" checked={themeState.dataNavStyle == "icon-click"} onChange={e => { }}
                    onClick={() => switcherdata.IconClick(ThemeChanger)} />
                  <label htmlFor="switcher-icon-click" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Icon
                    Click</label>
                </div>
                <div className="flex">
                  <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-hover" checked={themeState.dataNavStyle == "icon-hover"} onChange={e => { }}
                    onClick={() => switcherdata.IconHover(ThemeChanger)} />
                  <label htmlFor="switcher-icon-hover" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Icon
                    Hover</label>
                </div>
              </div>
              <div className="px-4 text-secondary text-xs"><b className="me-2">Note:</b>Works same for both Vertical and
                Horizontal
              </div>
            </div>
            <div className=" sidemenu-layout-styles">
              <p className="switcher-style-head">Sidemenu Layout Syles:</p>
              <div className="grid grid-cols-2 gap-2 switcher-style">
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-default-menu" checked={themeState.dataVerticalStyle == "default" || themeState.dataVerticalStyle == "overlay"} onChange={e => { }}
                    onClick={() => switcherdata.Defaultmenu(ThemeChanger)} />
                  <label htmlFor="switcher-default-menu"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Default
                    Menu</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-closed-menu" checked={themeState.dataToggled == "close-menu-close"} onChange={e => { }}
                    onClick={() => switcherdata.Closedmenu(ThemeChanger)} />
                  <label htmlFor="switcher-closed-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">
                    Closed
                    Menu</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icontext-menu" checked={themeState.dataToggled == "icon-text-close"} onChange={e => { }}
                    onClick={() => switcherdata.IconText(ThemeChanger)} />
                  <label htmlFor="switcher-icontext-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Icon
                    Text</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icon-overlay" checked={themeState.dataToggled == "icon-overlay-close"} onChange={e => { }}
                    onClick={() => switcherdata.IconOverayFn(ThemeChanger)} />
                  <label htmlFor="switcher-icon-overlay" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Icon Overlay</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-detached" checked={themeState.dataToggled == "detached-close"} onChange={e => { }}
                    onClick={() => switcherdata.DetachedFn(ThemeChanger)} />
                  <label htmlFor="switcher-detached"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Detached</label>
                </div>
                <div className="flex">
                  <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-double-menu" checked={themeState.dataToggled == "double-menu-open"} onChange={e => { }}
                    onClick={() => switcherdata.DoubletFn(ThemeChanger)} />
                  <label htmlFor="switcher-double-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Double
                    Menu</label>
                </div>
              </div>
              <div className="px-4 text-secondary text-xs"><b className="me-2">Note:</b>Navigation menu styles won&apos;t work
                here.
              </div>
            </div>

            <div>
              <p className="switcher-style-head">Page Styles:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-regular" checked={themeState.dataPageStyle == "regular"} onChange={e => { }}
                    onClick={() => switcherdata.Regular(ThemeChanger)} />
                  <label htmlFor="switcher-regular"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Regular</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-classic" checked={themeState.dataPageStyle == "classic"} onChange={e => { }}
                    onClick={() => switcherdata.Classic(ThemeChanger)} />
                  <label htmlFor="switcher-classic"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Classic</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-modern" checked={themeState.dataPageStyle == "modern"} onChange={e => { }} onClick={() => switcherdata.Modern(ThemeChanger)} />
                  <label htmlFor="switcher-modern"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold"> Modern</label>
                </div>
              </div>
            </div>

            <div>
              <p className="switcher-style-head">Layout Width Styles:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex">
                  <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-full-width" checked={themeState.dataWidth == "fullwidth"} onChange={e => { }}
                    onClick={() => switcherdata.Fullwidth(ThemeChanger)} />
                  <label htmlFor="switcher-full-width"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">FullWidth</label>
                </div>
                <div className="flex">
                  <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-boxed" checked={themeState.dataWidth == "boxed"} onChange={e => { }}
                    onClick={() => switcherdata.Boxed(ThemeChanger)} />
                  <label htmlFor="switcher-boxed" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Boxed</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Menu Positions:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex">
                  <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-fixed" checked={themeState.dataMenuPosition == "fixed"} onChange={e => { }}
                    onClick={() => switcherdata.FixedMenu(ThemeChanger)} />
                  <label htmlFor="switcher-menu-fixed"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Fixed</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-scroll" checked={themeState.dataMenuPosition == "scrollable"} onChange={e => { }}
                    onClick={() => switcherdata.ScrollMenu(ThemeChanger)} />
                  <label htmlFor="switcher-menu-scroll"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Scrollable </label>
                </div>
              </div>
            </div>

            <div>
              <p className="switcher-style-head">Header Positions:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex">
                  <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-fixed" checked={themeState.dataHeaderPosition == "fixed"} onChange={e => { }}
                    onClick={() => switcherdata.Headerpostionfixed(ThemeChanger)} />
                  <label htmlFor="switcher-header-fixed" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">
                    Fixed</label>
                </div>
                <div className="flex">
                  <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-scroll" checked={themeState.dataHeaderPosition == "scrollable"} onChange={e => { }}
                    onClick={() => switcherdata.Headerpostionscroll(ThemeChanger)} />
                  <label htmlFor="switcher-header-scroll"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Scrollable
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <p className="switcher-style-head">Loader:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex">
                  <input type="radio" name="page-loader" className="ti-form-radio" checked={themeState.loader == "enable"} id="switcher-loader-enable" onChange={e => { }} onClick={() => switcherdata.Enable(ThemeChanger)} />
                  <label htmlFor="switcher-loader-enable" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">
                    Enable</label>
                </div>
                <div className="flex">
                  <input type="radio" name="page-loader" className="ti-form-radio" id="switcher-loader-disable" onChange={e => { }} checked={themeState.loader == "disable"} onClick={() => switcherdata.Disable(ThemeChanger)} />
                  <label htmlFor="switcher-loader-disable"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Disable
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div id="switcher-2" className="hidden" role="tabpanel" aria-labelledby="switcher-item-2">
            <div className="theme-colors">
              <p className="switcher-style-head">Menu Colors:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-white" type="radio" name="menu-colors"
                    id="switcher-menu-light" onClick={() => switcherdata.LightMenu(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Light Menu
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="menu-colors"
                    id="switcher-menu-dark" onClick={() => switcherdata.DarkMenu(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Dark Menu
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="menu-colors"
                    id="switcher-menu-primary" onClick={() => switcherdata.ColorMenu(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Color Menu
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="menu-colors"
                    id="switcher-menu-gradient" onClick={() => switcherdata.GradientMenu(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Gradient Menu
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio" name="menu-colors"
                    id="switcher-menu-transparent" onClick={() => switcherdata.TransparentMenu(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Transparent Menu
                  </span>
                </div>
              </div>
              <div className="px-4 text-[#8c9097] dark:text-white/50 text-[.6875rem]"><b className="me-2">Note:</b>If you want to change color Menu
                  dynamically
                  change from below Theme Primary color picker.</div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Header Colors:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-white !border" type="radio" name="header-colors"
                    id="switcher-header-light" onClick={() => switcherdata.LightHeader(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Light Header
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="header-colors"
                    id="switcher-header-dark" onClick={() => switcherdata.DarkHeader(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Dark Header
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="header-colors"
                    id="switcher-header-primary" onClick={() => switcherdata.ColorHeader(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Color Header
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="header-colors"
                    id="switcher-header-gradient" onClick={() => switcherdata.GradientHeader(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Gradient Header
                  </span>
                </div>
                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                  <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio"
                    name="header-colors" id="switcher-header-transparent" onClick={() => switcherdata.TransparentHeader(ThemeChanger)} />
                  <span
                    className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                    role="tooltip">
                    Transparent Header
                  </span>
                </div>
              </div>
              <div className="px-4 text-[#8c9097] dark:text-white/50 text-[.6875rem]"><b className="me-2">Note:</b>If you want to change color
                  Header dynamically
                  change from below Theme Primary color picker.</div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Primary:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary"
                    id="switcher-primary" onClick={() => switcherdata.PrimaryColor1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary"
                    id="switcher-primary1" onClick={() => switcherdata.PrimaryColor2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary"
                    id="switcher-primary2" onClick={() => switcherdata.PrimaryColor3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary"
                    id="switcher-primary3" onClick={() => switcherdata.PrimaryColor4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary"
                    id="switcher-primary4" onClick={() => switcherdata.PrimaryColor5(ThemeChanger)} />
                </div>
                <Themeprimarycolor actionfunction={ThemeChanger} />
              </div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Background:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-1" type="radio" name="theme-background"
                    id="switcher-background" onClick={() => switcherdata.BackgroundColor1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-2" type="radio" name="theme-background"
                    id="switcher-background1" onClick={() => switcherdata.BackgroundColor2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-3" type="radio" name="theme-background"
                    id="switcher-background2" onClick={() => switcherdata.BackgroundColor3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-4" type="radio" name="theme-background"
                    id="switcher-background3" onClick={() => switcherdata.BackgroundColor4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-5" type="radio" name="theme-background"
                    id="switcher-background4" onClick={() => switcherdata.BackgroundColor5(ThemeChanger)} />
                </div>
                <switcherdata.Themebackgroundcolor  actionfunction={ThemeChanger} />
              </div>
            </div>
            <div className="menu-image theme-colors">
              <p className="switcher-style-head">Menu With Background Image:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse flex-wrap gap-3">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img1" type="radio" name="theme-images" id="switcher-bg-img" onClick={() => switcherdata.BgImage1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img2" type="radio" name="theme-images" id="switcher-bg-img1" onClick={() => switcherdata.BgImage2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img3" type="radio" name="theme-images" id="switcher-bg-img2" onClick={() => switcherdata.BgImage3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img4" type="radio" name="theme-images" id="switcher-bg-img3" onClick={() => switcherdata.BgImage4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio bgimage-input bg-img5" type="radio" name="theme-images" id="switcher-bg-img4" onClick={() => switcherdata.BgImage5(ThemeChanger)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ti-offcanvas-footer sm:flex justify-between">
            <a href="#!" onClick={() => switcherdata.Reset(ThemeChanger)} id="reset-all" className="w-full ti-btn ti-btn-danger-full m-1">Reset</a> </div>
      </div>
    </HelmetProvider>
   </>
  )
}

export default Switcher