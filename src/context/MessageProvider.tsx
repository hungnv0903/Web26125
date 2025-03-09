import { App } from 'antd'
import React, { createContext, useContext } from 'react'

const MessageContext = createContext<ReturnType<typeof App.useApp> | null>(null) ; 


export const MessageProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const appInstance = App.useApp() ;  //Api từ context của ant
  return (
    <MessageContext.Provider value={appInstance}>
        {children}
    </MessageContext.Provider>
  )
}

export const useMessage = ()=>{
    const context = useContext(MessageContext) ; 
    if(!context){
        throw new Error("useMessage phải được sử dụng bên trong MessageProvider") ; 
    }
    return context ; 
}

