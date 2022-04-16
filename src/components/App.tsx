import { useEffect, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";
import { getCardsBySet, getSets } from "../scryfall/scryfallService";
import ScryfallCard from "../scryfall/types/ScryfallCard";
import ScryfallSet from "../scryfall/types/ScryfallSet";
import SetOverview from "./SetOverview";
import CreatureSummaries from "./CreatureSummaries";
import ColorSummaries from "./ColorSummaries";
import KeywordSummary from "./KeywordSummary";
import "./App.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  padding: 2rem;
  flex: 1;
  width: 100%;
  min-width: 500px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [setCode, setSetCode] = useState<string>();
  const [sets, setSets] = useState<ScryfallSet[]>([]);
  const [cards, setCards] = useState<ScryfallCard[]>([]);

  const currentSet = sets.find((s) => s.code === setCode);

  useEffect(() => {
    (async () => {
      const sets = await getSets();
      if (sets.length > 0) {
        const filteredSets = sets.filter((set) =>
          ["core", "expansion"].includes(set.set_type)
        );
        setSets(filteredSets);
        setSetCode(filteredSets[0].code);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!setCode) return;
      const cards = await getCardsBySet(setCode);
      setCards(cards);
    })();
  }, [setCode]);

  return (
    <Wrapper className="App">
      <Content>
        <Form.Select
          className="mb-3"
          value={setCode}
          onChange={(e) => setSetCode(e.target.value)}
        >
          {sets.map((set) => (
            <option key={set.code} value={set.code}>
              {set.name} ({set.code.toUpperCase()})
            </option>
          ))}
        </Form.Select>

        {currentSet && cards.length > 0 && (
          <Tabs defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              <SetOverview set={currentSet} cards={cards} />
            </Tab>

            <Tab eventKey="creatures" title="Creatures">
              <CreatureSummaries cards={cards} />
            </Tab>

            <Tab eventKey="colors" title="Colors">
              <ColorSummaries cards={cards} />
            </Tab>

            <Tab eventKey="keywords" title="Keywords">
              <KeywordSummary cards={cards} />
            </Tab>
          </Tabs>
        )}
      </Content>

      <Footer>
        Data from&nbsp;
        <a href="https://scryfall.com/" target="_blank">
          Scryfall
        </a>
        &nbsp;• Built by&nbsp;
        <a href="https://www.twitter.com/fleetfoxx" target="_blank">
          @fleetfoxx
        </a>
      </Footer>
    </Wrapper>
  );
};

export default App;
