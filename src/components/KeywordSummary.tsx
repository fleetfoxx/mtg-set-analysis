import ScryfallCard from "../scryfall/types/ScryfallCard";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { getCount } from "../utilities";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
  // Legend
);

type Props = {
  cards: ScryfallCard[];
};

const Layout = styled.div`
  margin: 1rem;
`;

const ChartWrapper = styled.div`
  height: 400px;
`;

const KeywordSummary = ({ cards }: Props) => {
  const labels = useMemo(() => {
    const keywords = new Set<string>();

    for (let card of cards) {
      for (let keyword of card.keywords) {
        keywords.add(keyword);
      }
    }

    return [...keywords.values()];
  }, [cards]);

  const counts = useMemo(() => {
    const counts = [];

    for (let label of labels) {
      const count = cards.filter((c) => c.keywords.includes(label)).length;
      counts.push({ label, count });
    }

    return counts;
  }, [cards, labels]);

  counts.sort((a, b) => b.count - a.count);

  const data = {
    labels: counts.map((c) => c.label),
    datasets: [
      {
        label: "Count",
        data: counts.map((c) => c.count),
        backgroundColor: "#003f5c",
      },
    ],
  };

  return (
    <Layout>
      <ChartWrapper>
        <Bar
          plugins={[ChartDataLabels]}
          options={{
            responsive: true,
            plugins: {
              datalabels: {
                anchor: "center",
                color: "#fefefe",
              },
            },
          }}
          data={data}
        />
      </ChartWrapper>
    </Layout>
  );
};

export default KeywordSummary;
