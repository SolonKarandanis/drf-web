"use client"

import { useGetProductSearchResults } from "../hooks/useGetProductSearchResults";
import { Button } from "@/shared/shadcn/components/ui/button";
import ButtonLoading from "@/shared/components/button-loading/button-loading";
import { MouseEvent } from "react";


const Pagination = () => {
  const {
    handleGetSearchResults,
    isLoading
  } = useGetProductSearchResults();

  const handlePrevious = (event:MouseEvent<HTMLButtonElement>) =>{

  }

  const handleNext = (event:MouseEvent<HTMLButtonElement>) =>{

  }

  return (
    <ul className="ti-pagination !px-3 !py-[0.375rem] !text-[1rem] !mb-4 flex justify-end gap-5">
        <li className="page-item disabled">
          <Button 
              type="submit" 
              variant="outline"
              disabled={isLoading}
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
              disabled={isLoading}
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