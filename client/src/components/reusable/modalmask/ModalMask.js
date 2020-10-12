import React from "react";
import "./ModalMask.css";
import classNames from "classnames";
export const ModalMask = (props) => {
  const modalClasses = classNames({
    show: props.boolShow,
  });
  return (
    <div id="modal-overlay" className={modalClasses} onClick={props.handleClose ? props.handleClose() : undefined}>
      {props.children}
    </div>
  );
};
