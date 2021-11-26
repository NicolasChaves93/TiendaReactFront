import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    return <button style={{width: "200px"}} type="button" class="btn btn-outline-secondary btn-sm" onClick={
            () => loginWithRedirect()
            }>Iniciar Sesión</button>
};