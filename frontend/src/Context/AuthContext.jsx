import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider =  ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    axios.defaults.withCredentials = true;
    const login  = async (input) => {
        const res = await axios.post("http://localhost:9090/backend/auth/login",input,{withCredentials: true});
        setCurrentUser(res.data);
    };
    
    const logout = async () => {
        await axios.post("http://localhost:9090/backend/auth/logout");
        setCurrentUser(null);
    };
    console.log(currentUser);
    useEffect(() => {
        const verifyuser = async () => {
            try {
                const res = await axios.get("http://localhost:9090/backend/auth/verify");
                if(res.data?.email) setCurrentUser(res.data);
                else setCurrentUser(null);
            } catch(err) {
                setCurrentUser(null);
                console.log(err);
            }
        }
        verifyuser();
    },[]);

    return <AuthContext.Provider value = {{currentUser,login,logout}}>{children}</AuthContext.Provider>;
}