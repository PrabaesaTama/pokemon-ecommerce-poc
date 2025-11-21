import React, { useEffect, useState } from "react";
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
import AddToCartModal from "../components/AddToCartModal";
import { useStore } from "../stores/StoreContext";
import SuccessToast from "../components/SuccessToast";

function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const { cartStore } = useStore();

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Fetches a Pokemon card by its ID and updates the state accordingly.
   *
   * If the card ID is not found, sets the error state to "Card ID not found".
   * If the fetch fails, sets the error state to "Failed to fetch card".
   */
  /*******  49c2945b-d50d-4f92-a3d5-9b05572afe6a  *******/ useEffect(() => {
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
    setIsModalOpen(true);
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

      <AddToCartModal
        isOpen={isModalOpen}
        card={card}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onAddToCart={(card, slugs, quantities) => {
          for (let i = 0; i < slugs.length; i++) {
            if (quantities[i] <= 0) {
              continue;
            }

            cartStore.addToCart(card, slugs[i], quantities[i]);
          }

          setIsModalOpen(false);
          setIsToastOpen(true);
        }}
      />

      <SuccessToast
        show={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message="Card added to cart!"
      />
    </Container>
  );
}

export default CardDetailPage;
