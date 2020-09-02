import React from 'react';

const Players = (props) => {
  return (
    <div className="players">
      {props.players.map((player) => (
        <div className="player" key={player.number}>
          <h3>Player {player.number}</h3>
          <img
            className="player-pawn"
            src={`./pawns/${player.pawn}-pawn.png`}
            alt={player.pawn}
          />
          <p className="player-score">
            {player.score >= 0 ? `${player.score} beer(s)` : null}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Players;
