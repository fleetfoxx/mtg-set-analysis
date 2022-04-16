type ScryfallCardFace = {
  object: "card_face",
  cmc?: number,
  colors?: string[],
  image_uris: {
    png: string
  },
  mana_cost: string,
  name: string,
  power?: string,
  toughness?: string,
  type_line?: string
}

export default ScryfallCardFace;