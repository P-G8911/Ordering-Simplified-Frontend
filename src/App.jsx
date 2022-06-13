import Product from './pages/Product';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Address from './pages/Address';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/productlist" element={<ProductList />} />
        <Route exact path="/address" element={<Address />} />
        <Route exact path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
