import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { Project } from "types/Project";
import ProjectListPage from "pages/ProjectListPage";

export const useConfig=(queryKey:QueryKey,callback:(target:any,old?:any[])=>any[]) =>{
    const queryClient=useQueryClient();
    return {
        onSuccess:()=>{queryClient.invalidateQueries(queryKey)},
        async onMutate(target:any){
            const previousValue=queryClient.getQueryData<Project[]>(queryKey);
            queryClient.setQueryData<Project[]>(queryKey,(old?:any[])=>{
                return callback(target,old)
            }
    )
    return {previousValue}

},onError(error:any,newValue:any,context:any){
    queryClient.setQueryData<Project[]>(queryKey,context.previousValue)
}
    
}
}

export const useDeleteConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target:any,old?:any[])=>old?.filter(project=>project.id!==target.id)||[]);
export const useEditConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target:any,old?:any[])=>old?.map(project=>project.id===target.id?{...project,...target}:project)||[]);
export const useAddConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target:any,old?:any[])=>old?[...old,...target]:[]);