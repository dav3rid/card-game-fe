import React from 'react';
import images from '../../images';

const Card = ({ card = 'back', handleClick }) => {
  return <img src={images[card]} onClick={handleClick} alt={card} />;
  // pass function in
};

export default Card;
