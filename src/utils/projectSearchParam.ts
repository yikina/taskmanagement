import { useMemo } from "react";
import { useUrlQueryParam } from "./url";

export const useProjectsSearchParam = () => {
    const [param,setParam]=useUrlQueryParam(['name','personId']);
    return[useMemo(()=>({...param, personId:Number(param.personId)||undefined}),[param]), setParam] as const;
    
}