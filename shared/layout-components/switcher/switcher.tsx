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
            loader={themeState.loader}

            //Styles
            style={style}
        ></html>
      </Helmet>
      <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
        
      </div>
    </HelmetProvider>
   </>
  )
}

export default Switcher