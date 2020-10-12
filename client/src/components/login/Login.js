import "./Login.css"
import React ,{ useContext }  from 'react';
import axios from "axios";
import Avatar from "../../assets/img/download.jpg";
import { Btn } from "../reusable/Btn/Btn";
import { useForm } from "../../customHooks/useForm";
import { FormInput } from "../reusable/formInput/FormInput";
import { validateLogin } from "../../validation/validateLogin";
import {UserContext} from "../../customHooks/userContext";
import { Link } from "react-router-dom";
import img from "../../assets/img/bg1.png";
export const Login = () => {
	 document.documentElement.style.setProperty('--main-background-image', `url("${img}") no-repeat center center fixed`)
	const { user, setUser } = useContext(UserContext);
	const submit = (errors)=> {
		axios
			.post("/api/users/login", { email: values.email, password: values.password })
			.then((res) => {
				const { token } = res.data;
				console.log(res.data)
				localStorage.setItem("jwt-auth", token);
				if (token) {
					const newUser = {...user , id: res.data._id, email: res.data.email}
					setUser(newUser);
				} else {
					console.log(res.data);
				}
				})
			.catch((err) => {
			handleResponse(err.response.data)
		});
	}
	const { handleChange,handleResponse, handleSubmit, values, errors } = useForm(
		submit,
		validateLogin
	);
	const objDataConfig = {
		userName: {
			type: "text",
			name: "email",
			required: true,
			autocomplete: "off",
			label: "Email",
			value: values.email,
			errors: errors.email ? errors.email : false,
			change: handleChange,
			//blur: handleBlur,
		},
		password: {
			type: "password",
			name: "password",
			required: true,
			autocomplete: "off",
			label: "Password",
			errors: errors.password ? errors.password : false,
			change: handleChange,
		},
	};

	return (
		<>
			<div className="login-wrapper">
				<div className="form">
					<form action="" noValidate onSubmit={handleSubmit}>
						<img src={Avatar} alt="Avatar" className="img" />
						<h2>Login</h2>
						<FormInput objConfig={objDataConfig.userName} />
						<FormInput objConfig={objDataConfig.password} />
						<Link to="/register">
							<div className="forgot-pw">
								Register?
							</div>
						</Link>
						<div className="btn-middle">
							<Btn label="Login" />
						</div>
					</form>
				</div>
			</div>
		</>
	)
}