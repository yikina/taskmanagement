import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D>{
    stat: 'idle'|'loading'|'error'|'success';
    error:Error | null;
    data:D | null
}

const defaultInitialState:State<null>
={
    stat:'idle',
    error:null,
    data:null
}

const defaultConfig={
    throwOnError:false
}

const useSafeDispatch=<T>(dispatch:(...args:T[])=>void)=>{
    const mountedRef=useMountedRef();
    return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args):void 0),[dispatch,mountedRef])

}

export const useAsync=<D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    const config={...defaultConfig,initialConfig}
    const[state,dispatch]=useReducer((state:State<D>,action:Partial<State<D>>) => ({...state,...action}),{
        ...defaultInitialState,
        ...initialState
    });
    
    const safeDispatch=useSafeDispatch(dispatch);

    const setData=useCallback((data:D)=>safeDispatch({
        stat:'success',
        data,
        error:null
    }),[safeDispatch])

    const setError=useCallback((error:Error)=>safeDispatch({
        stat:'error',
        data:null,
        error,
    }),[safeDispatch])

    const run=useCallback(function (promise: Promise<D>) {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise数据类型');
        }
        safeDispatch({ stat: 'loading' });
        return promise
            .then(
                data => {
                    
                        setData(data);
                        return data;
                    
                })
            .catch(
                error => {
                    setError(error);
                    if (config.throwOnError) {
                        return Promise.reject(error);
                    }
                    return error;
                }
            );
    },[config.throwOnError,setData,setError,safeDispatch])
    return{
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        ...state
    }


}