import React, { useState, useEffect } from "react";
import "./StyleSheet.css";
import dice1 from "../img/dice-1.png";
import dice2 from "../img/dice-2.png";
import dice3 from "../img/dice-3.png";
import dice4 from "../img/dice-4.png";
import dice5 from "../img/dice-5.png";
import dice6 from "../img/dice-6.png";

// const diceSelector = [dice1, dice2, dice3, dice4, dice5, dice6];

function GameHook() {
  const diceSelector = [dice1, dice2, dice3, dice4, dice5, dice6];

  const [scores1, setscores1] = useState(0);
  const [scores2, setscores2] = useState(0);
  const [currentScore1, setcurrentScore1] = useState(0);
  const [currentScore2, setcurrentScore2] = useState(0);
  const [playing, setplaying] = useState(false);
  // const [activePlayer, setactivePlayer] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [winner1, setwinner1] = useState(false);
  const [winner2, setwinner2] = useState(false);
  // const [src, setsrc] = useState("");
  const [btnDisable, setbtnDisable] = useState(false);
  const [dice, setdice] = useState(null);
  const [againRun, setAgainRun] = useState(false);

  const HandleNewGame = () => {
    console.log("Handle New Game function");

    setscores1(0);
    setscores2(0);
    setcurrentScore1(0);
    setcurrentScore2(0);
    setplaying(false);
    setisActive(true);
    setwinner1(false);
    setwinner2(false);
    setbtnDisable(false);
    setdice(null);
  };

  const handleRoll = () => {
    console.log("handle roll function");

    setplaying(true);
    setdice(Math.trunc(Math.random() * 6) + 1);
    setAgainRun(!againRun);
  };

  useEffect(() => {
    if (dice !== 1) {
      if (isActive) {
        setcurrentScore1(currentScore1 + dice);
      } else {
        setcurrentScore2(currentScore2 + dice);
      }
    } else {
      if (isActive) {
        setisActive(false);
        setcurrentScore1(0);
      } else {
        setisActive(true);
        setcurrentScore2(0);
      }
    }
  }, [againRun, dice]);

  const handleHold = () => {
    console.log("handle Hold function");
    console.log("Hold is Pressed");

    if (isActive) {
      setisActive(false);
      setcurrentScore1(0);
      setscores1(scores1 + currentScore1);
    } else {
      setisActive(true);
      setcurrentScore2(0);
      setscores2(scores2 + currentScore2);
    }
  };

  useEffect(() => {
    if (scores1 >= 20) {
      setplaying(false);
      setbtnDisable(true);
      setwinner1(true);
    }

    if (scores2 >= 20) {
      setplaying(false);
      setbtnDisable(true);
      setwinner2(true);
    }
  }, [scores1, scores2]);

  return (
    // <React.Fragment>
    <div className="body">
      <div className="main">
        <div
          className={`player player--0 ${isActive ? "player--active" : ""} ${
            winner1 ? "player--winner" : ""
          }`}
        >
          <h2 className="name" id="name--0">
            Player 1
          </h2>
          <p className="score" id="score--0">
            {scores1}
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--0">
              {currentScore1}
            </p>
          </div>
        </div>
        <div
          className={`player player--1 ${!isActive ? "player--active" : ""} ${
            winner2 ? "player--winner" : ""
          } `}
        >
          <h2 className="name" id="name--1">
            Player 2
          </h2>
          <p className="score" id="score--1">
            {scores2}
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--1">
              {currentScore2}
            </p>
          </div>
        </div>

        <img
          src={diceSelector[dice - 1]}
          alt="Playing dice"
          className={playing ? "dice" : "hidden"}
        />
        <button className="btn btn--new" onClick={HandleNewGame}>
          🔄 New game
        </button>
        <button
          className="btn btn--roll"
          onClick={btnDisable ? null : handleRoll}
        >
          🎲 Roll dice
        </button>
        <button
          className="btn btn--hold"
          onClick={btnDisable ? null : handleHold}
        >
          📥 Hold
        </button>
      </div>
    </div>
    // </React.Fragment>
  );
}

export default GameHook;
