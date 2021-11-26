import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {LogoutButton} from "./Logout"

export const Profile = () =>{
    const {user,isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return <div>Loading.....</div>
    }

    return(
        isAuthenticated && (
            <div className="dropdown-menu text-center">
                <img src = {user.picture} alt = {user.name} width="40" height="40"/>
                <div>{user.name}</div>
                <div style={{ fontSize: 10 }}>{user.email}</div>
                <div class="dropdown-divider"></div>
                <LogoutButton />
            </div>
        )
    )
}