import { Kanban } from "types/kanban";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";

//获取看板列表
export const useKanban=(param?:Partial<Kanban>)=>{
    const client=useHttp();
    return useQuery<Kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}));
}