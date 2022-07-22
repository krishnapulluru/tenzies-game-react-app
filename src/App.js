import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
export default function App() {
    const [dice, setDice] = React.useState(allNewArray());
    const [rol, setRol] = React.useState(false);

    React.useEffect(() => {
        const allDone = dice.every(
            (current) => current.isHeld && dice[0].value === current.value
        );
        if (allDone) {
            setRol(true);
            console.log("You won!");
        }
    }, [dice]);

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewArray() {
        let Arr = [];
        for (let i = 1; i <= 10; i++) {
            Arr.push(generateNewDice());
        }
        return Arr;
    }

    function rollDice() {
        if (rol) {
            setDice(allNewArray());
            setRol(false);
        } else {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDice();
                })
            );
        }
    }

    function holdDice(id) {
        return setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const generateElem = dice.map((die) => (
        <Die key={die.id} value={die} hold={() => holdDice(die.id)} />
    ));

    return (
        <main>
            {rol && <ReactConfetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="diesContainer">{generateElem}</div>
            <div className="rollbtn">
                <button onClick={rollDice}>{rol ? "Next Game" : "Roll"}</button>
            </div>
        </main>
    );
}
