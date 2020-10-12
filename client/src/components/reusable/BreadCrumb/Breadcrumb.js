import React from "react";
import './Breadcrumb.css'
import { useHistory } from "react-router-dom";
import {AiOutlineRollback} from 'react-icons/ai';
export const Breadcrumb = () => {
    const history = useHistory();
    const handleGoBack = ()=>{
        history.goBack();
    }
    return(
        <div className="breadcrumb-back">
            <AiOutlineRollback onClick={handleGoBack}/>
        </div>
    )
}