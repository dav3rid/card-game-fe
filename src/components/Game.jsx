import React, { Component } from 'react';
import * as api from '../api';

class Game extends Component {
  state = {
    host_id: null,
    opponent_id: null,
    current_turn_id: null,
    game_state: {},
    playerRole: null,
  };

  componentDidMount() {
    const { user_id, game_id } = this.props;
    api
      .getGameById(game_id)
      .then(({ host_id, opponent_id, current_turn_id, game_state }) => {
        const playerRole = user_id === host_id ? 'host' : 'opponent';
        this.setState({
          host_id,
          opponent_id,
          current_turn_id,
          game_state,
          playerRole,
        });
      });
  }

  render() {
    const { game_id, game_state } = this.props;
    const { playerRole } = this.state;
    console.log('In Game render', game_id);
    console.dir(this.state);
    console.log(playerRole);
    return (
      <div className="board">
        {/* <EnemyHand cards={} isOpponentTurn={!isPlayerTurn} />
        <PlayerHand cards={playerHand} isPlayerTurn={isPlayerTurn} /> */}
        {/* <OpponentFinalHand cards={opponentFinalHand} />
        <BurnedDeck />
        <PickupDeck cards={currentGameDeck} />
        <PlayableDeck cards={playableDeck} />
        <div className="blank">BLANK</div>
        <PlayerFinalHand cards={playerFinalHand} />
        <PlayerHand cards={playerHand} isPlayerTurn={isPlayerTurn} /> */}
      </div>
    );
  }
}

export default Game;
