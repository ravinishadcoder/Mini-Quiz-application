import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home2 from "./Home2";

function Home() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Quiz Aplication</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Home;
