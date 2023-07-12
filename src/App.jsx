import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import People from './pages/People';
import CreatePerson from './pages/CreatePerson';

function App() {
  return (
    <div className="app__container">
      <Header />
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/addPerson" element={<CreatePerson />} />
      </Routes>
    </div>
  );
}

export default App;
