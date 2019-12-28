import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, handleClick, status }) {
  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
        id={i}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[history.length - 1];
  const winner = current.squares && calculateWinner(current.squares);

  const handleClick = i => {
    const newSquares = [...current.squares];
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...history, {squares: newSquares}]);
    setXIsNext(!xIsNext);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 
      `Go to ${move}` :
      `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => {
          // this.jumpTo(move)
        }}>
          {desc}
        </button>
      </li>
    )
  })


  let status = `Next player is ${xIsNext ? "X" : "O"}`;

  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next player is ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          handleClick={handleClick}
          status={status}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
