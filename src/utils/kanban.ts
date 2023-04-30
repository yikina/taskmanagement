import { Kanban } from "types/kanban";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic";

//获取看板列表
export const useKanban=(param?:Partial<Kanban>)=>{
    const client=useHttp();
    return useQuery<Kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}));
}

//创建看板
export const useAddKanban=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation((params:Partial<Kanban>)=>client('kanbans',{data:params,method:'POST'}),
    useAddConfig(queryKey))
    
}