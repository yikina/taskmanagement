import { useMemo } from "react";
import { useProject } from "./project";
import { useSetUrlSearchParam, useUrlQueryParam } from "./url";

export const useProjectsSearchParam = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
}

export const useProjectQueryKey = () => ['projects', useProjectsSearchParam()[0]];



export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);

    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);

    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

const setUrlParams=useSetUrlSearchParam();

    const open = () => setProjectCreate({ projectCreate: true });

    const close = () => {
        setUrlParams({ projectCreate: '', editingProjectId: '' })
    }


    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading

    }
}