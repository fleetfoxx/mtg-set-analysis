import ScryfallCard from "./types/ScryfallCard";
import ScryfallList from "./types/ScryfallList";
import ScryfallSet from "./types/ScryfallSet";

export const getSets = async (): Promise<ScryfallSet[]> => {
  let hasMore = true;
  let sets: ScryfallSet[] = [];
  let uri = encodeURI("https://api.scryfall.com/sets");

  do {
    const response = await fetch(uri);
    const body: ScryfallList<ScryfallSet> = await response.json();

    sets = [...sets, ...body.data];

    hasMore = body.has_more;
  } while (hasMore);

  return sets;
};

export const getCardsBySet = async (
  setCode: string
): Promise<ScryfallCard[]> => {
  let hasMore = true;
  let cards: ScryfallCard[] = [];
  let uri: string = encodeURI(`https://api.scryfall.com/cards/search?q=s:${setCode}&is:booster&unique=cards`);

  do {
    const response = await fetch(uri);
    const body: ScryfallList<ScryfallCard> = await response.json();

    cards = [...cards, ...body.data];
    hasMore = body.has_more;
    if (hasMore) {
      uri = body.next_page!;
    }
  } while (hasMore);

  return cards;
};
