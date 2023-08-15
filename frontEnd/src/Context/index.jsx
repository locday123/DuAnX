import {createContext, useState} from 'react'

const Context = createContext();

export function ContextProvider({children}){

    const [breadCrumb, setCrumb] = useState([]);

    const SetBreadcrumb =(url, urlName)=>{
        setCrumb({url, urlName})
        console.log(breadCrumb);
    };


    return(
        <Context.Provider value={{breadCrumb, SetBreadcrumb}}>
            {children}
        </Context.Provider>
    )
}

export default Context

