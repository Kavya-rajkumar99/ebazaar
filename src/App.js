import { Routes, Route, Link } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
// import {Link} from "react-router-dom"
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./Store";
import Badge from "react-bootstrap/Badge";
import { CartScreen } from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const { state} = useContext(Store);
  const { cart } = state;
  return (
    <div className="d-flex flex-column section-container">
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brandText">Ebazaar</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
            <i className="fa-sharp fa-solid fa-cart-shopping"></i>
              {cart.cartItems.length > 0 && (
                <Badge pill bg="success">
                  {cart.cartItems.reduce((acc,curr)=>acc + curr.quantity,0)}
                </Badge>
              )}
            </Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <header>
        <Link to="/">
          Ebazaar
        </Link>
      </header> */}
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">Copyright &copy; ebazaar</div>
      </footer>
    </div>
  );
}

export default App;
