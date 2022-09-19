import { Routes,Route } from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen";
import {ProductScreen} from './screens/ProductScreen';
// import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import { LinkContainer } from "react-router-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="d-flex flex-column section-container">
      <Navbar bg="dark" variant="dark">
       <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="brandText">Ebazaar</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
      {/* <header>
        <Link to="/">
          Ebazaar
        </Link>
      </header> */}
      <main>
        <Container>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/product/:slug" element={<ProductScreen />} />
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
