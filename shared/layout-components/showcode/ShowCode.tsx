import { useRef, useState,FC,ReactNode,cloneElement,Children, isValidElement } from 'react'


interface Props {
    title: string;
    code:string;
    children:ReactNode;
    customCardClass:string;
    customCardHeaderClass:string;
    customCardBodyClass:string;
    customCardFooterClass:string;
};


const ShowCode:FC<Props> = ({
    title,
    code,
    children,
    customCardClass,
    customCardHeaderClass,
    customCardBodyClass,
    customCardFooterClass
}) => {
    const [showCode, setShowCode] = useState<boolean>(false);
    const randomValueRef = useRef<HTMLDivElement>(null);

    const toggleCode = () => {
        setShowCode(!showCode);
    };


  return (
    <div className={`box ${customCardClass}`}>
      <div className={`box-header justify-content-between ${customCardHeaderClass}`}>
        <div className="box-title" dangerouslySetInnerHTML={{ __html: title }}></div>
        <div className="prism-toggle">
          <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium"  onClick={toggleCode}>Show
                                    Code  <i className={`${showCode ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 align-middle inline-block`}></i></button>
        </div>
      </div>
      <div ref={randomValueRef} className={`box-body ${customCardBodyClass}`} style={{ display: showCode ? 'none' : 'block' }}>
        {Children.map<ReactNode, ReactNode>(children, child => {
            if(isValidElement(child)){
                return cloneElement(child);
            }
        })}
      </div>
      <div className={`box-footer !border-t-0 ${customCardFooterClass}`} style={{ display: showCode ? 'block' : 'none' }}>
        <pre className="language-html">
          <code className="language-html" >{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default ShowCode