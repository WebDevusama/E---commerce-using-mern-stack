import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useCart } from "../CartContext";
import Emptycart from "../pages/Emptycart";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // ✅ Stripe Payment Messaging (runs AFTER render)
  useEffect(() => {
    if (!window.Stripe) return;

    const stripe = window.Stripe(
      "pk_test_51Sq7wlDSuIXszcQY5ERFK0AHrrfNPwbNJDPzOBTQZLNUBy650OCpPIn22y4E8zvvzBArvwwKOdh1GOTNpBNBCtv500tSA6kqVR"
    );

    const elements = stripe.elements();

    const paymentMessage = elements.create(
      "paymentMethodMessaging",
      {
        amount: 9900,
        currency: "USD",
        countryCode: "US",
      }
    );

    paymentMessage.mount("#payment-method-messaging-element");

    return () => {
      paymentMessage.destroy();
    };
  }, []);

  const handleRemove = (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${title}" from the cart?"`
    );

    if (confirmed) {
      removeFromCart(id);
      if (cartItems.length - 1 === 0) {
        navigate("/emptycart");
      }
    }
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
    .toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <Emptycart />
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.title} fluid rounded />
                  </Col>

                  <Col md={4}>
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>Qty: {item.qty || 1}</Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleRemove(item.id, item.title)}
                    >
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
              <h4>Subtotal ({cartItems.length}) items</h4>
              <strong>${subtotal}</strong>
            </ListGroup.Item>

            {/* ✅ Stripe messaging mounts here */}
            <ListGroup.Item>
              <div id="payment-method-messaging-element"></div>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/payment")}
              >
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
