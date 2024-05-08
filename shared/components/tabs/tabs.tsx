import {
    ReactElement,
    Children, 
    cloneElement, 
    DetailedHTMLProps,
    useState,
    HTMLAttributes,
    ButtonHTMLAttributes,
} from 'react'

interface Props{
    children:ReactElement[],
}

const Tabs = ({children}:Props) =>{
    const [activeIndex, setActiveIndex] = useState(0);

    const newChildren = Children.map(children, (child, index) => {
        if (child.type.displayName === 'TabPanel') {
          return cloneElement(child, { isActive: index === activeIndex });
        } else if (child.type.displayName === 'TabList') {
          return cloneElement(child, { setActiveIndex, activeIndex });
        } else {
          return child;
        }
    });
    
    return <div>{newChildren}</div>;
}

Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;

export default Tabs

interface TabListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    activeIndex:number;
    setActiveIndex:(index:number)=>void;
    children:ReactElement[];
}

function TabList(
{ 
    children,
    setActiveIndex,
    activeIndex,
    ...props 
}:TabListProps){
    return (
        <div {...props}>
            {Children.map(children, (child, index) =>
                cloneElement(child, {
                    isActive: index === activeIndex,
                    onClick: () => setActiveIndex(index),
                })
            )}
        </div>
    )
}
TabList.Tab = Tab;
TabList.displayName = 'TabList';

interface TabProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    isActive:boolean;
}

function Tab({ isActive, onClick, children }:TabProps){
    return(
        <button 
            className={isActive ? 'active' : ''} 
            onClick={onClick}>
        {children}
        </button>
    )
}

Tab.displayName = 'Tab';


interface TabPanelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    isActive:boolean;
}

function TabPanel({ isActive, children }:TabPanelProps){
    return (
        <>
            {isActive ? <div>{children}</div> : null}
        </>
    )
}
TabPanel.displayName = 'TabPanel';


{/* <Tabs>
    <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
    </TabList>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
    <TabPanel>Content 3</TabPanel>
</Tabs> */}