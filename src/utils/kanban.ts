import { Kanban } from "types/kanban";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic";
import { SortProps } from "types/SortProps";

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

//删除看板
export const useDeleteKanban=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation(({id}:{id:number})=>client('kanbans/${id}',{method:'DELETE'}),
    useDeleteConfig(queryKey))
}

//拖拽看板持久化
export const useReorderKanban=(queryKey:QueryKey)=>{
    const client = useHttp();
    return useMutation((params: SortProps) => {
        return client("kanbans/reorder", {
          data: params,
          method: "POST",
        });
      },useReorderKanbanConfig(queryKey));

    
}