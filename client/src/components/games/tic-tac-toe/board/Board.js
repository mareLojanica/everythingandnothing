import React from "react";
import { Cell } from "../cell/Cell";
import "./Board.css";

export const Board = (props) => {
  let cells = props.cellValues.map((value, index) => {
    let boolCanHighilight =
      props.winingCombination.combination.indexOf(index) >= 0;
    return (
      <Cell
        canHighlight={boolCanHighilight}
        value={value}
        key={index}
        combination={props.winingCombination.combination}
        winner={props.winingCombination.endgame}
        onClick={() => {
          props.cellClick(index);
        }}
      />
    );
  });
  return <div id="board">{cells}</div>;
};
