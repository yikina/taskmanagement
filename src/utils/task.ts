import { Task } from "types/task";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./use-optimistic";

//获取任务列表
export const useTask=(param?:Partial<Task>)=>{
    const client=useHttp();
    return useQuery<Task[]>(['tasks',param],()=>client('tasks',{data:param}));}

//创建任务
export const useAddtask=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation((params:Partial<Task>)=>client('tasks',{data:params,method:'POST'}),
    useAddConfig(queryKey))
    
}
//获取任务详情
export const useTaskDetails=(id?:number)=>{
    const client=useHttp();
    return useQuery<Task>(['tasks',{id}],()=>client('tasks/${id}'),{
        enabled:!!id
    })
}

//编辑任务
export const useEditTask=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation((params:Partial<Task>)=>
    client('tasks/${params.id}',{data:params,method:'PATCH'}),
    useEditConfig(queryKey))
}