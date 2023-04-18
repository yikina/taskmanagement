import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParam = useSetUrlSearchParam();
    return [useMemo(
        () => keys.reduce((prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }), [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
        return setSearchParam(params);
    }] as const;
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setsearchParams] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
        return setsearchParams(o)
    }

}