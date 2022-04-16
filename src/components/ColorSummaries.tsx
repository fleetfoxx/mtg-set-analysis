import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import styled from "styled-components";
import ScryfallCard from "../scryfall/types/ScryfallCard";
import { Bar } from "react-chartjs-2";
import { getCount } from "../utilities";

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
  margin: 1rem;
`;

const ChartWrapper = styled.div`
  height: 400px;
`;

const getColorCount = (cards: ScryfallCard[], color: string) => {
  return getCount(cards, (c, i) => {
    if (i && c.card_faces![i].colors && c.card_faces![i].colors!.length === 1) {
      return c.card_faces![i].colors![0] === color;
    } else if (c.colors && c.colors.length === 1) {
      return c.colors[0] === color;
    } else {
      return false;
    }
  });
};

const getGoldCount = (cards: ScryfallCard[]) => {
  return getCount(cards, (c, i) => {
    if (i && c.card_faces![i].colors && c.card_faces![i].colors!.length > 1) {
      return true;
    } else if (c.colors && c.colors.length > 1) {
      return true;
    } else {
      return false;
    }
  });
};

const getColorlessCount = (cards: ScryfallCard[]) => {
  return getCount(cards, (c, i) => {
    if (i && c.card_faces![i].colors && c.card_faces![i].colors!.length === 0) {
      return true;
    } else if (c.colors && c.colors.length === 0) {
      return true;
    } else {
      return false;
    }
  });
};

const ColorSummaries = ({ cards }: Props) => {
  const whiteCount = getColorCount(cards, "W");
  const blueCount = getColorCount(cards, "U");
  const blackCount = getColorCount(cards, "B");
  const redCount = getColorCount(cards, "R");
  const greenCount = getColorCount(cards, "G");
  const goldCount = getGoldCount(cards);
  const colorlessCount = getColorlessCount(cards);

  const labels = [
    "White",
    "Blue",
    "Black",
    "Red",
    "Green",
    "Gold",
    "Colorless",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: [
          whiteCount,
          blueCount,
          blackCount,
          redCount,
          greenCount,
          goldCount,
          colorlessCount,
        ],
      },
    ],
  };

  return (
    <Layout>
      <ChartWrapper>
        <Bar options={{ responsive: true }} data={data} />
      </ChartWrapper>
    </Layout>
  );
};

export default ColorSummaries;
