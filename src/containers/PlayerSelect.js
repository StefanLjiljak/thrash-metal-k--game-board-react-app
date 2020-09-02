import React, { useState } from 'react';
import Players from '../components/Players';

const PlayerSelect = (props) => {
  const [pawns, setPawns] = useState(['angular', 'js', 'react', 'vue']);
  const [currentPlayerSelect, setCurrentPlayerSelect] = useState(1);
  const [players, setPlayers] = useState([]);
  const [readyToStart, setReadyToStart] = useState(false);

  const setPlayer = (pawn) => {
    if (players.find((player) => player.pawn === pawn)) {
      alert('Same pawn selected');
      window.location.href = 'https://www.youtube.com/watch?v=7ca_4xklqtw';
    } else {
      setCurrentPlayerSelect(currentPlayerSelect + 1);
      setPlayers([
        ...players,
        {
          number: currentPlayerSelect,
          pawn,
        },
      ]);
      setReadyToStart(currentPlayerSelect === 2 ? true : false);
    }
  };

  const startGame = () => {
    props.startGame(players);
  };

  return (
    <div>
      <Players players={players} />
      {readyToStart ? (
        <>
          <h1>Click start to begin!</h1>
          <button onClick={startGame} className="button">
            Start
          </button>
        </>
      ) : (
        <>
          <h1>Player {currentPlayerSelect}, select a pawn</h1>
          {pawns.map((pawn) => (
            <div
              className="pawn-container"
              key={pawn}
              onClick={() => setPlayer(pawn)}
            >
              <img
                className="pawn"
                src={`./pawns/${pawn}-pawn.png`}
                alt={pawn}
              />
              <img
                className="pawn-logo"
                src={`./images/${pawn}.png`}
                alt={pawn}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PlayerSelect;
