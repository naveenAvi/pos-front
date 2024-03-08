import React, { useEffect, useState } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import './../Admin.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import EmptyContent from '../../utils/EmptyContent';
import AddStocks from './AddStocks';
import { DeleteButton, UpdateButton } from '../../utils/Buttons';

export default function AdminStocks() {
  const [addStocks, setaddStocks] = useState({ display: false })
  const [loadingBTN, setloadingBTN] = useState({ delete: true, loadingID: null })
  const [stocks, setStocks] = useState([{
    id: 1, name: "asdfhusahdf"
  }]);

  useEffect(() => {
    getStocks();
  }, [])

  const navigate = useNavigate();


  const getStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/stock/get-all");
      setStocks(response.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }


  const handleDelete = async (stockId) => {
    setloadingBTN({ delete: true, loadingID:stockId })
    try {
      await axios.delete(`http://localhost:8080/api/v1/stock?id=${stockId}`);
      const updatedStocks = stocks.filter((stock) => stock.stock_id !== stockId);
      setStocks(updatedStocks);
      setloadingBTN({ delete: false, loadingID:null })
    } catch (error) {
      setloadingBTN({ delete: false, loadingID:null })
      if (error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };


  return (
    <div>
      <AdminNavBar />
      <div className='container-md bg-white d-flex flex-column align-items-center'>
        <Card className='border-none' style={{ border: "none", width: "100%" }}>
          <Row className='d-flex flex-column align-items-center mt-4'>
            <div className='col-md-8 px-4' style={{ backgroundColor: "black", color: 'white', padding: "10px", borderRadius: "5px" }}>
              <div className='d-flex flex-row ' style={{ justifyContent: "space-between" }}>
                <h3>Stocks</h3>
                <div>
                  <Button onClick={() => setaddStocks({ display: true })}>+ Add stocks</Button>
                </div>
              </div>
            </div>
          </Row>
        </Card>
        <div className='col-md-9 mt-4'>
          {stocks && stocks.length > 0 && (
            <table className="category-table">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '30%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.stock_id}</td>
                    <td>
                      {stock.name}
                    </td>
                    <td>
                      {stock.qty}
                    </td>
                    <td>
                      <UpdateButton onClick={setaddStocks} item={{ display: true, editing: stock }} />
                      <DeleteButton shouldLoad={loadingBTN.loadingID === stock.stock_id} loadingBTN={loadingBTN} onClick={handleDelete} item={stock.stock_id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {EmptyContent(stocks)}
        {/* <div className="admin-category-container">
                    <form onSubmit={createCategory}>
                        <h2>Create a new Category</h2>
                        <label htmlFor="categoryName">Category Name:</label>
                        <input type="text" onChange={(e) => { setNewCategory(e.target.value) }} required />

                        <button type="submit">Create Category</button>
                    </form>
                </div> */}


      </div>
      <AddStocks stocks={stocks} setStocks={setStocks} addstocks={addStocks} setaddstocks={setaddStocks} />
    </div>
  )
}