import Modal from 'react-bootstrap/Modal';
import './modal.css';

export const WrongWord = ({ wrongWordModal, setWrongWordModal }) => {

  const handleClose = () => setWrongWordModal(false);

  return (
    <>
      <Modal
        show={wrongWordModal}
        onHide={handleClose}
        backdrop={false}
        size={'sm'}
      >
        <Modal.Body
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Not a word
        </Modal.Body>
      </Modal>
    </>
  );
};
