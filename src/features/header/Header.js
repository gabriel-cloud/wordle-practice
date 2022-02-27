import { BsFillBarChartLineFill, BsFillGearFill, BsBootstrapReboot } from 'react-icons/bs';
import { Row, Col, Container } from 'react-bootstrap';


export const Header = ({ setShowResetModal, setShowModal, resetGameAndStorage, setSettings, resetModal, setResetModal }) => {
  

  const handleStats = () => {
    setShowModal(true);
  };

  const handleSettings = () => {
    setSettings(true)
  }

  const handleReset = () => {
    setShowResetModal(true)
  }

  return (
    <div>
    <Container className='mt-3'>
      <Row>
        <Col className=''>
          <BsBootstrapReboot onClick={handleReset} size={45}> Reset game and stats</BsBootstrapReboot>
          <p>Reset game stats</p>
        </Col>
        <Col className=''>
          <BsFillBarChartLineFill size={45} onClick={handleStats} />
          <p>Show stats</p>
        </Col>
        <Col className=''>
          <BsFillGearFill size={45} onClick={handleSettings}/>
          <p>Settings</p>
        </Col>
      </Row>
    </Container>
     
    </div>
  );
};
