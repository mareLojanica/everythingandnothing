import React, {useContext} from "react";
import "./Logout.css";
import {UserContext} from "../../../customHooks/userContext";
import {RiLogoutCircleRLine} from 'react-icons/ri'; 
import { useHistory } from "react-router-dom";
import {setAuthToken} from "../../../helpers/setAuthToken"
export const Logout = () => {
    const history = useHistory();
    const { setUser} = useContext(UserContext);
    const handleLout = ()=>{
        localStorage.removeItem('jwt-auth');
        setUser(null);
        history.push('/login');
        setAuthToken(false);
    }
    return(
        <div className="logout-icon">
            <RiLogoutCircleRLine onClick={handleLout}/>
        </div>
    )
}