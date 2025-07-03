"use client";

export interface MenuItem{
    menutitle:string;
    Items: Item[];
}

export interface Item{
    icon?:JSX.Element;
    badgetxt?:JSX.Element;
    path?:string;
    title:string;
    type:string;
    active:boolean;
    selected:boolean;
    class?:string;
    children?:Item[];
}

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>
const NestedmenuIcon = <i className="bx bx-layer side-menu__icon"></i>

export const MenuItems:MenuItem[] =[
    {
        menutitle: "MAIN", 
        Items: [
            {
                icon: DashboardIcon, 
                title: 'Dashboards', 
                type: "sub", 
                active: false, 
                selected: false,
                children: [
                    {
                        path: "/components/dashboards/crm", 
                        type: "link", 
                        active: false, 
                        selected: false, 
                        title: "CRM" 
                    },
                    {
                        path: `/dashboard`, 
                        type: "link", 
                        active: false, 
                        selected: false, 
                        title: "Custom" 
                    },
                ]
            },
        ]
    },
    {
        menutitle: "Web app", Items: [
            {
				icon: NestedmenuIcon, 
                title: "Users", 
                type: "sub", 
                active: false, 
                selected: false,
                children: 
                [
					{ 
                        title: "Search",
                        path: `/users/search`,
                        type: "link", 
                        active: false, 
                        selected: false 
                    },
                    { 
                        title: "Create User",
                        path: `/users/create`,
                        type: "link", 
                        active: false, 
                        selected: false 
                    },
					
				]
			},
            {
				icon: NestedmenuIcon, 
                title: "Products", 
                type: "sub", 
                active: false, 
                selected: false,
                children: 
                [
					{ 
                        title: "Search",
                        path: `/products/search`,
                        type: "link", 
                        active: false, 
                        selected: false 
                    },
                    { 
                        title: "Create",
                        path: `/products/create`,
                        type: "link", 
                        active: false, 
                        selected: false 
                    },
					
				]
			},
            {
				icon: NestedmenuIcon, 
                title: "Wishlist", 
                type: "link", 
                active: false, 
                selected: false,
                path: `/wishlist`,
			},
        ]
    },
]

export default MenuItems