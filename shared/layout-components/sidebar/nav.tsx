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
const badge = <span className="badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2">12</span>

export const MenuItems:MenuItem[] =[
    {
        menutitle: "MAIN", 
        Items: [
            {
                icon: DashboardIcon, 
                badgetxt: badge, 
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
                ]
            },
        ]
    },
    {
        menutitle: "Web app", Items: [
            {
				icon: NestedmenuIcon, 
                title: "Nested Menu", 
                type: "sub", 
                active: false, 
                selected: false,
                children: 
                [
					{ 
                        title: "Nested-1", 
                        path: "", 
                        type: "link", 
                        active: false, 
                        selected: false 
                    },
					{
						title: "Nested-2", 
                        type: "sub", 
                        active: false, 
                        selected: false, 
                        path: ""
			        },
				]
			},
        ]
    },
]

export default MenuItems