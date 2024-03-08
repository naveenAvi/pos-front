import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios';
import AdminNavBar from './components/AdminNavBar';
import EmptyContent from '../utils/EmptyContent';

export default function AdminOrder() {

  const [checkouts, setCheckouts] = useState(null);
  const [SelectedCartItems, setSelectedCartItems] = useState([]);

  useEffect(() => {
    getCheckouts();
  }, []);

  var groupBy = function (xs) {
    return xs.reduce(function (rv, x) {
      (rv[x.cart.cartId] = rv[x.cart.cartId] || []).push(x);
      return rv;
    }, {});
  };

  const getCheckouts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/cart-item/get-all");
      console.error(groupBy(response.data.data))
      setCheckouts(groupBy(response.data.data));
    } catch (error) {
      if (error.response.status === 401) {
      } else if (error.response.data.code === 404) {
        setCheckouts([]);
      }
    }
  }

  const deleteCheckout = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/checkouts/${id}`);
      const updatedCheckouts = checkouts.filter((checkout) => checkout.id !== id);
      setCheckouts(updatedCheckouts);
    } catch (error) {
      // Handle error appropriately
      console.error("Error deleting checkout:", error);
    }
  }


  const getListOfOrders = () => {
    let gg = []
    checkouts && Object.keys(checkouts).forEach(key => {
      const value = checkouts[key][0];
      console.log(value);

      gg.push(<li onClick={() => setSelectedCartItems(checkouts[key])} className={`list-group-item d-flex justify-content-between align-items-center ${value.cart?.cartId === SelectedCartItems[0]?.cart?.cartId ? "active" : ""}`}>
        <div>
          <span style={{ backgroundColor: "blue" }} class="badge badge-primary badge-pill">ID: {value.cart.cartId}</span>
          <span style={{ marginLeft: "20px" }}>{value.user.email}</span>
        </div>
        <span style={{ backgroundColor: "gray" }} class="badge badge-secondary badge-pill">Items: {checkouts[key].length}</span>
      </li>)
    })
    return gg
  }

  return (
    <div>
      <AdminNavBar />

      <div className='container-md bg-white d-flex flex-column align-items-center'>
        <br />
        <h2>All Checkouts</h2>
        <br />

        <div style={{ width: "100%" }}>
          <div className='row'>
            <div className='col-md-6'>
              <ul class="list-group">
                {getListOfOrders()}
              </ul>
            </div>
            <div className='col-md-6'>
              {SelectedCartItems && SelectedCartItems.length > 0 && (
                <table className="category-table">
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center' }}>ID</th>
                      <th style={{ textAlign: 'center' }}>item name</th>
                      <th style={{ textAlign: 'center' }}>unit price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SelectedCartItems.map((checkout) => (
                      //console.log(checkout.item)
                      <tr key={checkout.id}>
                        <td>{checkout.item.itemId}</td>
                        <td>
                          {checkout.item.itemName}
                        </td>
                        <td>
                          {checkout.item.itemUnitPrice}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-9 mt-4'>
          {checkouts && checkouts.length > 0 && (
            <table className="category-table">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID</th>
                  <th style={{ textAlign: 'center' }}>Total</th>
                  <th style={{ textAlign: 'center' }}>Time</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {checkouts.map((checkout) => (
                  <tr key={checkout.id}>
                  
                    <td>{checkout.id}</td>
                    <td>
                      {checkout.total}
                    </td>
                    <td>
                      {checkout.orderTime}
                    </td>
                    <td>
                      <button onClick={() => deleteCheckout(checkout.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          )}

          {EmptyContent(checkouts)}
        </div></div>
    </div>
  )
}