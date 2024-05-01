import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    filter:string;
    setFilter:(value:string)=>void
}

export const TableFilter:FC<Props> = ({ filter, setFilter }) => {
    return (
      <span className="ms-auto">
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control !w-auto"
          placeholder="Search..."
        />
      </span>
    );
};