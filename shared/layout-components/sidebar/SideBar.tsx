import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import {useState, useEffect, useCallback} from 'react'
import { connect } from "react-redux";
import MenuItems, { Item } from "./nav";

let history = [];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);
  const [menuitems, setMenuitems] = useState(MenuItems);

  //  In Horizontal When we click the body it should we Closed
  const mainContentClickFn = useCallback(()=>{
    if (
			themeState.dataNavLayout === "horizontal" &&
			window.innerWidth >= 992
		) {
			clearMenuActive();
		}
  },[themeState.dataNavLayout]);

  const setSidemenu = useCallback((list?:Item)=>{
    let dd = list ? list.path + "" : location.pathname;
		if (menuitems) {
			menuitems.filter(mainlevel => {
				if (mainlevel.Items) {
					mainlevel.Items.filter((items) => {
						items.active = false;
						items.selected = false;

						if (dd === "") {
							dd = "/dashboards/crm/";
						}
						if (dd === items.path + "") {
							items.active = true;
							items.selected = true;
						}
						if (items.children) {
							items.children.filter(submenu => {
								submenu.active = false;
								submenu.selected = false;
								if (dd === submenu.path + "") {
									items.active = true;
									items.selected = true;
									submenu.active = true;
									submenu.selected = true;
								}
								if (submenu.children) {
									submenu.children.filter((submenu1) => {
										submenu1.active = false;
										submenu1.selected = false;
										if (dd === submenu1.path + "") {
											items.active = true;
											items.selected = true;
											submenu.active = true;
											submenu.selected = true;
											submenu1.active = true;
											submenu1.selected = true;
										}
										return submenu1;
									});
								}
								return submenu;
							});
						}
						return items;
					});
				}
				setMenuitems(arr => [...arr]);
				return mainlevel;
			});
		}

		if (localStorage.getItem("ynexverticalstyles") == "icontext") {
		}
		if (themeState.dataVerticalStyle == "doublemenu") {
		}
  },[menuitems,themeState.dataVerticalStyle])

  useEffect(() => {
      history.push(location.pathname);  // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth  calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history       
      if (history.length > 2) {
        history.shift();
      }
      if (history[0] !== history[1]) {
        setSidemenu();
      }
      let mainContent = document.querySelector(".main-content");
      mainContent?.addEventListener("click", mainContentClickFn);
      return () => {
        mainContent?.removeEventListener("click", mainContentClickFn);
      };

	}, [setSidemenu,mainContentClickFn]);

  useEffect(() => {
		if (
			themeState.dataNavLayout == "horizontal" &&
			window.innerWidth >= 992
		) {
			clearMenuActive();

		}
	}, [themeState.dataNavLayout]);

  

  function clearMenuActive() {
		MenuItems.filter((mainlevel) => {
			if (mainlevel.Items) {
				mainlevel.Items.filter((sublevel) => {
					sublevel.active = false;
					if (sublevel.children) {
						sublevel.children.filter((sublevel1) => {
							sublevel1.active = false;
							if (sublevel1.children) {
								sublevel1.children.filter((sublevel2) => {
									sublevel2.active = false;
									return sublevel2;
								});
							}
							return sublevel1;
						});
					}
					return sublevel;
				});
			}
			return mainlevel;
		});
		setMenuitems((arr) => [...arr]);
	}

  function toggleSidemenu(item:Item) {
		{
			// To show/hide the menu
			if (!item.active) {
				menuitems.filter(mainlevel => {
					if (mainlevel.Items) {
						mainlevel.Items.filter((sublevel) => {
							sublevel.active = false;
							if (item === sublevel) {
								sublevel.active = true;
							}
							if (sublevel.children) {
								sublevel.children.filter((sublevel1) => {
									sublevel1.active = false;
									if (item === sublevel1) {
										sublevel.active = true;
										sublevel1.active = true;
									}
									if (sublevel1.children) {
										sublevel1.children.filter((sublevel2) => {
											sublevel2.active = false;
											if (item === sublevel2) {
												sublevel.active = true;
												sublevel1.active = true;
												sublevel2.active = true;
											}
											if (sublevel2.children) {
												sublevel2.children.filter(sublevel3 => {
													sublevel3.active = false;
													if (item === sublevel3) {
														sublevel.active = true;
														sublevel1.active = true;
														sublevel2.active = true;
														sublevel3.active = true;
													}
													return sublevel2;
												});
											}
											return sublevel2;
										});
									}
									return sublevel1;
								});
							}
							return sublevel;
						});
					}
					return mainlevel;
				});
			}
			else {
				if (localStorage.ynexverticalstyles != 'doublemenu') {
					item.active = !item.active;
				}
			}
		}
		if (localStorage.ynexverticalstyles === 'doublemenu' && themeState.dataToggled !== 'double-menu-open') {
			dispatch(ThemeChanger({ ...themeState, "dataToggled": "double-menu-open" }));
		}
		setMenuitems((arr) => [...arr]);
	}

  function Onhover() {
		if ((themeState.dataToggled == "icon-overlay-close" || themeState.dataVerticalStyle == "detached") && themeState.iconOverlay != "open") {
			dispatch(ThemeChanger({ ...themeState, "iconOverlay": "open" }));
		}
	}
	function Outhover() {
		if ((themeState.dataToggled == "icon-overlay-close" || themeState.dataVerticalStyle == "detached") && themeState.iconOverlay == "open") {
			dispatch(ThemeChanger({ ...themeState, "iconOverlay": "" }));
		}
	}
	function Clickhandelar() {
		if (localStorage.getItem("ynexverticalstyles") == "icontext") {
			dispatch(ThemeChanger({ ...themeState, "iconText": "open" }));
		}

	}

  let MenuOpen = () => {
		let MainContent = document.querySelector(".main-content");
		if (themeState.dataVerticalStyle == "icontext" && themeState.iconText != "open") {
			dispatch(ThemeChanger({ ...themeState, "iconText": "open" }));
			MainContent?.addEventListener("click", (_event) => {
				dispatch(ThemeChanger({ ...themeState, "iconText": "" }));
			});
		}

	};

  function menuClose() {
    const element =document.querySelector("html");
    if(element){
      if (element.getAttribute('data-toggled') == 'open', 'menu-click-closed', "menu-hover-closed", "icon-hover-closed", "icon-hover-closed" || element.getAttribute('data-toggled') == '') {
        if (window.innerWidth <= 992) {
          dispatch(ThemeChanger({ ...themeState, dataToggled: 'close' }));
        }
        const overlayElement = document.querySelector("#responsive-overlay");
        if (overlayElement) {
          overlayElement.classList.remove("active");
        }
      }
    }
	}

  return (
    <div>SideBar</div>
  )
}

export default SideBar