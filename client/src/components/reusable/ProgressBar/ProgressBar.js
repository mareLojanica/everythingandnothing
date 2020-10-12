import React from 'react';
import "./ProgressBar.css";
export const ProgressBar = (props) => {
return (
	<div className="progress-wrapper">
		<div className="progress-bar" style={{ width: props.progress + '%' }}></div>
	</div>
);
} 

export default ProgressBar;