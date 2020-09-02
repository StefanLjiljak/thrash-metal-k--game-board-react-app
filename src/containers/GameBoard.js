import React, { useEffect, useState } from 'react';

const GameBoard = (props) => {
  const [squares, setSquares] = useState([]);
  const [gridSize, setGridSize] = useState(5);
  const [rolledNumber, setRolledNumber] = useState(null);

  const { players } = props;
  const player_1 = players[0];
  const player_2 = players[1];

  let playerLocations = [];

  if (squares.length > 0) {
    playerLocations = players.map(
      (player) => squares[player.location % squares.length]
    );
  }

  useEffect(() => {
    const _squares = createSquares();
    setSquares(_squares);
  }, []);

  const createSquares = () => {
    const squares = [{ row: 1, col: 1, type: 'start' }];

    let i = 1;
    let row = 1;
    let col = 2;
    while (squares.length < gridSize * 2 + (gridSize - 2) * 2) {
      const square = {
        row,
        col,
      };

      if (i % 2 !== 0) {
        square.type = player_1.pawn;
      } else if (i % 2 === 0) {
        square.type = player_2.pawn;
      }

      // if (i % 3 === 0) {
      //   square.type = 'face-off';
      // }

      squares.push(square);
      i++;

      // if (row === 1) {
      //   col++;
      // } else if (row === gridSize) {
      //   col--;
      // }

      // if (col > gridSize) {
      //   row++;
      //   col = gridSize;
      // } else if (col === 1) {
      //   row--;
      // }
      if (i < gridSize) {
        col++;
      } else if (i < 2 * gridSize - 1) {
        row++;
      } else if (i < 3 * gridSize - 2) {
        col--;
      } else {
        row--;
      }
    }
    return squares;
  };

  const rollDie = () => {
    const dice = [1, 2, 3, 4, 5, 6];
    const index = Math.floor(dice.length * Math.random());
    const _rolledNumber = dice[index];
    setRolledNumber(_rolledNumber);

    props.movePlayer(index + 1, squares);
  };

  return (
    <div
      className="game-board"
      style={{
        gridTemplate: `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`,
      }}
    >
      {squares.map((square, i) => (
        <div
          style={{ gridRow: square.row, gridColumn: square.col }}
          key={i}
          className="game-square"
        >
          {square.type !== 'start' ? (
            <img src={`./images/${square.type}.png`} alt="logo" />
          ) : (
            'START'
          )}
        </div>
      ))}
      {playerLocations.map((location, i) => (
        <div
          key={i}
          className="player-avatar"
          style={{ gridRow: location.row, gridColumn: location.col }}
        >
          <img
            className="pawn"
            src={`./pawns/${players[i].pawn}-pawn.png`}
            alt="pawn"
          />
        </div>
      ))}
      <div className="board-middle">
        <h3>
          Player {props.currentPlayer}, Headbang the <small>пиво!</small>
        </h3>
        <p className="rolled-die">{rolledNumber}</p>
        <button onClick={rollDie} className="button">
          Roll <small>гајбу!</small>
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
