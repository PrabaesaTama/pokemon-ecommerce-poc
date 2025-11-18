import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import type { PokemonCard } from "../services/types/PokemonCardType";
import { useState } from "react";

interface AddToCartModalProps {
  isOpen: boolean;
  card?: PokemonCard;
  onClose: () => void;
  onAddToCart: (card: PokemonCard) => void;
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

  const [quantities, setQuantities] = useState<number[]>(
    card.getMarketPrices
      ? card.getMarketPrices().map(() => {
          return 0;
        })
      : []
  );

  const handleIncrease = (index: number) => {
    console.log(index);
    console.log(quantities);
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
              src={card.getImageURL ? card.getImageURL() : ""}
              alt={card.name}
              style={{ maxWidth: "50%", maxHeight: "50%" }}
            />
          </div>
          <div className="mt-3">
            <h5>Available Versions: </h5>
          </div>
          {card.getMarketPrices
            ? card.getMarketPrices().map((price, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="mb-0">{price.version}</h5>
                        <small>Stock: 10</small>
                      </div>

                      <strong>${price.price.toFixed(2)}</strong>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onAddToCart(card)}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCardModal;
