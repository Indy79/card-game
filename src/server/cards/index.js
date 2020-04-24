import { Deck } from 'playing-cards-js';

let deck = null;

export const checkNewGame = () => {
    if (deck === null) initDeck()
    if (deck.cards.length === 0) initDeck()
}

export const initDeck = () => {
    deck = new Deck()
    deck.shuffle()
}

export const draw = (count = 1) => {
    checkNewGame()
    return deck.draw(count)[0]
}

