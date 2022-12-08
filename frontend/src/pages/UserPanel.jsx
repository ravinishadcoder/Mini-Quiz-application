import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Model from "../components/Model";

const UserPanel = () => {
  const [data, setData] = useState({});
  const [level, setLevel] = useState(5);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(1);
  const [graphData, setGraphData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (level === 10 || level <= 0) {
      setModalShow(true);
      return;
    }
    fetch(`https://degiaccel-backend.onrender.com/question?difficulty=${level}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d[0]);
        setCount((count) => count + 1);
      });
  }, [level]);
  useEffect(() => {
    setGraphData([...graphData, { name: "Q" + count, score: score }]);
  }, [score]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkboxes = document.getElementsByName("answer");
    let selectedAns = [];
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        selectedAns.push(checkbox.value);
      }
    }
    let userAns = selectedAns.join("");
    let status = await axios.post(
      `https://degiaccel-backend.onrender.com/question/checkans/${data._id}`,
      { userAns }
    );
    
    if (status.data.msg) {
      setScore(score + 5);
      setLevel(level + 1);
    } else {
      setLevel(level - 1);
      setScore(score - 2);
    }

    document.querySelector(".form").reset();
  };
  if (data.question === undefined) {
    return <h3>Please wait...</h3>;
  }
  return (
    <Container style={{ border: "1px solid black", padding: "5px" }}>
      <h2>Your Score:{score}</h2>
      <h3>Que:- {data.question !== undefined && data.question}</h3>
      <Form className="form" onSubmit={handleSubmit}>
        {data.question !== undefined &&
          [data.opt1, data.opt2, data.opt3, data.opt4].map((type) => (
            <div
              key={`default-${type}`}
              className="mb-3"
              style={{
                display: "flex",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <Form.Check
                type="checkbox"
                id={type}
                name="answer"
                value={type}
                label={type}
              />
            </div>
          ))}
        <Button variant="primary" type="submit">
          Next Question
        </Button>
      </Form>

      <Model
        show={modalShow}
        score={score}
        data={graphData}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
};

export default UserPanel;
