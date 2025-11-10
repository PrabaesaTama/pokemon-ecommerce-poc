import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { PokemonCard } from "../services/types/PokemonCardType";
import { getCardById } from "../services/PokemonApi";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";

function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [card, setCard] = React.useState<PokemonCard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!cardId) {
        setError("Card ID not found");
        setLoading(false);
        return;
      }

      try {
        const card = await getCardById(cardId);
        setCard(card);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch card");
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    // Implement add to cart logic
    console.log("Add to cart:", card);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading card details...</span>
        </Spinner>
        <div className="mt-3">Loading card details...</div>
      </Container>
    );
  }

  if (error || !card) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || "Card not found"}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleBackClick} variant="outline-danger">
              Go Back
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Navigation */}
      <div
        className="mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Link to="/" className="btn btn-outline-secondary mb-3">
          ← Back to All Cards
        </Link>
      </div>

      <Row>
        {/* Card Image */}
        <Col md={6} lg={5}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={card.getImageURL()}
              alt={card.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Card>
        </Col>

        {/* Card Details */}
        <Col md={6} lg={7}>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="mb-3">
                {card.name}
              </Card.Title>

              <Card.Subtitle className="mb-3 text-muted">
                {card.set.name}
              </Card.Subtitle>

              {/* Card Information */}
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Rarity:</strong> {card.rarity || "N/A"}
                </Col>
                <Col sm={6}>
                  <strong>HP:</strong> {card.hp || "N/A"}
                </Col>
              </Row>

              {card.types && card.types.length > 0 && (
                <div className="mb-3">
                  <strong>Element:</strong> {card.types.join(", ")}
                </div>
              )}

              {/* Prices */}
              <div className="mb-4">
                <h5>Prices</h5>
                {card.getDisplayPrice(card).length > 0 ? (
                  card.getDisplayPrice(card).map((price, index) => (
                    <div key={index} className="small">
                      {price}
                    </div>
                  ))
                ) : (
                  <div className="text-muted">
                    Price information not available
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                className="d-flex gap-2"
                style={{ justifyContent: "center" }}
              >
                <Button variant="primary" size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CardDetailPage;
