"use client"

import { useGetProductSearchResults } from "../hooks/useGetProductSearchResults";
import { Button } from "@/shared/shadcn/components/ui/button";
import ButtonLoading from "@/shared/components/button-loading/button-loading";
import { MouseEvent } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductSearchRequest } from "@/models/search.models";


const Pagination = () => {
  const {
    isLoading,
    count,
    next,
    previous,
    searchProducts,
  } = useGetProductSearchResults();
  const {query,page,size,setPage} = useProductFilters();
  

  const handlePrevious = (event:MouseEvent<HTMLButtonElement>) =>{
    const newPage = page-1
    setPage(newPage);
    const request:ProductSearchRequest={
      query,
      paging:{
          page:Number(newPage),
          limit:Number(size),
      }
    };
    searchProducts(request);
  }

  const handleNext = (event:MouseEvent<HTMLButtonElement>) =>{
    const newPage = page+1
    setPage(newPage);
    const request:ProductSearchRequest={
      query,
      paging:{
          page:Number(newPage),
          limit:Number(size),
      }
    };
    searchProducts(request);
  }

  return (
    <ul className="ti-pagination !px-3 !py-[0.375rem] !text-[1rem] !mb-4 flex justify-end gap-5">
        <li className="page-item disabled">
          <Button 
              type="submit" 
              variant="outline"
              disabled={!previous || isLoading}
              className="!px-3 !py-[0.375rem]"
              onClick={handlePrevious}>
              {isLoading ? 
                  <ButtonLoading /> : 
                  <>Previous</>
              }
          </Button>
        </li>
        <li className="page-item">
          <Button 
              type="submit" 
              variant="outline"
              disabled={!next || isLoading}
              className="!px-3 !py-[0.375rem]"
              onClick={handleNext}>
              {isLoading ? 
                  <ButtonLoading /> : 
                  <>Next</>
              }
          </Button>
        </li>
    </ul>
  )
}

export default Pagination