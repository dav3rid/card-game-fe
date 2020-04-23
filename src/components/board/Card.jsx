import React from 'react';
import images from '../../images';

const Card = ({ card = 'back' }) => {
  return <img src={images[card]} alt={card} />;
  // pass function in
};

export default Card;
