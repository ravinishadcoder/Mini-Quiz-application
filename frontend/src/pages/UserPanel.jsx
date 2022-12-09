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
    if (level === 10 || level <= 0 || count >= 10) {
      setModalShow(true);
      return;
    }
    fetch(`https://quiz-applications.vercel.app/question?difficulty=${level}`)
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
    let userAns = selectedAns.join();
    
    let status = await axios.post(
      `https://quiz-applications.vercel.app/question/checkans/${data._id}`,
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
    return (
      <div style={{ marginTop: "10%" }}>
        <img
          src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
          alt="loading"
          width="50px"
        />
      </div>
    );
  }
  return (
    <Container className="Box">
      <div className="usertxtHead txtHead">
        <h5>You can choose single or multiple answers</h5>
        <h2>
          Score:<span className="txtSpan">{score}</span>
        </h2>
      </div>
      <div className="userQueBox">
        <h3>{data.question !== undefined && data.question}</h3>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        {data.question !== undefined &&
          [data.opt1, data.opt2, data.opt3, data.opt4].map((type, i) => (
            <div key={i} className="mb-3 userSubBox">
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
