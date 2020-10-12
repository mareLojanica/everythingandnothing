//email
// more than 0 chars
//string to be email
//password
//more than 0 chars
//more than 10 chars

export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password needs to be more than 10 characters";
  }
  return errors;
};
