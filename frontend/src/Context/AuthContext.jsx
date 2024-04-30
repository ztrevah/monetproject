import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider =  ({children}) => {
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    axios.defaults.withCredentials = true;
    const login  = async (input) => {
        const res = await axios.post("http://localhost:9090/backend/auth/login",input,{withCredentials: true});
        setCurrentUser(res.data);
    };
    
    const logout = async () => {
        await axios.post("http://localhost:9090/backend/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]);

    return <AuthContext.Provider value = {{currentUser,login,logout}}>{children}</AuthContext.Provider>;
}