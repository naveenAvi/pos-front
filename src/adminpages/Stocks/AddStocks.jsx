import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function AddStocks({ addstocks, setaddstocks, setStocks, stocks }) {
    const [StockName, setStockName] = useState(null);
    const [quantity, setquantity] = useState(null);

    useEffect(() => {
        if (addstocks.editing) {
            setStockName(addstocks.editing.name)
            setquantity(addstocks.editing.quantity)
        }
    }, [addstocks])


    const update = async (data) => {
        axios.put(`http://localhost:8080/api/v1/stock?id=${addstocks.editing.stock_id}`, data).then(function (response) {
            setaddstocks({ display: false })
            const updatedStocks = stocks.map((stock) =>
                stock.stock_id === addstocks.editing.stock_id ? {
                    ...stock,
                    name: StockName,
                    quantity
                } : stock
            );
            setStocks(updatedStocks);
        }).catch(function (error) {
            console.log(error);
        });

    }
    const createCategory = async (data) => {
        axios.post('http://localhost:8080/api/v1/stock', data).then(function (response) {
            setaddstocks({ display: false })
            setStocks([...stocks, {
                stock_id: response.data.data,
                name: StockName,
                quantity
            }])
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSUbmit = (e) => {
        const data = {
            name: StockName,
             quantity:parseInt(quantity)
        }
        e.preventDefault();
        if (addstocks.editing) {
            update(data)
            return
        } else {
            createCategory(data)
            return
        }
    }

    const hidemodal = () => {
        setaddstocks({ display: false })
    }

    return (
        <Modal show={addstocks.display} onHide={hidemodal}>
            <form onSubmit={handleSUbmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label htmlFor="categoryName">Stock Name:</label>
                    <input className='form-control' type="text" value={StockName} onChange={(e) => { setStockName(e.target.value) }} required />

                    <label htmlFor="categoryName">Stock Quantity:</label>
                    <input className='form-control' type="text" value={quantity} onChange={(e) => { setquantity(e.target.value) }} required />

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-secondary" onClick={hidemodal}>Close</button>
                    <button type="submit" class="btn btn-primary" >Save changes</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
