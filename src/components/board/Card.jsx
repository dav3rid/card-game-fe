import React from 'react';
import images from '../../images';

const Card = ({ card = 'back', index, isPlayable, handleClick }) => {
  if (!handleClick) handleClick = () => {};
  return (
    <img
      className={isPlayable ? 'playable-card' : 'card'}
      src={images[card]}
      onClick={() => handleClick(card, index)}
      alt={card}
    />
  );
  // pass function in
};

export default Card;
