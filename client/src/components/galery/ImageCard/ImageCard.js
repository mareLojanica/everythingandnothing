import "./ImageCard.css";
import React from "react";
export const ImageCard = (props)=>{
    return(
        <div className="img-wrap" onClick={()=>{props.openModal()}}>
            <img src={props.path}  alt="..." />
        </div>
    )
}