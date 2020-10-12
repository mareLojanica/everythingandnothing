import React from "react";
import "./Register.css";
import axios from "axios";
import { FormInput } from "../reusable/formInput/FormInput";
import { useForm } from "../../customHooks/useForm";
import { validateRegister } from "../../validation/validateRegister";
import { Btn } from "../reusable/Btn/Btn";
import { Link, useHistory } from "react-router-dom";

export const Register = (props) => {
    const history = useHistory();
   const submit = (errors)=> {
        axios
			.post("/api/users/register", { name : values.name ,email: values.email, password: values.password , password2 : values.password2 })
			.then((res) => {
                if(res.data.success){
                    history.push('/login');
                }
            })
			.catch((err) => {
			    handleResponse(err.response.data)
		});
	}
  const { handleChange,handleResponse, handleSubmit, values, errors } = useForm(
		submit,
		validateRegister
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
			// blur: handleBlur,
        },
        name: {
			type: "text",
			name: "name",
			required: true,
			autocomplete: "off",
			label: "Name",
			value: values.name,
			errors: errors.name ? errors.name : false,
			change: handleChange,
			// blur: handleBlur,
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
            password2: {
			type: "password",
			name: "password2",
			required: true,
			autocomplete: "off",
			label: "Repeat password",
			errors: errors.password2 ? errors.password2 : false,
			change: handleChange,
		},
    };
  return (
    <div className='register-slide-menu'>
        <div className="form">
            <form action="" noValidate onSubmit={handleSubmit}>
                <h2>Register</h2>
                <FormInput objConfig={objDataConfig.name} />
                <FormInput objConfig={objDataConfig.userName} />
                <FormInput objConfig={objDataConfig.password} />
                <FormInput objConfig={objDataConfig.password2} />
                <Link to="/login">
                    <div className="forgot-pw">
                        Back to login?
                    </div>
                </Link>
                <div className="btn-middle">
                    <Btn label="Register" />
                </div>
            </form>
        </div>
    </div>
  );
};
