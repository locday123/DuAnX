import { createContext, useState } from 'react'

const Context = createContext();

export function ContextProvider({ children }) {
    const [message, setMessage] = useState()
    const [dataChange, setChange] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const handleClose = () => {
        setChange(false)
        setAlert({ ...alert, open: false });
    };



    return (
        <Context.Provider value={{ alert, setAlert, handleClose, message, setMessage, dataChange, setChange }}>
            {children}
        </Context.Provider>
    )
}

export default Context

