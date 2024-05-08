import {
  ReactElement,
  Children, 
  cloneElement, 
  DetailedHTMLProps, 
  LiHTMLAttributes
} from 'react'

interface Props{
  children:ReactElement[],
  isOrdered:boolean,
}

const List= ({children,isOrdered}:Props) => {
  const listItems = Children.map(children,child =>
    cloneElement(child,{isOrdered})
  )
  
  return isOrdered ? <ol>{listItems}</ol> : <ul>{listItems}</ul>;
}

List.ListItem = ListItem;

export default List

interface ListItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>{
  isOrdered?:boolean,
}

function ListItem(
  { 
    children,
    isOrdered,
    ...props 
  }:ListItemProps){
  return (
    <li className={isOrdered ? 'ordered' : 'unordered'}>{children}</li>
  )

}