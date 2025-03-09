import { ConfigProvider, theme } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = "light" | "dark" ; 
interface ThemeContextProps {
    mode:ThemeMode ; 
    setMode:(mode:ThemeMode)=>void ; 
}

const ThemeContext = createContext<ThemeContextProps | null>(null) ; 

export const  useTheme = ()=>{
    const context = useContext(ThemeContext) ; 
    if(!context) throw  new Error("useTheme must be used within ThemeProvider") ; 
    return context ; 

}

export const ThemeProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [mode , setMode] = useState<ThemeMode>("light") ; 


    const getAlgorithm = ()=>{
        switch (mode) {
            case 'dark':
                return theme.darkAlgorithm ; 
                break;
            default:
                return theme.defaultAlgorithm ; 
        }
    }

    useEffect(() => {
        const body = document.body;
        if(mode==='light'){
            body.classList.remove('theme-dark') ; 
        }else{
            body.classList.remove('theme-light') ; 
        }
        
        body.classList.add(`theme-${mode}`);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{mode, setMode}}>
            <ConfigProvider theme={{algorithm:getAlgorithm()}}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    )
}
