import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useCart } from "../CartContext";
import Emptycart from "../pages/Emptycart";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  // ✅ Handle remove
  const handleRemove = (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${title}" from the cart?`
    );

    if (confirmed) {
      removeFromCart(id);

      // Redirect if cart is now empty
      if (cartItems.length === 1) {
        navigate("/emptycart");
      }
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <Emptycart />
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              // ✅ FIXED: unique key combining index, id, and title
              <ListGroup.Item key={`${index}-${item.id}-${item.title}`}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.title} fluid rounded />
                  </Col>

                  <Col md={4}>
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </Col>

                  <Col md={2}>${item.price.toFixed(2)}</Col>
                  <Col md={2}>Qty: {item.qty || 1}</Col>

                  <Col md={2}>
                    <Button
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
              <strong>${subtotal.toFixed(2)}</strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout/delivery")}
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
