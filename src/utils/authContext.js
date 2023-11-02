import { createContext, useState, useEffect, Children } from "react";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    return(
        <AuthContext.Provider value={{"name": "Abdullahi"}}>
            {children}
            
        </AuthContext.Provider>
    )
}