import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTaskDetails } from "utils/task";
import { useUrlQueryParam } from "utils/url";

export const useProjectidInUrl=()=>{
    const url=useLocation();
    const id=url.pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
}
//通过id获取项目信息
export const useProjectInurl=()=>useProject(useProjectidInUrl());
//将 id 转为 key-value格式
export const useKanbanPrarams=()=>({projectId:useProjectidInUrl()});
export const useKanbanQueryKey=()=>['kanbans',useKanbanPrarams()];

export const useTasksSearchParams=()=>{
    const[param,setparam]=useUrlQueryParam(['name','typeId','processorId','tagId']);
    // 获取当前的项目id用来获取看板数据
    const projectId=useProjectidInUrl();
    const debouncedName=useDebounce(param.name,200)
    return useMemo(()=>({
        projectId,
        typeId:Number(param.typeId)||undefined,
        processorId:Number(param.processorId)||undefined,
        tagId:Number(param.tagId)||undefined,
        name:debouncedName,

    }),[projectId,param])
}

export const useTasksQueryKey=()=>['tasks',useTasksSearchParams()];

export const useTasksModal=()=>{
    const[{editingTaskId},seteditingTaskId]=useUrlQueryParam(['editingTaskId']);
    const{data:editingTask,isLoading}=useTaskDetails(Number(editingTaskId));
    const startEdit=useCallback((id:number)=>{
        seteditingTaskId({editingTaskId:id});
    },[seteditingTaskId]);

    const close=useCallback(()=>{
        seteditingTaskId({editingTaskId:''});
    },[seteditingTaskId]);

    return{
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }

}

export const useEpicSearchParams = () => ({ projectId: useProjectidInUrl() });

export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
