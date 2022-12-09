import { createContext, useState } from "react";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [credData,setCredData]=useState({token:"",isAuth:false,role:""})
    return <AuthContext.Provider value={{credData,setCredData}}>{children}</AuthContext.Provider>
}
