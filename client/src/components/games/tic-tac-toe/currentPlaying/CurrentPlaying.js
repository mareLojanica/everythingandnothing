import React from "react";
import "./CurrentPlaying.css";
export const CurrentPlaying = (props) => {
	const strPlaying = props.gameEnd? "Game ended": props.currentPlaying
													? "X is playing": "O is playing";
	return <div className="currently-playing">{strPlaying}</div>;
};
