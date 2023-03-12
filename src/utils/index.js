//解决val为0,转换为布尔值判断为false问题
export const isFalsy=(val)=>
val === 0 ? false : !val;
//取反两次表示将其值转换为布尔值


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


