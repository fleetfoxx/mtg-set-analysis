import ScryfallCard from "./scryfall/types/ScryfallCard";

type FilterCallback = (card: ScryfallCard, face?: number) => boolean;

export const getCount = (
  cards: ScryfallCard[],
  filter: FilterCallback
): number => {
  const count = cards.reduce((sum, card) => {
    if (card.card_faces) {
      for (let i = 0; i < card.card_faces.length; i++) {
        sum += filter(card, i) ? 1 : 0;
      }
    } else {
      sum += filter(card) ? 1 : 0;
    }

    return sum;
  }, 0);

  return count;
};
