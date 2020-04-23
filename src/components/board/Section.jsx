import React from 'react';
import EnemyHand from './enemy/EnemyHand';
import EnemyPenultimateHand from './enemy/EnemyPenultimateHand';
import EnemyFinalHand from './enemy/EnemyFinalHand';

import PlayerHand from './player/PlayerHand';
import PlayerPenultimateHand from './player/PlayerPenultimateHand';
import PlayerFinalHand from './player/PlayerFinalHand';

const Section = ({ role, cards: { hand, penultimateHand, finalHand } }) => {
  if (role === 'enemy') {
    return (
      <>
        <EnemyHand cards={hand} />
        <EnemyPenultimateHand cards={penultimateHand} />
        <EnemyFinalHand cards={finalHand} />
      </>
    );
  } else {
    return (
      <>
        <PlayerHand cards={hand} />
        <PlayerPenultimateHand cards={penultimateHand} />
        <PlayerFinalHand cards={finalHand} />
      </>
    );
  }
};

export default Section;
