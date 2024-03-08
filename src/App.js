import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './adminpages/AdminHome';
import AdminCustomer from './adminpages/AdminCustomer';
import AdminOrder from './adminpages/AdminOrder';
import Home from './customerpages/Home';
import AdminCategory from './adminpages/Categories/AdminCategory';
import AdminStocks from './adminpages/Stocks/AdminStocks';
import AdminItems from './adminpages/Items/AdminItems';
import LoginN from './customerpages/Auth/LoginN';
import RegisterN from './customerpages/Auth/Registern';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>


            <Route path='/admin' element={<AdminHome />} />
            <Route path='/admin/categories' element={<AdminCategory />} />
            <Route path='/admin/items' element={<AdminItems />} />
            <Route path='/admin/stocks' element={<AdminStocks />} />
            <Route path='/admin/orders' element={<AdminOrder />} />
            <Route path='/admin/customers' element={<AdminCustomer />} />

            <Route path='/' element={<Home />} />
       
          <Route path='/login' element={<LoginN />} />
          <Route path='/register' element={<RegisterN />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
