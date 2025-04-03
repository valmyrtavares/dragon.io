import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowCase from './components/ShowCase';
import InpuProducts from './components/forms/inputProducts';
import Header from './components/Header';
import SingleProductBox from './components/SingleProductBox';
import CreateCustomer from './components/forms/CreateCustomer';
import UserRules from './components/rules/userRules';
import { GlobalProvider } from './GlobalProvider';

const App = () => {
  return (
    <GlobalProvider>
      <Router basename="/dragon.io">
        <Header />
        <Routes>
          <Route path="/" element={<ShowCase />} />
          <Route path="/form" element={<InpuProducts />} />
          <Route path="/form/:id" element={<InpuProducts />} />
          <Route path="/singleProduct/:id" element={<SingleProductBox />} />
          <Route path="/register" element={<CreateCustomer />} />
          <Route path="/user-rules" element={<UserRules />} />
          <Route path="*" element={<ShowCase />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;

// "homepage": "https://valmyrtavares.github.io/dragon.io",
