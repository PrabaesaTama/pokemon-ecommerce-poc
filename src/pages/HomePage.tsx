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
import { useDebounce } from "../hooks/UseDebounce";

function HomePage() {
  const [cards, setCards] = useState<PokemonCard[]>();
  const [filteredCards, setFilteredCards] = useState<PokemonCard[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const debounceSearchQuery = useDebounce(searchTerm, 300);

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
    if (!debounceSearchQuery.trim()) {
      setFilteredCards(cards);
      return;
    }

    const filtered = cards?.filter((card) => {
      return card.name
        .toLowerCase()
        .includes(debounceSearchQuery.toLowerCase());
    });

    setFilteredCards(filtered);
  }, [debounceSearchQuery, cards]);

  useEffect(() => {
    if (!selectedFilter) {
      setFilteredCards(cards);
      return;
    }

    const filtered = cards?.filter((card) => {
      return card.types?.includes(selectedFilter);
    });

    setFilteredCards(filtered);
  }, [selectedFilter, cards]);

  return (
    <Container fluid className="py-4">
      <Container fluid className="px-4">
        <h1 className="mb-4 mt-5">Welcome to Pokemon Cards!</h1>
        <Row className="mb-4">
          <Col lg={8} xl={6} className="mx-auto">
            <InputGroup>
              <InputGroup.Text>
                <MdSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col className="mx-auto">
            <Form.Select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Colorless">Colorless</option>
              <option value="Darkness">Darkness</option>
              <option value="Dragon">Dragon</option>
              <option value="Fairy">Fairy</option>
              <option value="Fighting">Fighting</option>
              <option value="Fire">Fire</option>
              <option value="Grass">Grass</option>
              <option value="Lightning">Lightning</option>
              <option value="Metal">Metal</option>
              <option value="Psychic">Psychic</option>
              <option value="Water">Water</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      <Container fluid className="px-4">
        {loading ? (
          <div className="w-100 text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Fetching cards...</p>
          </div>
        ) : (
          <CardList cards={filteredCards || []} />
        )}
      </Container>
    </Container>
  );
}

export default HomePage;
