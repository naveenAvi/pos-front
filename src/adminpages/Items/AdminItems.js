import React, { useEffect, useState } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import '../Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Row } from 'react-bootstrap';
import AddItem from './AddItem';
import EmptyContent from '../../utils/EmptyContent';
import { DeleteButton, UpdateButton } from '../../utils/Buttons';

export default function AdminItems() {
  const [addItem, setaddItem] = useState({ display: false });
  const [loadingBTN, setloadingBTN] = useState({ delete: true, loadingID: null })

  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([{
    id: 1, name: "asdfhusahdf"
  }]);
  const [stocks, setStocks] = useState([{
    id: 1, name: "asdfhusahdf"
  }]);

  useEffect(() => {
    getCategories();
    getStocks();
    getItems();
  }, [])

  const navigate = useNavigate();
  console.log(items)

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/categories");
      setCategories(response.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

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

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/items");
      setItems(response.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const handleEdit = (item) => {
    setaddItem({ display: true, editing: item })
  };

  const handleDelete = async (itemId) => {
    setloadingBTN({ delete: true, loadingID: itemId })
    try {
      await axios.delete(`http://localhost:8080/api/v1/items?id=${itemId}`);
      const updatedItems = items.filter((item) => item.itemId !== itemId);
      setItems(updatedItems);
      setloadingBTN({ delete: false, loadingID: itemId })

    } catch (error) {
      setloadingBTN({ delete: false, loadingID: itemId })

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
                <h3>Items</h3>
                <div>
                  <Button onClick={() => setaddItem({ display: true })} >+ Add Item</Button>
                </div>
              </div>
            </div>
          </Row>
        </Card>

        <br></br>

      
        {items && items.length > 0 && (
          <table className="category-table">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemId}</td>
                  <td>
                    {item.itemName}
                  </td>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    {item.itemUnitPrice}
                  </td>
                  <td>
                    <UpdateButton onClick={handleEdit} item={item} />
                    <DeleteButton
                      shouldLoad={loadingBTN.loadingID === item.itemId}
                      loadingBTN={loadingBTN}
                      onClick={handleDelete}
                      item={item.itemId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {EmptyContent(items)}
      <AddItem addItem={addItem} Items={items} setItems={setItems} setaddItem={setaddItem} stocks={stocks} categories={categories} />
    </div>
  )
}
