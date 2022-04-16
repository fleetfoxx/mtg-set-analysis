import { Badge } from "react-bootstrap";
import styled from "styled-components";
import ScryfallCard from "../scryfall/types/ScryfallCard";
import ScryfallSet from "../scryfall/types/ScryfallSet";

type Props = {
  set: ScryfallSet;
  cards: ScryfallCard[];
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const SetIcon = styled.div`
  width: 100px;
  margin: 2rem;
`;

const average = (
  cards: ScryfallCard[],
  valueSelector: (card: ScryfallCard) => number
): number => {
  const average =
    cards.reduce((acc, card) => {
      const value = valueSelector(card);
      return (acc += value && !isNaN(value) ? value : 0);
    }, 0) / cards.length;

  return average;
};

const SetOverview = ({ set, cards }: Props) => {
  const creatures = cards.filter((card) => card.type_line.includes("Creature"));

  const averagePower = average(creatures, (c) =>
    c.power ? parseFloat(c.power) : 0
  );

  const averageToughness = average(creatures, (c) =>
    c.toughness ? parseFloat(c.toughness) : 0
  );

  return (
    <Layout>
      <SetIcon>
        <img src={set.icon_svg_uri} alt="" />
      </SetIcon>
      
      <Stats>
        <span>
          <strong>{set.name}</strong>{" "}
          <Badge bg="secondary">{set.code.toUpperCase()}</Badge>
        </span>

        <span>
          <strong>
            <abbr title="Count may not be accurate for unreleased sets.">
              Number of Cards
            </abbr>
            :
          </strong>{" "}
          {cards.length}
        </span>

        <span>
          <strong>Average Power:</strong> {averagePower.toFixed(2)}
        </span>

        <span>
          <strong>Average Toughness:</strong> {averageToughness.toFixed(2)}
        </span>
      </Stats>

      {/* <table>
        <tbody>
          {cards.map((card) => (
            <tr>
              <td>{card.name}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Layout>
  );
};

export default SetOverview;
