import { FC,useEffect} from 'react'

export interface Props{
    hasUnsavedChanges:boolean; 
}

const FormPrompt:FC<Props> = ({hasUnsavedChanges}) => {
    useEffect(() => {
        const onBeforeUnload = (e:BeforeUnloadEvent) => {
          if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = "";
          }
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => {
          window.removeEventListener("beforeunload", onBeforeUnload);
        };
      }, [hasUnsavedChanges]);
      return null;
}

export default FormPrompt