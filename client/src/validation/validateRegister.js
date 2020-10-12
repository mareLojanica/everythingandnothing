export const validateRegister = (values) => {
	let errors = {};
	if (!values.email) {
		errors.email = "email is required";
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = "Email address is invalid";
	}
	if(!values.name){
		errors.name = "Password is required";
	}
	if (!values.password) {
		errors.password = "Password is required";
	} else if (values.password.length < 6) {
		errors.password = "Password needs to be more than 6 characters";
	}
	if (!values.password2) {
		errors.password2 = "Password is required";
	} else if (values.password2 !== values.password) {
		errors.password2 = "Passwords must match";
	}
	return errors;
};