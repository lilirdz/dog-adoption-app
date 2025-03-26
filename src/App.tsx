import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DogListPage from './pages/DogListPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dogs" element={
            <ProtectedRoute>
            <DogListPage />
            </ProtectedRoute>
            } />
            
        </Routes>
      </Router>
    </div>
  );
}

export default App;
