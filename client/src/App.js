import React, { useState, useMemo } from 'react';
import jwt_decode from "jwt-decode";
import { Login } from "./components/login/Login";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	} from "react-router-dom";
import {UserContext} from "./customHooks/userContext";
import './App.css';
import { TicTacToe } from './components/games/tic-tac-toe/TicTacToe';
import {Dashboard} from './components/dashboard/Dashboard';
import { Register } from './components/register/Register';
import { Galery } from './components/galery/Galery';
import {setAuthToken} from './helpers/setAuthToken'
function App() {
	const token = localStorage.getItem("jwt-auth");
	const decoded = token ? jwt_decode(token) : null;
	if(token){
		setAuthToken(token);
	}
	const [user, setUser] = useState(decoded);
	const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
	return (
		<Router>
			<Switch>
				<UserContext.Provider value={providerUser}>
					<Route exact path="/">
              			<Redirect to="/login" />
            		</Route>
            		<Route exact path="/login">
              			{user ? <Redirect to="/dashboard" /> : <Login />}
					</Route>
					<Route exact path="/register">
              			{user ? <Redirect to="/dashboard" /> : <Register />}
					</Route>
            		<Route exact path="/dashboard">
              			{user ?<Dashboard /> : <Redirect to="/login" />}
            		</Route>
					<Route exact path="/games/tictactoe">
              			{user ?<TicTacToe /> : <Redirect to="/login" />}
            		</Route>
					<Route exact path="/galery">
              			{user ?<Galery /> : <Redirect to="/login" />}
            		</Route>
				</UserContext.Provider>
			</Switch>
		</Router>
	);
}

export default App;
