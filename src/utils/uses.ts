import { User } from "components/projectList/SearchLine";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers=(param?:Partial<User>)=>{
    const client=useHttp();
    const {run,...res}=useAsync<User[]>();

    useEffect(() => {
        run(client("users", { data: cleanObject(param || {}) }));
      }, [param, run, client]);

    return res;

}