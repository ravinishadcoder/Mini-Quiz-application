import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const { credData, setCredData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://degiaccel-backend.onrender.com/login", cred);
      setCredData({
        ...credData,
        token: data.token,
        isAuth: true,
        role: data.role,
      });
      if (data.role == "admin") {
        navigate("/admin");
      } else if (data.role == "user") {
        navigate("/user");
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  return (
    <div className="signupBox">
      <h3 style={{ textAlign: "center" }}>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={cred.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={cred.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group>
          {error && (
            <span className="warning">
              Unathourized User
            </span>
          )}
        </Form.Group>
        <Button style={{ marginTop: "5px" }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
