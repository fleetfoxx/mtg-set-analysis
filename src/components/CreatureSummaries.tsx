import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import ScryfallCard from "../scryfall/types/ScryfallCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

type Props = {
  cards: ScryfallCard[];
};

const Layout = styled.div`
  & > * {
    margin-top: 0.5rem;
  }
`;

const ChartWrapper = styled.div`
  height: 400px;
`;

const getChartData = (
  cards: ScryfallCard[],
  labels: string[],
  valueSelector: (card: ScryfallCard) => string
) => {
  const data: number[] = [];

  for (let label of labels) {
    const count = cards.filter(
      (c) => valueSelector(c).toString() === label
    ).length;

    data.push(count);
  }

  return data;
};

const CreatureSummaries = ({ cards }: Props) => {
  const [rarityFilter, setRarityFilter] = useState("");

  // TODO: handle double-faced cards
  const creatures = cards.filter(
    (card) =>
      card.type_line.includes("Creature") &&
      (rarityFilter ? card.rarity === rarityFilter : true) &&
      card.power &&
      card.toughness
  );

  const powers = creatures.map((c) => c.power!);
  const toughnesses = creatures.map((c) => c.toughness!);

  const labels = [...new Set([...powers, ...toughnesses]).values()];
  labels.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Power",
        data: getChartData(creatures, labels, (c) => c.power!),
        backgroundColor: "red",
      },
      {
        label: "Toughness",
        data: getChartData(creatures, labels, (c) => c.toughness!),
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <Layout>
      <label>
        Rarity
        <Form.Select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </Form.Select>
      </label>

      <ChartWrapper>
        <Bar options={{ responsive: true }} data={data} />
      </ChartWrapper>
    </Layout>
  );
};

export default CreatureSummaries;
