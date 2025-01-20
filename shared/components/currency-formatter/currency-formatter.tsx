import {FC} from 'react'

interface Props{
  amount:number;
  currency?:string;
  locale?:string;
  isDecimalNumber?:boolean
}
const CurrencyFormatter:FC<Props>= ({amount,currency='EUR',locale, isDecimalNumber=true}) => {

  const options:Intl.NumberFormatOptions = {style:'currency',currency};
  if(!isDecimalNumber){
    options.minimumFractionDigits=0;
  }
  return new Intl.NumberFormat(locale,options).format(amount);
  
}
export default CurrencyFormatter