import { Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Results from './components/Results';
import Discography from './components/Discography';

function App() {
  return (
    <Container fluid="md" className="p-4 d-grid row-gap-3">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/results" element={<Results />} />
        <Route path="/artists/:artist_id" element={<Discography />} />
      </Routes>
    </Container>
  );
}

export default App;