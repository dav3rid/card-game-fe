import React, { Component } from 'react';
import * as api from '../api';

class Game extends Component {
  state = {
    host_id: null,
    opponent_id: null,
    current_turn_id: null,
    game_state: {},
  };

  componentDidMount() {
    const { game_id } = this.props;
    api
      .getGameById(game_id)
      .then(({ host_id, opponent_id, current_turn_id, game_state }) => {
        this.setState({ host_id, opponent_id, current_turn_id, game_state });
      });
  }

  render() {
    const { game_id, user_id } = this.props;
    console.log('In Game render', game_id);
    console.dir(this.state);
    return (
      <div className="board">
        {/* <OpponentHand cards={opponentHand} isOpponentTurn={!isPlayerTurn} />
        <OpponentFinalHand cards={opponentFinalHand} />
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
