import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import { MdShoppingCart } from "react-icons/md";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Pokemon Cards
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/checkout">
            <MdShoppingCart /> <Badge bg="danger">{0}</Badge>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
