import React, { Component } from 'react';
import * as api from '../api';
import PlayerHand from './board/PlayerHand';
import EnemyHand from './board/EnemyHand';

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
        const enemyRole = user_id === host_id ? 'opponent' : 'host';
        this.setState({
          host_id,
          opponent_id,
          current_turn_id,
          game_state,
          playerRole,
          enemyRole,
        });
      });
  }

  render() {
    const { game_id } = this.props;
    const { playerRole, enemyRole, game_state } = this.state;
    console.log(game_state);
    console.log(game_state[`${playerRole}Hand`]);
    console.log(game_state[`${playerRole}FinalHand`]);
    console.log(game_state[`${playerRole}PenultimateHand`]);

    return (
      <div className="board">
        <EnemyHand cards={game_state[`${enemyRole}Hand`]} />
        <PlayerHand cards={game_state[`${playerRole}Hand`]} />
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
