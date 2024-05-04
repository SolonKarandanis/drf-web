import Link from "next/link";
import React, {
DetailedHTMLProps,
HTMLAttributes,
HtmlHTMLAttributes,
ImgHTMLAttributes,
ReactNode
} from "react";
  
interface CardProps {
    children: ReactNode;
}

const Card= ({ children }: CardProps) => {
  return (
    <div className="xxl:col-span-3 xl:col-span-6 
        lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box product-card">
            <div className="box-body">
                {children}
            </div>
        </div>
    </div>
  )
}

Card.Image = Image;
Card.IconSection = IconSection;
Card.Title = Title;
Card.Description = Description;
Card.Price = Price;

export default Card


function Image({src,className,...props}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    return (
        <Link href="/components/pages/ecommerce/product-details/" 
            className="product-image">
            <img src={src} 
                className="card-img mb-3 rounded-md"
                alt="..." 
                {...props}/>
        </Link>
    );
}


function IconSection({children,className,...props}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>){
    return (
        <div className="product-icons" {...props}>
            {children}
        </div>
    )
}

IconSection.Icon=Icon;

function Icon({children,className,...props}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>){
  return (
    <Link aria-label="anchor" href="/components/pages/ecommerce/wishlist/" className={className}>
      {children}
    </Link>
  )
}

function Title({
    title,
    className,
    children,
    ...props
}: DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>) {
    return (
        <p className="product-name font-semibold mb-0 flex items-center 
            justify-between" {...props}>
            {title}
            {children}
        </p>
    );
}

Title.Rating=Rating;

function Rating({
    className,
    children,
    ...props
}:DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,HTMLSpanElement>){
    return(
        <span className="ltr:float-right rtl:float-left text-warning text-xs">
            {children}
            <i className="ri-star-s-fill align-middle ms-1 inline-block"></i>
        </span>
    )
}

function Description({
    className,
    children,
    ...props
}: DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>) {
    return (
        <p className="product-description text-[.6875rem] text-[#8c9097] dark:text-white/50 mb-2" {...props}>
            {children}
        </p>
    );
}

function Price({
    className,
    children,
    ...props
  }: DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>) {
    return (
      <p  className="mb-1 font-semibold text-[1rem] flex items-center justify-between" 
        {...props}>
          {children}
      </p>
    );
  }
  
  function Button({
    className,
    children,
    ...props
  }: DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>) {
    return (
      <button
        className={
          className +
          " transition duration-75 bg-violet-600 text-white p-2 w-full hover:bg-violet-700 active:translate-y-1"
        }
      >
        {children}
      </button>
    );
  }