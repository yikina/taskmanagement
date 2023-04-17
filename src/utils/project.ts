import { Project } from "components/projectList/List";
import { useQuery ,useMutation,useQueryClient} from "@tanstack/react-query";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useProjectsSearchParam } from "./projectSearchParam";

export const useProjects=(param?:Partial<Project>)=>{
    const client=useHttp();
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}));
}

export const useEditProject=()=>{
    const client=useHttp();
    const queryClient=useQueryClient();
    const [searchParams]=useProjectsSearchParam();
    const queryKey=['projects',searchParams];
    return useMutation((params:Partial<Project>)=>
    client('projects/${params.id}',{data:params,method:'PATCH'}),{
        onSuccess:()=>{queryClient.invalidateQueries(queryKey)},
        async onMutate(target){
            
            const previousValue=queryClient.getQueryData<Project[]>(queryKey);
            queryClient.setQueryData<Project[]>(queryKey,(old?:Project[])=>{
                return old?.map(project=>project.id===target.id?{...project,...target}:project)
            }
    )
    return {previousValue}

},onError(error:Error,newValue:Partial<Project>,context:any){
    queryClient.setQueryData<Project[]>(queryKey,context.previousValue)
}
    
    })
}

export const useAddProject=()=>{
    const client=useHttp();
    const queryClient=useQueryClient();
    return useMutation((params:Partial<Project>)=>client('projects',{data:params,method:'POST'}),{
        onSuccess:()=>{queryClient.invalidateQueries(['projects'])}
    })
    
}

export const useProject=(id?:number)=>{
    const client=useHttp();
    return useQuery<Project>(['projects',{id}],()=>client('projects/${id}'),{
        enabled:!!id
    })
}