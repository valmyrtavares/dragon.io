import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowCase from './components/ShowCase';
import InpuProducts from './components/forms/inputProducts';
import Header from './components/Header';
import SingleProductBox from './components/SingleProductBox';
import CreateCustomer from './components/forms/CreateCustomer';

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ShowCase />} />
            <Route path="/form" element={<InpuProducts />} />
            <Route path="/form/:id" element={<InpuProducts />} />
            <Route path="/singleProduct/:id" element={<SingleProductBox />} />
            <Route path="/register" element={<CreateCustomer />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
