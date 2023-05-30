import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sistema from '../../pages/sistema';
import Stage from '../../pages/demanda';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sistema />} />
        <Route path="/stage/" element={<Stage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
