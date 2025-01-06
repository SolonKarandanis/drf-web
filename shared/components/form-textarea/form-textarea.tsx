import { FC, PropsWithChildren } from "react"
import { TextAreaProps } from "../props"
import FormLabel from "../form-label/form-label";
import { twMerge } from "tailwind-merge";
import FormError from "../form-error/form-error";


const FormTextArea:FC<PropsWithChildren<TextAreaProps>> = ({
  name,
  error,
  disabled,
  required=false,
  loading=false,
  className='',
  sectionClassName='',
  props,
  children,
  ...rest
}) => {
  const hasError = error? true:false;
  const labelHtml = children ? (
      <FormLabel 
          name={name}
          required={required}
          hasError={hasError}>
          {children}
      </FormLabel>
  ):null;

  const defaultStyles = `block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500
  `;

  const disabledCss =" cursor-not-allowed ";

  const inputCss = disabled ? `${defaultStyles} ${disabledCss}`: `${defaultStyles}`;

  const errorHtml = error ? (<FormError error={error} />) : null;

  return (
    <section className={sectionClassName}>
      {labelHtml}
      <textarea 
        className={twMerge(inputCss,className)}
        aria-invalid={error ? "true" : "false"}
        {...(props ?? {})}
        {...rest}>
      </textarea>
      {errorHtml}
    </section>
  )
}

export default FormTextArea