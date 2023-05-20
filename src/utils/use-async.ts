import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D>{
    stat: 'idle'|'loading'|'error'|'success';
    error:Error | null;
    data:D | null
}

//初始状态
const defaultInitialState:State<null>
={
    stat:'idle',
    error:null,
    data:null
}

const defaultConfig={
    throwOnError:false
}

export const useAsync=<D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    const config={...defaultConfig,initialConfig}
    const[state,setState]=useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    const mountedRef=useMountedRef();

    const setData=useCallback((data:D)=>setState({
        stat:'success',
        data,
        error:null
    }),[])

    const setError=useCallback((error:Error)=>setState({
        stat:'error',
        data:null,
        error,
    }),[])

    const run=useCallback(function (promise: Promise<D>) {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise数据类型');
        }
        setState(prevstate => ({ ...prevstate, stat: 'loading' }));
        return promise
            .then(
                data => {
                    if (mountedRef.current) {
                        setData(data);
                        return data;
                    }
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
    },[config.throwOnError,mountedRef.current,setData,setError])
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