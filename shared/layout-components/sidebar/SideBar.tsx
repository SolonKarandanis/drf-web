import { Fragment, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import {useState, useEffect, useCallback} from 'react'
import { usePathname,useRouter } from 'next/navigation';
import MenuItems, { Item } from "./nav";
import Link from 'next/link';
import Image from "next/image";
import { basePath } from '@/next.config';
import SimpleBar from 'simplebar-react';

let history = [];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  
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
    let dd = list ? list.path + "" : pathname;
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
  },[menuitems,themeState.dataVerticalStyle,pathname])

  useEffect(() => {
      history.push(pathname);  // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth  calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history       
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

	}, [setSidemenu,mainContentClickFn,pathname]);

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

  const menuClose = useCallback(()=>{
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
  },[dispatch,themeState]);


  useEffect(() => {
		const mainContent = document.querySelector(".main-content");
		if (window.innerWidth <= 992) {
			if (mainContent) {
				mainContent.addEventListener("click", menuClose);
				menuClose();
			}
		} else {
			if (mainContent) {
				mainContent.removeEventListener("click", menuClose);
			}
		}
		window.addEventListener("resize", () => {
			const mainContent = document.querySelector(".main-content");
			setTimeout(() => {
				if (window.innerWidth <= 992) {
					if (mainContent) {
						mainContent.addEventListener("click", menuClose);
						menuClose();
					}
				} else {
					if (mainContent) {
						mainContent.removeEventListener("click", menuClose);
						menuClose();
					}
				}
			}, 100);
		});
	}, [menuClose]);

  function switcherArrowFn() {
		// used to remove is-expanded class and remove class on clicking arrow buttons
		function slideClick() {
			const slide = document.querySelectorAll<HTMLElement>(".slide");
			const slideMenu = document.querySelectorAll<HTMLElement>(".slide-menu");
			slide.forEach((element) => {
				if (element.classList.contains("is-expanded") == true) {
					element.classList.remove("is-expanded");
				}
			});
			slideMenu.forEach((element) => {
				if (element.classList.contains("open") == true) {
					element.classList.remove("open");
					element.style.display = "none";
				}
			});
		}

		slideClick();
	}

  function slideRight() {
		const menuNav = document.querySelector<HTMLElement>(".main-menu");
		const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

		if (menuNav && mainContainer1) {
			const marginLeftValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
			);
			const marginRightValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
			);
			const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
			let mainContainer1Width = mainContainer1.offsetWidth;

			if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
				if (!(themeState.dir === "rtl")) {
					if (Math.abs(check) > Math.abs(marginLeftValue)) {
						menuNav.style.marginInlineEnd = "0";

						if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
							const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";

						const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
						if (slideRightButton) {
							slideRightButton.classList.remove("hidden");
						}
					}
				} else {
					if (Math.abs(check) > Math.abs(marginRightValue)) {
						menuNav.style.marginInlineEnd = "0";

						if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
							const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";

						const slideLeftButton = document.querySelector<HTMLElement>("#slide-left");
						if (slideLeftButton) {
							slideLeftButton.classList.remove("hidden");
						}
					}
				}
			}

			const element = document.querySelector<HTMLElement>(".main-menu > .slide.open");
			const element1 = document.querySelector<HTMLElement>(".main-menu > .slide.open > ul");
			if (element) {
				element.classList.remove("active");
			}
			if (element1) {
				element1.style.display = "none";
			}
		}

		switcherArrowFn();
	}

  function slideLeft() {
		const menuNav = document.querySelector<HTMLElement>(".main-menu");
		const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

		if (menuNav && mainContainer1) {
			const marginLeftValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
			);
			const marginRightValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
			);
			const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
			let mainContainer1Width = mainContainer1.offsetWidth;

			if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
				if (!(themeState.dir === "rtl")) {
					if (Math.abs(check) <= Math.abs(marginLeftValue)) {
						menuNav.style.marginInlineStart = "0px";
					}
				} else {
					if (Math.abs(check) > Math.abs(marginRightValue)) {
						menuNav.style.marginInlineStart = "0";

						if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
							const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";

						const slideLeftButton = document.querySelector<HTMLElement>("#slide-left");
						if (slideLeftButton) {
							slideLeftButton.classList.remove("hidden");
						}
					}
				}

			}

			const element = document.querySelector<HTMLElement>(".main-menu > .slide.open");
			const element1 = document.querySelector<HTMLElement>(".main-menu > .slide.open > ul");
			if (element) {
				element.classList.remove("active");
			}
			if (element1) {
				element1.style.display = "none";
			}
		}

		switcherArrowFn();
	}

  const noChild = () => {
		if (localStorage.ynexverticalstyles == 'doublemenu') {
			dispatch(ThemeChanger({ ...themeState, "dataToggled": "double-menu-close" }));
		}
	};

  useEffect(() => {
		const pages = () => {
			if (window.scrollY > 30 && document.querySelector(".app-sidebar")) {
				let Scolls = document?.querySelectorAll(".sticky");
				Scolls.forEach((e) => {
					e.classList.add("sticky-pin");
				});
			} else {
				let Scolls = document?.querySelectorAll(".sticky");
				Scolls.forEach((e) => {
					e.classList.remove("sticky-pin");
				});
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", pages);
		}
	});

	const handleClick = (e:MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		console.log(e)
		e.preventDefault()
		// router.push(href)
	}


  return (
    <>
		<aside 
			className="app-sidebar sticky" 
			id="sidebar" 
			onMouseOver={() => Onhover()} 
			onMouseLeave={() => Outhover()} >
			<div className="main-sidebar-header">
				<Link href="/components/dashboards/crm/" className="header-logo">
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`}
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo desktop-logo"/>
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} 
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo toggle-logo"/>
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} 
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo desktop-dark"/>
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} 
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo toggle-dark"/>
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} 
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo desktop-white"/>
					<Image
						alt="logo"
						src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`}
						width={700}
						height={475}
						sizes="100vw"
						className="main-logo toggle-white"/>
				</Link>
			</div>
			<SimpleBar className="main-sidebar " id="sidebar-scroll">
				<nav className="main-menu-container nav nav-pills flex-column sub-open">
					<div className="slide-left" id="slide-left" onClick={() => { slideLeft(); }}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24"
							height="24" viewBox="0 0 24 24">
							<path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
						</svg>
					</div>
					<ul className="main-menu">
						{menuitems.map((firstlayer) =>
							<Fragment key={Math.random()}>
								{firstlayer.menutitle ? <li className="slide__category">
									<span className="category-name">{firstlayer.menutitle}</span>
								</li> : ""}
								{firstlayer.Items.map((secondlayer) =>
									secondlayer.type === "link" ?
										<li className={`slide ${secondlayer.active ? "active" : ""}`} key={Math.random()} >
											<a onClick={(_event) => { setSidemenu(secondlayer); noChild(); handleClick("/")}} href={secondlayer.path + "/"} className={`side-menu__item ${secondlayer.selected ? "active" : ""}`}>{secondlayer.icon} <span className="side-menu__label">{secondlayer.title} {secondlayer.badgetxt ? (
												<span className={secondlayer.class}>
													{secondlayer.badgetxt}
												</span>
											) : (
												""
											)}</span></a>
										</li>
										: secondlayer.type === "sub" ?
											<li className={`slide has-sub ${secondlayer.active ? "open" : ""}`} key={Math.random()} onClick={() => MenuOpen()}>
												<a href="#!" className={`side-menu__item ${secondlayer.selected ? "active" : ""}`}
													onClick={(event) => { event.preventDefault(); toggleSidemenu(secondlayer); }}>
													{secondlayer.icon}
													<span className="side-menu__label">{secondlayer.title}
														{secondlayer.badgetxt ? (
															<span className={secondlayer.class}>
																{secondlayer.badgetxt}
															</span>
														) : (
															""
														)}
													</span>
													<i className="angle fe fe-chevron-right side-menu__angle"></i></a>
												<ul
													className={`slide-menu child1 ${secondlayer.active ? "active" : ""}
													${secondlayer.active && localStorage.ynexverticalstyles == 'doublemenu' ?
															"double-menu-active" : ""
														}
						`}
													style={
														secondlayer.active
															? { display: "block" }
															: { display: "none" }
													}
												>
													<li className="slide side-menu__label1">
														<a href="">{secondlayer.title}</a>
													</li>
													{secondlayer && secondlayer.children && secondlayer.children.map((thirdlayer) =>
														<Fragment key={Math.random()} >
															{thirdlayer.type === "link" ? <li className={`slide ${thirdlayer.active ? "active" : ""}`}>
																<Link onClick={(event) => { setSidemenu(thirdlayer); }} href={thirdlayer.path + ""} className={`side-menu__item ${thirdlayer.selected ? "active" : ""}`}>
																	{thirdlayer.icon}
																	{thirdlayer.title}
																</Link>
															</li>
																: thirdlayer.type === "sub" ? <li className={`slide has-sub ${secondlayer.active ? "open" : ""}`}>
																	<a href="#!"
																		className={`side-menu__item ${thirdlayer.selected ? "active" : ""}`}
																		onClick={(evnt) => {
																			evnt.preventDefault();
																			toggleSidemenu(thirdlayer);
																			Clickhandelar();

																		}}>{thirdlayer.icon} <span className="">
																			{thirdlayer.title}
																		</span><i className="fe fe-chevron-right side-menu__angle"></i></a>
																	<ul className={`slide-menu child2 ${thirdlayer.active ? "!block" : ""
																		}`}>
																		{thirdlayer && thirdlayer.children && thirdlayer.children.map((fourthlayer) => <Fragment key={Math.random()}>
																			{fourthlayer.type === "link" ?
																				<li className={`slide ${fourthlayer.active ? "active" : ""}`}>
																					<Link onClick={(event) => { setSidemenu(fourthlayer); }} href={fourthlayer.path + ""} className={`side-menu__item ${fourthlayer.selected ? "active" : ""}`}>
																						{fourthlayer.icon}
																						{fourthlayer.title}
																					</Link>
																				</li>
																				: fourthlayer.type === "sub" ? <li className={`slide has-sub ${fourthlayer.active ? "open" : ""}`}>

																					<a href="#!" className="side-menu__item" onClick={(evnt) => {
																						evnt.preventDefault();
																						toggleSidemenu(fourthlayer);

																					}}>{fourthlayer.icon} <span className="">{fourthlayer.title}</span><i className="ri ri-arrow-right-s-line side-menu__angle"></i></a>

																					<ul className={`slide-menu child3 ${fourthlayer.active ? "!block" : ""
																						}`}>
																						{fourthlayer&& fourthlayer.children && fourthlayer.children.map((fivthlayer) => <Fragment key={Math.random()}>
																							{fivthlayer.type === "link" ?
																								<li className="slide">
																									<Link href={fourthlayer.path + ""} className="side-menu__item">
																										{fivthlayer.icon} {fivthlayer.title}</Link>
																								</li> : <a href="#!" className="side-menu__item" onClick={(evnt) => {
																									evnt.preventDefault();
																									toggleSidemenu(fivthlayer);

																								}}>{fivthlayer.icon} <span className="">{fivthlayer.title}</span><i className="ri ri-arrow-right-s-line side-menu__angle"></i></a>
																							}

																						</Fragment>)}

																					</ul>

																				</li> : ""

																			}
																		</Fragment>)}
																	</ul>
																</li> : ""
															}
														</Fragment>
													)}
												</ul>
											</li> : "")
								}
							</Fragment>
						)}
					</ul>
					<div className="slide-right" onClick={() => { slideRight(); }} id="slide-right">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
					</div>
				</nav>
			</SimpleBar>
		</aside>
	</>
  )
}

export default SideBar