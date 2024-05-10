"use client";

import { 
    useState, 
    useContext, 
    createContext, 
    ReactNode
} from "react";
import { 
    Container,
    Inner,
    Item,
    Body,
    Wrapper,
    Title,
    Header
} from "./accordion.styles";

interface ToggleProps{
    toggleShow: boolean; 
    toggleIsShown: (isShown: boolean) => void; 
}

const ToggleContext = createContext<ToggleProps>({
    toggleShow:false,
    toggleIsShown(isShown) {},
});
interface AccordionProps{
    children:ReactNode
}

function Accordion({ 
    children, 
    ...restProps 
}:AccordionProps) {
    return (
      <Container {...restProps}>
        <Inner>{children}</Inner>
      </Container>
    );
}

Accordion.Title = AccordionTitle;
Accordion.Wrapper = AccordionWrapper;

export default Accordion;


interface AccordionTitleProps{
    children:ReactNode
}

function AccordionTitle({ 
    children, 
    ...restProps 
}:AccordionTitleProps) {
    return <Title {...restProps}>{children}</Title>;
};

interface AccordionWrapperProps{
    children:ReactNode
}

function AccordionWrapper({ 
    children, 
    ...restProps 
}:AccordionWrapperProps) {
    return <Wrapper {...restProps}>{children}</Wrapper>;
};

interface AccordionItemProps{
    children:ReactNode
}

Accordion.Item = function AccordionItem({ 
    children, 
    ...restProps 
}:AccordionItemProps) {
    const [toggleShow, setToggleShow] = useState(true);
    const toggleIsShown = (isShown:boolean) => setToggleShow(!isShown);
    return (
      <ToggleContext.Provider value={{ toggleShow, toggleIsShown }}>
        <Item {...restProps}>{children}</Item>
      </ToggleContext.Provider>
    );
};

interface AccordionItemHeaderProps{
    children:ReactNode
}

Accordion.ItemHeader = function AccordionHeader({ 
    children, 
    ...restProps 
}:AccordionItemHeaderProps) {
    const { toggleIsShown,toggleShow} = useContext(ToggleContext);
    return (
      <Header onClick={() => toggleIsShown(toggleShow)} {...restProps}>
        {children}
      </Header>
    );
};

interface AccordionBodyProps{
    children:ReactNode
}

Accordion.Body = function AccordionBody({ 
    children, 
    ...restProps 
}:AccordionBodyProps) {
    const { toggleShow } = useContext(ToggleContext);
    return (
      <Body className={toggleShow ? "open" : ""} {...restProps}>
        <span>{children}</span>
      </Body>
    );
};

