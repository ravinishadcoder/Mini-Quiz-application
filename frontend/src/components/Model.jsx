import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Model(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Quiz Ended
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Your Final Score</h4>
        <h2>
          {props.score}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Model