import { useLocation } from "react-router-dom";
import { useProject } from "utils/project";

export const useProjectidInUrl=()=>{
    const url=useLocation();
    const id=url.pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
}

export const useProjectInurl=()=>useProject(useProjectidInUrl());

export const useKanbanPrarams=()=>({projectId:useProjectidInUrl()});
export const useKanbanQueryKey=()=>['kanbans',useKanbanPrarams()];

export const useTasksSearchParams=()=>({
    projectId:useProjectidInUrl()
})
export const useTasksQueryKey=()=>['tasks',useTasksSearchParams()];