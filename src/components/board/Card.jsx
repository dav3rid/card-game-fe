import React from 'react';
import images from '../../images';
import * as utils from '../../utils';

const Card = ({ card = 'back', index, isPlayable, handleClick }) => {
  if (!handleClick) handleClick = () => {};
  const handleClickOnce = utils.onlyCallOnce(handleClick);
  return (
    <img
      className={isPlayable ? 'playable-card' : 'card'}
      src={images[card]}
      onClick={() => handleClickOnce(card, index)}
      alt={card}
    />
  );
  // pass function in
};

export default Card;
