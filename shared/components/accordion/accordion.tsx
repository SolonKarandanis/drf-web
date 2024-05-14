"use client";

import { 
    useState, 
    useContext, 
    createContext, 
    ReactNode,
    PropsWithChildren
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

function Accordion({ children, ...restProps }: PropsWithChildren) {
    return (
      <Container {...restProps}>
        <Inner>{children}</Inner>
      </Container>
    );
}

Accordion.Title = AccordionTitle;
Accordion.Wrapper = AccordionWrapper;

export default Accordion;

function AccordionTitle({ children, ...restProps }: PropsWithChildren) {
    return <Title {...restProps}>{children}</Title>;
};

function AccordionWrapper({ children, ...restProps }: PropsWithChildren) {
    return <Wrapper {...restProps}>{children}</Wrapper>;
};


Accordion.Item = function AccordionItem({ children, ...restProps }: PropsWithChildren) {
    const [toggleShow, setToggleShow] = useState(true);
    const toggleIsShown = (isShown:boolean) => setToggleShow(!isShown);
    return (
      <ToggleContext.Provider value={{ toggleShow, toggleIsShown }}>
        <Item {...restProps}>{children}</Item>
      </ToggleContext.Provider>
    );
};

Accordion.ItemHeader = function AccordionHeader({ children, ...restProps }: PropsWithChildren) {
    const { toggleIsShown,toggleShow} = useContext(ToggleContext);
    return (
      <Header onClick={() => toggleIsShown(toggleShow)} {...restProps}>
        {children}
      </Header>
    );
};

Accordion.Body = function AccordionBody({ children, ...restProps }: PropsWithChildren) {
    const { toggleShow } = useContext(ToggleContext);
    return (
      <Body className={toggleShow ? "open" : ""} {...restProps}>
        <span>{children}</span>
      </Body>
    );
};

