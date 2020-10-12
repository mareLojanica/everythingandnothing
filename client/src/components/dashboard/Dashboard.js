import React from 'react';
import "./Dashboard.css";
import img from "../../assets/img/dashboard.jpg";
import gifImages from "../../assets/img/photo.gif"
import gifTicTacToe from "../../assets/img/tic-tac-toe.gif"
import { DashboardCard } from '../dashboardcard/DashboardCard';
import { Logout } from '../reusable/logut/Logout';
export const Dashboard = () => {
    document.documentElement.style.setProperty('--main-background-image', `url("${img}") no-repeat center center fixed`)
    return(
        <>
            <div className="wrapper">
                <div className="dashboard-wrapper">
                    <DashboardCard gif = {gifImages} label='Go to Galery' toPath = '/galery' />
                    <DashboardCard gif = {gifTicTacToe} label='Go to Tic Tac Toe' toPath = '/games/tictactoe'/>
                </div>
            </div>
            <Logout />
        </>
    )
}