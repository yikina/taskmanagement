
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { TaskType } from "types/task-type";

//获取看板列表(不同接口)
export const useTaskTypes=()=>{
    const client=useHttp();
    return useQuery<TaskType[]>(['tasktypes'],()=>client('tasktypes'));}