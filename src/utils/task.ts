import { Task } from "types/task";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";

//获取看板列表
export const useTask=(param?:Partial<Task>)=>{
    const client=useHttp();
    return useQuery<Task[]>(['tasks',param],()=>client('tasks',{data:param}));}
