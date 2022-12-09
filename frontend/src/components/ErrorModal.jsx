import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ErrorShow(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Warning !
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
          {
            props.text
          }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorShow
