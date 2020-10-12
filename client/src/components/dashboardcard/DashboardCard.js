import React from 'react';
import { Link } from 'react-router-dom';
import "./DashboardCard.css";

export const DashboardCard = (props) => {
    return(
    <div className="box">
        <div className="imgBx">
            <img src={props.gif} alt="" />
        </div>
        <div className="content">
            <h2>
                <Link to={props.toPath} style={{ textDecoration: 'inherit'}}>
                    <div className="app-links">{props.label}</div>
                </Link>
            </h2>
        </div>
    </div>
    )
}