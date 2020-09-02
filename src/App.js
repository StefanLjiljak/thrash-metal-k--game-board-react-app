import React, { useState } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import Players from './components/Players';
import GameBoard from './containers/GameBoard';

function App() {
  const [players, setPlayers] = useState([]);
  const [gamestarted, setGamestarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const startGame = (players) => {
    setPlayers(
      players.map((player) => ({
        ...player,
        location: 0,
        score: 0,
      }))
    );
    setGamestarted(true);
  };

  const movePlayer = (number, squares) => {
    const _players = players.map((player) => {
      if (player.number === currentPlayer) {
        const location = player.location + number;
        const landingSquare = squares[location % squares.length];
        let increaseScore = 0;

        if (landingSquare.type === player.pawn) {
          increaseScore = 2;
        } else {
          increaseScore = -1;
        }

        player = {
          ...player,
          location,
          score:
            player.score + increaseScore < 0 ? 0 : player.score + increaseScore,
        };
      }

      return player;
    });

    setPlayers(_players);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="App">
      <Players players={players} />
      {gamestarted ? (
        <GameBoard
          movePlayer={movePlayer}
          currentPlayer={currentPlayer}
          players={players}
        />
      ) : (
        <PlayerSelect startGame={startGame} />
      )}
    </div>
  );
}

export default App;
