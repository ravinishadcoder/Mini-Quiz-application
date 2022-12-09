import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import "../App.css";
import Navbar from "react-bootstrap/Navbar";
import { Link} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/Auth"
function Home() {
  const {credData,setCredData}=useContext(AuthContext)
 const handleLogout=()=>{
  setCredData({
    ...credData,
    token: "",
    isAuth: false,
    role: "",
  })
 }
  return (
    <Navbar bg="primary" variant="dark" className='navbar'>
      <Container>
        <Navbar.Brand href="#home"><Link to="/" className='logText'>Quiz Aplication</Link></Navbar.Brand>
       {
        credData.isAuth?(<Button  variant="secondary" onClick={handleLogout}>Logout</Button>):(<Button  variant="secondary"><Link to="/login" className='logText'>Login</Link>/<Link to="signup" className='logText'>Signup</Link></Button>)
       }
      </Container>
    </Navbar>
  );
}

export default Home;
