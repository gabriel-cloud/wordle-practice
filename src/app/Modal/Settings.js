import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export const Settings = ({ settings, setSettings, cheat, setCheat }) => {
  const handleChecked = ({target}) => {
    target.checked ? setCheat(true) : setCheat(false)
  };

  const handleClose = () => {
    setSettings(false);
  };

  return (
    <Modal show={settings} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Show current word (for debugging)"
            onChange={handleChecked}
            checked={cheat}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
