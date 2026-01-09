import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.title} fluid rounded />
                  </Col>

                  <Col md={4}>
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    Qty: {item.qty || 1}
                  </Col>

                  <Col md={2}>
                    <Button type="button" variant="light">
                      ❌
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.length}) items
              </h4>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button className="w-100" disabled={cartItems.length === 0}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
