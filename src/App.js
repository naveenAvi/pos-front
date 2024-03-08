import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './adminpages/AdminHome';
import AdminItem from './adminpages/AdminItem';
import AdminStock from './adminpages/AdminStock';
import AdminCustomer from './adminpages/AdminCustomer';
import AdminOrder from './adminpages/AdminOrder';
import Home from './customerpages/Home';
import AdminCategory from './adminpages/Categories/AdminCategory';
import AdminStocks from './adminpages/Stocks/AdminStocks';
import AdminItems from './adminpages/Items/AdminItems';
import LoginN from './customerpages/Auth/LoginN';
import RegisterN from './customerpages/Auth/Registern';
//import AdminItems from './adminpages/Stocks/AdminItems';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>


          {/* <Route element={<AdminProtectedRoutes />}> */}
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/admin/categories' element={<AdminCategory />} />
            <Route path='/admin/items' element={<AdminItems />} />
            <Route path='/admin/stocks' element={<AdminStocks />} />
            {/* <Route path='/admin/new/stocks' element={<AdminStocks />} /> */}
            <Route path='/admin/orders' element={<AdminOrder />} />
            <Route path='/admin/customers' element={<AdminCustomer />} />

            <Route path='/admin/stock/old' element={<AdminStock />} />


            
            {/* <Route path='/admin/new/items' element={<AdminItems />} /> */}
          {/* </Route> */}
          
            <Route path='/' element={<Home />} />
       

          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/login' element={<LoginN />} />
          <Route path='/register' element={<RegisterN />} />
          

          
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
