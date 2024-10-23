import { useState } from "react";

export function useMutateSocialNetworks(){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return {
        isEdit,
        isLoading
    }
}