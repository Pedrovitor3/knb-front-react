import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sistema from '../../pages/sistema';
import Demanda from '../../pages/demanda';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sistema />} />
        {/*<Route path='*' element={<Navigate to='/' replace />} />*/}
        <Route path="demanda" element={<Demanda />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
