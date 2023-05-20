import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParam = useSetUrlSearchParam();
    return [useMemo(
        //通过 reduce 遍历传入的 keys 数组，每一次遍历都将使用 searchParams 方法去查找对应的 value 值，遍历完成后会返回整个对象，利用 reduce 将每次的 key-value 添加到 {} 中，最后全部返回
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