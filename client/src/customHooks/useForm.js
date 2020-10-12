import { useState, useEffect } from "react";

export const useForm = (callback, validate) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors, [name]: "" };
    setErrors(newErrors);
    setValues({
      ...values,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    setIsSubmitting(true);
  };
  const handleResponse = (responseErrors) =>{
    
    if(Object.keys(responseErrors).length !== 0){
      console.log('uslo vode')
      setErrors(responseErrors);
    }
  } 
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, callback, isSubmitting]);

  return {
    handleChange,
    handleSubmit,
    handleResponse,
    values,
    errors,
  };
};
