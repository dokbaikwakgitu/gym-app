import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import Classes from './pages/Classes.jsx';
import Pricing from './pages/Pricing.jsx';
import Location from './pages/Location.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/locate-us" element={<Location />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="*" element={<h1>404 — page not found</h1>} />
    </Routes>
  );
}

export default App;
