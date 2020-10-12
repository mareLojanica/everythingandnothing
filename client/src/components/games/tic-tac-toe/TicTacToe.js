import React, { useState, useRef, useEffect } from "react";
import "./TicTacToe.css";
import { Board } from "./board/Board";
import winningMatrix from "../../../logic/gameLogic/TicTacToeLogic";
import { CurrentPlaying } from "./currentPlaying/CurrentPlaying";
import {ModalMask} from "../../reusable/modalmask/ModalMask"
import { Breadcrumb } from "../../reusable/BreadCrumb/Breadcrumb";
import { Logout } from "../../reusable/logut/Logout";

export const TicTacToe = () => {
  document.documentElement.style.setProperty('--main-background-image', '#24a88b');
  const [cellValues, setCellValue] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [XisNext, setXisNext] = useState(() => {
    return true;
  });
  const [boolPause, setPuase] = useState(false);
  const [winingCombination, setWinningCombitaion] = useState(() => {
    return {
      endgame: false,
      combination: [],
      winner: "",
    };
  });
  const [cntPlays, setCntPlays] = useState(0);
    const isCellEmpty = (cellIndex) => cellValues[cellIndex] === "";
  const onCellClicked = (cellIndex) => {
    if (isCellEmpty(cellIndex) && !winingCombination.endgame && !boolPause) {
      let newCnt = cntPlays + 1;
      setCntPlays(newCnt);
      let newCellValues = [...cellValues];
      newCellValues[cellIndex] = XisNext ? "X" : "O";
      setCellValue(newCellValues);
      let win = winningMatrix[cellIndex];
      win.map(function (arrWin) {
        if (
          newCellValues[arrWin[0]] === newCellValues[cellIndex] &&
          newCellValues[arrWin[1]] === newCellValues[cellIndex]
        ) {
          setWinningCombitaion({
            endgame: true,
            combination: [cellIndex, arrWin[0], arrWin[1]],
            winner: `${newCellValues[cellIndex]} won the game`,
          });
        } else if (cntPlays === 8) {
          setWinningCombitaion({
            endgame: true,
            combination: [],
            winner: "No winner , draw",
          });
        }
        return false;
      });
      setXisNext(!XisNext);
    }
  };
  const onStartNewGame = () => {
    setCellValue(["", "", "", "", "", "", "", "", ""]);
    setWinningCombitaion({
      endgame: false,
      combination: [],
      winner: "",
    });
    setXisNext(true);
    setCntPlays(0);
  };
  const onPauseGame = (e) => {
    if (e.keyCode === 80) {
      setPuase(!boolPause);
    }
  };
  const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);

    useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element]
    );
  };
  useEventListener("keydown", onPauseGame);
    return(
	<>
	<Breadcrumb />
		<CurrentPlaying currentPlaying={XisNext} gameEnd={winingCombination.endgame}/>
    <div className="wrapper">
      <div className="game">
        <h1>Tic Tac Toe </h1>
        <Board cellValues={cellValues} winingCombination={winingCombination} cellClick={onCellClicked}/>
      </div>
    </div>
		{winingCombination.endgame && 
			<ModalMask  boolShow={winingCombination.endgame}>
				<div className="game-result-modal">
					<div className="result-container">
						<div className="winner-container">
							<span>{winingCombination.winner}</span>
						</div>
					</div>
					<div id="new-game-container">
						<button id="new-game-button"onClick={() => {onStartNewGame()}}>
							Start New Game
						</button>
					</div>
				</div>
			</ModalMask>
		}
		{boolPause && 
		<ModalMask  boolShow={boolPause}>
			<div className="game-result-modal">
				<div className="result-container">
				<div className="winner-container">
          PAUSE
          <div>pres keyborad key P to unpause</div>
        </div>
				</div>
			</div>
		</ModalMask>
		}
    <Logout />
		</>
    )
}