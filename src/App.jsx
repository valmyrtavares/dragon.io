import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowCase from './components/ShowCase';
import InpuProducts from './components/forms/inputProducts';
import Header from './components/header';

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ShowCase />} />
            <Route path="/form" element={<InpuProducts />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
