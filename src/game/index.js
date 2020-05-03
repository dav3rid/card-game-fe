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

const getCardValue = card => {
  if ('1JQKA'.includes(card[0])) {
    const values = { '1': 10, J: 11, Q: 12, K: 13, A: 14 };
    return values[card[0]];
  }
  return +card[0];
};

const isPlayable = (card, topCardValue = 0, cardPlayedThisTurn) => {
  const cardValue = getCardValue(card);
  // if a card has already been played this turn
  if (cardPlayedThisTurn) {
    if (topCardValue === 8) return cardValue >= 8;
    // if not 8, can only match
    return cardValue === topCardValue;
  }
  const powerCardValues = [2, 3, 10];
  // Catch 7s first
  if (topCardValue === 7) return cardValue <= 7;
  if (powerCardValues.includes(cardValue)) return true;
  return cardValue >= topCardValue;
};

const getValidStartingValues = hand => {
  return hand.reduce((valuesOverThree, card) => {
    const cardValue = getCardValue(card);
    if (cardValue > 3) valuesOverThree.push(cardValue);
    return valuesOverThree;
  }, []);
};

const getNewGameState = () => {
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
      burnedDeck: [],
    },
    topCardValue: 0,
  };
};

const getFirstTurnId = (host_id, opponent_id, hostHand, opponentHand) => {
  const hostValidValues = getValidStartingValues(hostHand);
  const opponentValidValues = getValidStartingValues(opponentHand);

  return Math.min(...hostValidValues) <= Math.min(...opponentValidValues)
    ? host_id
    : opponent_id;
};

module.exports = {
  getCardValue,
  isPlayable,
  getValidStartingValues,
  getNewGameState,
  getFirstTurnId,
};
