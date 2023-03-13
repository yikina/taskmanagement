import { useEffect } from "react";

//解决val为0,转换为布尔值判断为false问题
export const isFalsy=(val)=>
val === 0 ? false : !val;



//定义函数判断不让外界传来的对象属性污染到原对象
export const cleanObject=(obj)=>{
    const res={...obj};
    //等价于Object.assign({},obj)
    Object.keys(res).forEach((key)=>{
        const val=res[key];
        if(isFalsy(val)){
            delete res[key]
        }
    })
    return res;

}

//useEffectOnce——为只需要执行一次的操作忽略掉useEffect后面的[ ]，使得代码更加简洁美观
export const useEffectOnce=(callback)=>{
    useEffect(()=>{
        callback()
    },[])
}

//useDebounce()——解决在搜索栏搜索时每输入一个字母都要发送请求的问题，更改为输入完毕并后再发送(内部设置定时器，每次输入新值先清除上一个值的定时器，在设定自己的，直到最后一个值不会被清除，才真正发送请求）
export const useDebounce=(val,delay)=>{
    const[debounceVal,setDebounceVal]=useState(val);

    useEffect(()=>{
        const timeout=setTimeout(()=>setDebounceVal(val),delay);
        return ()=>clearTimeout(timeout)
        
    },[val,delay])

    return debounceVal;
}

