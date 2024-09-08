import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import DocumentPage from './pages/DocumentPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/:documentId" element={<DocumentPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
