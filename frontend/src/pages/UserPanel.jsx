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
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/question?difficulty=${level}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d[0]);
      });
      if(level==10||level<0){
       setModalShow(true)
      }
  }, [level]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkboxes = document.getElementsByName("answer");
    let selectedAns = [];
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        selectedAns.push(checkbox.value);
      }
    }
    let correct_ans = data.correct_ans.split(",");
    // console.log("correct_ans")
    if (correct_ans.length === selectedAns.length) {
      let res = true;
      for (let i = 0; i < selectedAns.length; i++) {
        if (!correct_ans.includes(selectedAns[i])) {
          res = false;
          break;
        }
      }
      if (res) {
        setScore(score + 5);
        setLevel(level + 1);
      } else {
        setLevel(level - 1);
        setScore(score - 2);
      }
    } else {
      setLevel(level - 1);
      setScore(score - 2);
    }
    document.querySelector(".form").reset();
  };
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
     
      <Model show={modalShow} score={score} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default UserPanel;
