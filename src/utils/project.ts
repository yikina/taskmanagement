import { Project } from "components/projectList/List";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects=(param?:Partial<Project>)=>{
    const client=useHttp();
    const {run,...res}=useAsync<Project[]>();

    //页面加载时传入数据
    useEffect(()=>{
        run(client('project',{data:cleanObject(param||{})}))
    },[param]);

    return res;
}