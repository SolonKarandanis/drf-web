import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import {useState, useEffect} from 'react'
import { connect } from "react-redux";
import MenuItems, { Item } from "./nav";

let history = [];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);
  const [menuitems, setMenuitems] = useState(MenuItems);

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

	}, [location,setSidemenu]);

  //  In Horizontal When we click the body it should we Closed
	function mainContentClickFn() {
		if (
			themeState.dataNavLayout === "horizontal" &&
			window.innerWidth >= 992
		) {
			clearMenuActive();

		}
	}
  
  function setSidemenu(list?:Item) {
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
	}

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

  return (
    <div>SideBar</div>
  )
}

export default SideBar