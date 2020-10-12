import React from "react";
import "./FormInput.css";
import classNames from "classnames";
export const FormInput = (props) => {
  const strClasses = classNames({
    "invalid-input": props.objConfig.errors,
  });
  return (
    <div className="input-group">
      <input
        className={strClasses}
        type={props.objConfig.type}
        name={props.objConfig.name}
        required={props.objConfig.required}
        autoComplete={props.objConfig.autocomplete}
        value={props.value}
        onChange={props.objConfig.change}
        onBlur={props.objConfig.blur ? props.objConfig.blur : undefined}
      />
      <label>{props.objConfig.label}</label>
      <p className="error-message">{props.objConfig.errors}</p>
    </div>
  );
};
