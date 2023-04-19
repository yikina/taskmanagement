import { useQuery ,useMutation,useQueryClient, QueryKey} from "@tanstack/react-query";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useProjectsSearchParam } from "./projectSearchParam";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic";
import { Project } from "types/Project";

export const useProjects=(param?:Partial<Project>)=>{
    const client=useHttp();
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}));
}

export const useEditProject=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation((params:Partial<Project>)=>
    client('projects/${params.id}',{data:params,method:'PATCH'}),
    useEditConfig(queryKey))
}

export const useAddProject=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation((params:Partial<Project>)=>client('projects',{data:params,method:'POST'}),
    useAddConfig(queryKey))
    
}
export const useDeleteProject=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation(({id}:{id:number})=>client('projects/${id}',{method:'DELETE'}),
    useDeleteConfig(queryKey))
}

export const useProject=(id?:number)=>{
    const client=useHttp();
    return useQuery<Project>(['projects',{id}],()=>client('projects/${id}'),{
        enabled:!!id
    })
}