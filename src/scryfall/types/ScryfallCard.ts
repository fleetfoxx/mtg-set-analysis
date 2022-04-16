import ScryfallCardFace from "./ScryfallCardFace";

type ScryfallCard = {
  object: "card";
  id: string;
  card_faces?: ScryfallCardFace[];
  cmc: number;
  color_identity: string[];
  color_indicator?: string[];
  colors?: string[];
  keywords: string[];
  layout: string;
  mana_cost?: string;
  name: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  type_line: string;
  image_uris?: {
    png: string;
  };
  image_status: "missing" | "placeholder" | "lowres" | "highres_scan";
  rarity: "common" | "uncommon" | "rare" | "mythic" | "special" | "bonus";
  released_at: string;
  set: string;
};

export default ScryfallCard;
