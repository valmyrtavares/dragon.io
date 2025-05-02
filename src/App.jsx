import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowCase from './components/ShowCase';
import InpuProducts from './components/forms/inputProducts';
import Header from './components/Header';
import SingleProductBox from './components/singleProduct/SingleProductBox';
import CreateCustomer from './components/forms/CreateCustomer';
import UserRules from './components/rules/userRules';
import { GlobalProvider } from './GlobalProvider';
import CustomerList from './components/customer/customerList';
import Footer from './components/Footer';

const App = () => {
  return (
    <GlobalProvider>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<ShowCase />} />
          <Route path="/form" element={<InpuProducts />} />
          <Route path="/form/:id" element={<InpuProducts />} />
          <Route path="/singleProduct/:id" element={<SingleProductBox />} />
          <Route path="/register" element={<CreateCustomer />} />
          <Route path="/user-rules" element={<UserRules />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="*" element={<ShowCase />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
  );
};

export default App;

// "homepage": "https://valmyrtavares.github.io/dragon.io",
