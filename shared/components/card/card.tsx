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
    <div className="col-span-12 xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12">
        <div className="box product-card xxxl:max-h-[490px] xxxl:min-h-[490px] xxl:max-h-[350px] xxl:min-h-[350px]">
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

interface CardImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  href:string;
}


function Image({href,src,className,...props}: CardImageProps) {
    return (
        <Link href={href} 
            className="product-image">
            <img src={src} 
                className="mb-3 rounded-md card-img"
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

interface CardIconProps extends  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{
  href:string;
}

function Icon({href,children,className,...props}: CardIconProps){
  return (
    <Link aria-label="anchor" href={href} className={className}>
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
        <p className="flex items-center justify-between mb-0 font-semibold product-name" {...props}>
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
        <span className="text-xs ltr:float-right rtl:float-left text-warning">
            {children}
            <i className="inline-block align-middle ri-star-s-fill ms-1"></i>
        </span>
    )
}

function Description({
    className,
    children,
    ...props
}: DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>) {
    return (
        <p className="product-description text-[.6875rem] text-[#8c9097] dark:text-white/50 mb-2 line-clamp-2" {...props}>
            {children}
        </p>
    );
}

interface CardPriceProps extends  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
  price:number;
  oldPrice?:number;
  discount?:number;
}

function Price({
    price,
    oldPrice,
    discount,
    className,
    children,
    ...props
  }: CardPriceProps) {
    return (
      <p  className="mb-1 font-semibold text-[1rem] flex items-center justify-between" 
        {...props}>
          <span>
            {price}
            {oldPrice && (
              <span className="text-[#8c9097] dark:text-white/50 line-through ms-1 inline-block opacity-[0.6]">
                {oldPrice}
              </span>
            )}
          </span>
          {discount && (
            <span className="badge bg-secondary/10 text-sky-600 ltr:float-right rtl:float-left text-[0.625rem]">
              {discount}% off
            </span>
          )}
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