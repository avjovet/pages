import { HashRouter, Routes, Route } from 'react-router-dom'; // Importamos HashRouter y otros elementos
import React, { useState } from 'react';
import './App.css';

const turns = {
  X: 'X',
  O: 'O',
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = isSelected ? 'square is-selected' : 'square';
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.O);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] !== null || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.O);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>3 en raya</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Empate' : `El ganador es `}</h2>
            <header className="win">{winner && <Square>{winner}</Square>}</header>
            <footer>
              <button onClick={resetGame}>Again</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};

function App() {
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" element={<Game />} />  
      </Routes>
    </HashRouter>
  );
}

export default App;
