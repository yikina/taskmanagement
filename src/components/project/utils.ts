import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectidInUrl=()=>{
    const url=useLocation();
    const id=url.pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
}

export const useProjectInurl=()=>useProject(useProjectidInUrl());

export const useKanbanPrarams=()=>({projectId:useProjectidInUrl()});
export const useKanbanQueryKey=()=>['kanbans',useKanbanPrarams()];

export const useTasksSearchParams=()=>{
    const[param,setparam]=useUrlQueryParam(['name','typeId','processorId','tagId']);
    const projectId=useProjectidInUrl();
    return useMemo(()=>({
        projectId,
        typeId:Number(param.typeId)||undefined,
        processorId:Number(param.processorId)||undefined,
        tagId:Number(param.tagId)||undefined,
        name:param.name

    }),[projectId,param])
}

export const useTasksQueryKey=()=>['tasks',useTasksSearchParams()];