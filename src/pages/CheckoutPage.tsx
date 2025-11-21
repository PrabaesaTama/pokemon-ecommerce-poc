import { observer } from "mobx-react-lite";
import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useStore } from "../stores/StoreContext";
import { MdAdd, MdDelete, MdRemove, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import { SLUG_CONVERTERS, SlugConverter } from "../constants/CardTypes";
import "./CheckoutPage.css";

const CheckoutPage = observer(() => {
  const { cartStore } = useStore();

  if (cartStore.totalItems === 0) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5">
          <Card.Body>
            <MdShoppingCart size={80} className="text-muted mb-3" />
            <h2>Your cart is empty</h2>
            <p className="text-muted mb-4">
              Add some Pokemon cards to get started!
            </p>
            <Link to="/">
              <Button variant="primary" size="lg">
                Browse Cards
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <div className="full-width-container py-5">
      <h1>Shopping Cart</h1>
      <Table responsive className="w-100">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "20%" }}>
              Card
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              Type
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              Quantity
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              Price
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              <Button variant="danger" onClick={() => cartStore.clearCart()}>
                <MdDelete />
                Clear Cart
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartStore.items.map(
            (item) => (
              console.log(item),
              (
                <tr key={item.card.id}>
                  <td>
                    <div className="product-item">
                      <div className="product-image">
                        <img
                          src={
                            item.card.getImageURL
                              ? item.card.getImageURL()
                              : "/assets/pokemon_card_backside.png"
                          }
                          alt={item.card.name}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </div>
                      <div className="product-name">{item.card.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-type">
                      {SlugConverter.foil(item.slug)}
                    </div>
                  </td>
                  <td>
                    <div className="product-quantity">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="me-2"
                        onClick={() =>
                          cartStore.decreaseCardQuantity(
                            item.card.id,
                            item.slug
                          )
                        }
                      >
                        <MdRemove />
                      </Button>
                      <span className="quantity">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="ms-2"
                        onClick={() =>
                          cartStore.increaseCardQuantity(
                            item.card.id,
                            item.slug
                          )
                        }
                      >
                        <MdAdd />
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="product-price">
                      {item.card.getMarketPrices
                        ? item.card
                            .getMarketPrices()
                            .find((price) => price.slug === item.slug)?.price
                        : 0}
                    </div>
                  </td>
                  <td>
                    <div className="product-remove">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          cartStore.removeFromCart(item.card.id, item.slug)
                        }
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>

      <div className="shopping-cart-footer">
        <div className="column">
          <h4>
            Subtotal :{" "}
            {cartStore.totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h4>
        </div>
      </div>

      <div className="shopping-cart-footer">
        <div className="column">
          <Link to="/" className="btn btn-outline-secondary">
            ← Back to All Cards
          </Link>
        </div>
        <div className="column">
          <Button variant="primary" size="lg" onClick={() => {}}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
});

export default CheckoutPage;
