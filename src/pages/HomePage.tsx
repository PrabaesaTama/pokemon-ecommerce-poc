import { useEffect, useState } from "react";
import {
  Col,
  Container,
  InputGroup,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { getAllCards } from "../services/PokemonApi";
import type { PokemonCard } from "../services/types/PokemonCardType";
import CardList from "../components/CardList";

function HomePage() {
  const [cards, setCards] = useState<PokemonCard[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      getAllCards()
        .then((cards) => {
          setCards(cards);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCards();
  }, []);

  useEffect(() => {
    cards?.map((card) => {
      console.log(card);
      console.log(card.pricing);
    }); // Log the updated cards state value
  }, [cards]);

  return (
    <Container fluid className="py-4">
      <Container>
        <h1 className="mb-4 mt-5">Welcome to Pokemon Cards!</h1>
        <Row className="mb-4">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <MdSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Form.Control>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container fluid className="d-flex">
        {loading ? (
          <div className="w-100 text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <CardList cards={cards!} />
        )}
      </Container>
    </Container>
  );
}

export default HomePage;
