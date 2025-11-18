import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import type { PokemonCard } from "../services/types/PokemonCardType";
import { useEffect, useState } from "react";

interface AddToCartModalProps {
  isOpen: boolean;
  card?: PokemonCard;
  onClose: () => void;
  onAddToCart: (
    card: PokemonCard,
    slugs: string[],
    quantities: number[]
  ) => void;
}

const AddToCardModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  card,
  onClose,
  onAddToCart,
}) => {
  if (!card) {
    return null;
  }

  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    if (card && card.getMarketPrices) {
      setQuantities(card.getMarketPrices().map(() => 0));
    }
  }, [card?.id, isOpen]);

  const handleClose = () => {
    setQuantities(
      card.getMarketPrices ? card.getMarketPrices().map(() => 0) : []
    );
    onClose();
  };

  const handleAddToCart = () => {
    if (card && card.getMarketPrices) {
      const slugs = card.getMarketPrices().map((data) => {
        return data.slug;
      });
      onAddToCart(card, slugs, quantities);
    }
  };

  const handleIncrease = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = newQuantities[index || 0] + 1;
      return newQuantities;
    });
  };

  const handleDecrease = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(0, newQuantities[index || 0] - 1);
      return newQuantities;
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{card.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div className="d-flex justify-content-center">
            <img
              src={
                card.getImageURL
                  ? card.getImageURL()
                  : "/assets/pokemon_card_backside.png"
              }
              alt={card.name}
              style={{ maxWidth: "50%", maxHeight: "50%" }}
            />
          </div>
          <div className="mt-3">
            <h5>Available Versions: </h5>
          </div>
          {card.getMarketPrices
            ? card.getMarketPrices().map((data, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="mb-0">{data.version}</h5>
                        <small>Stock: 10</small>
                      </div>

                      <strong>${data.price.toFixed(2)}</strong>
                    </div>

                    <div className="d-flex align-items-center mt-2 gap-2">
                      <span>Quantity:</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleDecrease(index)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{quantities[index]}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleIncrease(index)}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            : null}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCardModal;
