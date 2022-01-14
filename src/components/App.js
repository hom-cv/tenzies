import React, { useState, useEffect } from 'react';
import Die from "./Die"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {

  const numDice = 10

  const [dice, updateDice] = useState(allNewDice())
  const [tenzies, updateTenzies] = useState(false)
  const [rolls, updateRolls] = useState(0)


  useEffect(function() {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    allHeld && dice.every(die => die.value === firstValue) && updateTenzies(true)
  }, [dice])
  
  function allNewDice() {
    let newDice = []
    for (let i = 0; i < numDice; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      updateDice(allNewDice())
      updateTenzies(false)
      updateRolls(0)
    } else {
      updateRolls(oldRolls => oldRolls + 1)
      updateDice(oldDice => oldDice.map(die => {
        return (
          die.isHeld ?
          die :
          {...die, value: Math.ceil(Math.random() * 6)}
        )
      }))
    }
  }

  function holdDice(id) {
    updateDice(oldDice => oldDice.map(die => {
      return (
        die.id === id ?
          {...die, isHeld: !die.isHeld} :
          die 
      )
    }))
  }

  const diceElements = dice.map(die => 
    <Die 
      holdDice={() => holdDice(die.id)}
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
    />)

  return (
    <main className="app--window">
      {tenzies && <Confetti />}
      <h1 className="app--title">Tenzies</h1>
      <p className="app--desc">{tenzies ? `You won with ${rolls} rolls!` : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="app--dice">
        {diceElements}
      </div>
      <button className="app--button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <p>Rolls: {rolls}</p>
    </main>
  )
}

