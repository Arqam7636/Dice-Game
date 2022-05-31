import React, { Component } from "react";
import "./StyleSheet.css";
import dice1 from "../img/dice-1.png";
import dice2 from "../img/dice-2.png";
import dice3 from "../img/dice-3.png";
import dice4 from "../img/dice-4.png";
import dice5 from "../img/dice-5.png";
import dice6 from "../img/dice-6.png";

const diceSelector = [dice1, dice2, dice3, dice4, dice5, dice6];

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores1: 0,
      scores2: 0,
      playing: false,
      currentScore1: 0,
      currentScore2: 0,
      activePlayer: 0,
      isActive: true,
      src: "",
      dice: Math.trunc(Math.random() * 6) + 1,
      btnDisable: false,
      winner1: false,
      winner2: false,
    };
  }

  // switchPlayer = () => {
  //   this.setState({
  //     currentScore: 0,
  //     activePlayer: this.activePlayer === 0 ? 1 : 0,
  //     isActive: !this.state.isActive,
  //   });
  // };

  handleRoll = () => {
    console.log("is playing");
    this.setState(
      {
        playing: true,
        dice: Math.trunc(Math.random() * 6) + 1,
      },
      () => {
        if (this.state.dice !== 1) {
          if (this.state.isActive) {
            this.setState({
              currentScore1: this.state.currentScore1 + this.state.dice,
            });
          } else {
            this.setState({
              currentScore2: this.state.currentScore2 + this.state.dice,
            });
          }
        } else {
          if (this.state.isActive) {
            this.setState({
              isActive: false,
              currentScore1: 0,
            });
          } else {
            this.setState({
              isActive: true,
              currentScore2: 0,
            });
          }
        }

        console.log("updatedStae", this.state.dice);
      }
    );
  };

  handleHold = () => {
    console.log("Hold is Pressed");

    if (this.state.isActive) {
      this.setState(
        {
          isActive: false,
          currentScore1: 0,
          scores1: this.state.scores1 + this.state.currentScore1,
        },
        () => {
          if (this.state.scores1 >= 20) {
            this.setState({
              playing: false,
              btnDisable: true,
              winner1: true,
            });
          }
        }
      );
    } else {
      this.setState(
        {
          isActive: true,
          currentScore2: 0,
          scores2: this.state.scores2 + this.state.currentScore2,
        },
        () => {
          if (this.state.scores2 >= 20) {
            this.setState({
              playing: false,
              btnDisable: true,
              winner2: true,
            });
          }
        }
      );
    }
  };

  HandleNewGame = () => {
    this.setState({
      scores1: 0,
      scores2: 0,
      playing: false,
      currentScore1: 0,
      currentScore2: 0,
      activePlayer: 0,
      isActive: true,
      src: "",
      dice: Math.trunc(Math.random() * 6) + 1,
      btnDisable: false,
      winner1: false,
      winner2: false,
    });
  };

  render() {
    console.log({
      dice: this.state.dice,
      diceArr: diceSelector[this.state.dice - 1],
      diceSelector,
    });
    return (
      <React.Fragment>
        <div className="body">
          <div className="main">
            <div
              className={`player player--0 ${
                this.state.isActive ? "player--active" : ""
              } ${this.state.winner1 ? "player--winner" : ""}`}
            >
              <h2 className="name" id="name--0">
                Player 1
              </h2>
              <p className="score" id="score--0">
                {this.state.scores1}
              </p>
              <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--0">
                  {this.state.currentScore1}
                </p>
              </div>
            </div>
            <div
              className={`player player--1 ${
                !this.state.isActive ? "player--active" : ""
              } ${this.state.winner2 ? "player--winner" : ""} `}
            >
              <h2 className="name" id="name--1">
                Player 2
              </h2>
              <p className="score" id="score--1">
                {this.state.scores2}
              </p>
              <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--1">
                  {this.state.currentScore2}
                </p>
              </div>
            </div>

            <img
              src={diceSelector[this.state.dice - 1]}
              alt="Playing dice"
              className={this.state.playing ? "dice" : "hidden"}
            />
            <button className="btn btn--new" onClick={this.HandleNewGame}>
              🔄 New game
            </button>
            <button
              className="btn btn--roll"
              onClick={this.state.btnDisable ? null : this.handleRoll}
            >
              🎲 Roll dice
            </button>
            <button
              className="btn btn--hold"
              onClick={this.state.btnDisable ? null : this.handleHold}
            >
              📥 Hold
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
