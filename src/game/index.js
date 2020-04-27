const createShuffledDeck = () => {
  const originalDeck = [
    // CLUBS
    'AC',
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    '10C',
    'JC',
    'QC',
    'KC',

    // SPADES
    'AS',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    '10S',
    'JS',
    'QS',
    'KS',

    // HEARTS
    'AH',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    '10H',
    'JH',
    'QH',
    'KH',

    // DIAMONDS
    'AD',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    '10D',
    'JD',
    'QD',
    'KD',
  ];
  const shuffledDeck = [];
  while (shuffledDeck.length < 52) {
    const randomIndex = Math.floor(Math.random() * originalDeck.length);
    shuffledDeck.push(originalDeck.splice(randomIndex, 1)[0]);
  }
  return shuffledDeck;
};

exports.getNewGameState = () => {
  const newDeck = createShuffledDeck();

  const hostFinalHand = newDeck.splice(-3, 3);
  const opponentFinalHand = newDeck.splice(-3, 3);

  const hostHand = newDeck.splice(-6, 6);
  const opponentHand = newDeck.splice(-6, 6);

  return {
    host: {
      hand: hostHand,
      penultimateHand: [],
      finalHand: hostFinalHand,
    },
    opponent: {
      hand: opponentHand,
      penultimateHand: [],
      finalHand: opponentFinalHand,
    },
    neutral: {
      pickupDeck: newDeck,
      playableDeck: [],
    },
    topCardValue: 0,
  };
};

// const getCardValue = card => {};

// module.exports = { getNewGameState };
