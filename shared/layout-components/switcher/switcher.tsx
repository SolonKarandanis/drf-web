import { ThemeChanger } from '@/shared/redux/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import{ CSSProperties, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import * as switcherdata from './switcher-data'

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
    switcherdata.LocalStorageBackup(ThemeChanger)
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
                    onClick={() => switcherdata.Dark(ThemeChanger)} />
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

          </div>
        </div>
      </div>
    </HelmetProvider>
   </>
  )
}

export default Switcher