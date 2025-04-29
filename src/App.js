import "./styles.css";
import Die from "./Die";
import { useState, useEffect } from "react";
// import { render } from "react-dom";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    allNewDice();
  }, []);

  const renderDice = () => {
    return dice.map((die) => (
      <Die key={die.id} toggleHold={() => holdDie(die.id)} isHeld={die.hold}>
        {die.value}
      </Die>
    ));
  };

  useEffect(() => {
    const won =
      dice.every((die) => die.hold === true) &&
      dice.every((die) => die.value === dice[0].value);
    setTenzies(won);
    // if(won)console.log(won)
  }, [dice]);

  // function checkTenzies(){
  // }

  function holdDie(id) {
    // console.log(id, 'die was held')
    if (!tenzies)
      setDice((prev) => {
        return prev.map((die) => {
          return die.id === id ? { ...die, hold: !die.hold } : die;
        });
      });

    // checkTenzies();
  }

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        hold: false,
        id: nanoid()
      });
    }
    setDice(arr);
  }

  function rollDice() {
    if (tenzies) {
      allNewDice();
    } else {
      setDice((prev) => {
        return prev.map((die) => {
          return die.hold
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        });
      });
    }
  }

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1> Tenzies </h1>
      <h2>
        {" "}
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.{" "}
      </h2>
      <div className="dice">{renderDice()}</div>
      <button className="roll" onClick={rollDice}>
        {" "}
        {tenzies ? "New Game" : "Roll"}{" "}
      </button>
    </div>
  );
}
