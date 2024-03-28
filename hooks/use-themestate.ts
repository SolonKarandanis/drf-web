import { useAppSelector } from "@/shared/redux/hooks";

export const useThemeState=()=>{
    const themeState = useAppSelector(state => state.theme);

    return [themeState]
}