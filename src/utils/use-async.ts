import { useState } from "react";

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

export const useAsync=<D>(initialState?:State<D>)=>{
    const[state,setState]=useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });

    const setData=(data:D)=>setState({
        stat:'success',
        data,
        error:null
    })

    const setError=(error:Error)=>setState({
        stat:'error',
        data:null,
        error,
    })

    const run=(promise:Promise<D>)=>{
        if(!promise || !promise.then){
            throw new Error('请传入Promise数据类型')
        }
        setState({...state,stat:'loading'})
        return promise
        .then(
            data=>{
                setData(data)
                return data
            })
        .catch(
            error=>{
                setError(error)
                return error
            }
        )
    }
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