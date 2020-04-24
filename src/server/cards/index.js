import { Deck } from 'playing-cards-js';

let deck = null;

export const initDeck = () => {
    deck = new Deck()
    deck.shuffle()
}

export const draw = (count = 1) => {
    if (deck.cards.length === 0) return null
    return deck.draw(count)[0]
}

