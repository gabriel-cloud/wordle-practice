import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css';

export const ResetGameModal = ({resetGameAndStorage, showResetModal, setShowResetModal}) => {

    const handleClose = () => setShowResetModal(false);
    const handleReset = () => {
        resetGameAndStorage()
        handleClose()
    }
  
    return (
      <>
        <Modal show={showResetModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to reset?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This action will reset all stats and you will lose all progress</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
