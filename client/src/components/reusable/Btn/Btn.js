import React from "react";
import "./Btn.css";
export const Btn = (props) => {
  return <input type="submit" value={props.label} className="submit-btn"/>;
};
