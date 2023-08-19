import {createContext, useState} from 'react'

const Context = createContext();

export function ContextProvider({children}){
    const [message, setMessage] = useState()
    const [acc_isChange, setAcc_ischange] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
    const handleClose = () => {
        
            setAlert({ ...alert, open: false });
            setAcc_ischange(false)
        
    };
    
    
    
    return(
        <Context.Provider value={{alert, setAlert, handleClose, message, setMessage, acc_isChange, setAcc_ischange}}>
            {children}
        </Context.Provider>
    )
}

export default Context

