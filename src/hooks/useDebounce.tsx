import { useState,useEffect } from 'react'

const useDebounce=(value:any,delay=300)=>{
    const [debounceValue,setDebounceValue]=useState(value)
    useEffect(() => {
        const handle=window.setTimeout(()=>{
           setDebounceValue(value)
        },delay)
        return () => {
            clearTimeout(handle)
        };
    }, [value,delay]);
    return debounceValue
}
export default useDebounce