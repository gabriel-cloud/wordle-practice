import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css';
import { chooseWord } from '../../wordList/wordlist';
import { RenderLineChart } from '../../components/graph/Graph';
import { Row, Col, Container } from 'react-bootstrap';

export const ModalDialog = ({
  gameStatus,
  showModal,
  setShowModal,
  todayWord,
  resetGame,
  setTodayWord,
  stats,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  let title = '';

  if (gameStatus === 'lost') {
    title = 'Oh no! You lost. Good luck next time';
  }

  if (gameStatus === 'won') {
    title = 'Congrats. You won!';
  }

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const handleReset = () => {
    resetGame();
    handleClose();
    setTodayWord(chooseWord().toUpperCase());
  };

  const winPercent =
    stats.gamesPlayed === 0
      ? 0
      : Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  return (
    <>
      <Modal show={showModal === true} onHide={handleClose}>
        <Modal.Header closeButton={false}>
          <Container>
            <Row>
              <Col>
                <div className="fs-2 fw-bold">{stats.gamesPlayed}</div>
              </Col>
              <Col>
                <div className="fs-2 fw-bold">{winPercent}</div>
              </Col>
              <Col>
                <div className="fs-2 fw-bold">{stats.currentStreak}</div>
              </Col>
              <Col>
                <div className="fs-2 fw-bold">{stats.maxStreak}</div>
              </Col>
            </Row>
            <Row>
              <Col>Played</Col>
              <Col>Win %</Col>
              <Col>Current Streak</Col>
              <Col>Max Streak</Col>
            </Row>
            <Row>
              <Modal.Title>{title}</Modal.Title>
            </Row>
          </Container>
        </Modal.Header>

        <Modal.Body >
          {gameStatus === 'lost' && <div className="fs-2 fw-bold">Today's word was {todayWord}</div>}
          <div className="fs-5 fw-light">Guesses Distribution</div>
          <RenderLineChart stats={stats} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variand="secondary" onClick={handleReset}>
            Play again?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
