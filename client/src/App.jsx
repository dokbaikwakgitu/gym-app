import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>404 — page not found</h1>} />
    </Routes>
  );
}

export default App;
