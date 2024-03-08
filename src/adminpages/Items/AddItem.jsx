import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
const itemde = {
    name: "",
    id: "",
    price: "",
    categoryId: "",
    stockId: ""
}

export default function AddItem({ addItem, setaddItem, stocks, categories, Items, setItems }) {
    const [itemdetails, setitemdetails] = useState(itemde)

    useEffect(() => {
        if (addItem.editing) {
            setitemdetails(
                {
                    ...addItem.editing,
                    categoryId: addItem.editing.category.categoryId,
                    stockId:addItem.editing.stock.stock_id,
                    itemDescription:addItem.editing.description
                }
            )
        } else {
            setitemdetails(itemde)
        }
    }, [addItem])



    const update = async (data) => {
        axios.put(`http://localhost:8080/api/v1/items?id=${itemdetails.itemId}&categoryId=${itemdetails.categoryId}&stockId=${itemdetails.stockId}`, data).then(function (response) {
            setaddItem({ display: false })
            const updateItem = Items.map((singleItem) =>
                singleItem.itemId === addItem.editing.itemId ? {...data, itemId:singleItem.itemId } : singleItem
            );
            setItems(updateItem);
        }).catch(function (error) {
            console.log(error);
        });

    }
    const createCategory = async (data) => {
        axios.post(`http://localhost:8080/api/v1/items?categoryId=${itemdetails.categoryId}&stockId=${itemdetails.stockId}`, data).then(function (response) {
            setaddItem({ display: false })
            let jj = JSON.parse(JSON.stringify(Items))
            jj.push(data)
            setItems(jj)
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSUbmit = (e) => {
        const data = {
            activeState: true,
            itemDescription: itemdetails.itemDescription,
            description: itemdetails.itemDescription,
            itemName: itemdetails.itemName,
            itemQuantity: 0,
            itemUnitPrice: parseInt(itemdetails.itemUnitPrice),
            
        }
        e.preventDefault();
        if (addItem.editing) {
            update(data)
            return
        } else {
            createCategory(data)
            return
        }
    }
    const hidemodal = () => {
        setaddItem({ display: false })
    }
    const changedetails = (fieldname, fieldvalue) => {
        setitemdetails((prevstate) => { return { ...prevstate, [fieldname]: fieldvalue } })
    }

    return (
        <Modal show={addItem.display} onHide={hidemodal}>
            <Form onSubmit={handleSUbmit} >
                <Modal.Header closeButton>
                    <Modal.Title>Add new stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label htmlFor="categoryName">Item Name:</label>
                    <input className='form-control' type="text" value={itemdetails.itemName} name='itemName' onChange={(e) => { changedetails(e.target.name, e.target.value) }} required />

                    <label htmlFor="categoryName">Item Price:</label>
                    <input className='form-control' type="text" value={itemdetails.itemUnitPrice} name='itemUnitPrice' onChange={(e) => { changedetails(e.target.name, e.target.value) }} required />

                    <label htmlFor="categoryName">Item Description:</label>
                    <textarea className='form-control' type="text" value={itemdetails.itemDescription} name='itemDescription' onChange={(e) => { changedetails(e.target.name, e.target.value) }} required />

                    <label htmlFor="categoryName">Category Id:</label>
                    <select disabled={addItem.editing ? true : false} class="form-select mb-2" value={itemdetails.categoryId} id="categoryId" name='categoryId' onChange={(e) => { changedetails(e.target.name, e.target.value) }} required>
                        <option>select</option>
                        {categories && categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>{category.category}</option>
                        ))}
                    </select>

                    <label htmlFor="stockId">Stock ID:</label>
                    <select disabled={addItem.editing ? true : false} class="form-select" value={itemdetails.stockId} id="stockId" name='stockId' onChange={(e) => { changedetails(e.target.name, e.target.value) }} required>
                        <option>select</option>
                        {stocks && stocks.map((stock) => (
                            <option key={stock.stockId} value={stock.stock_id}>{stock.name}</option>
                        ))}
                    </select>
                    <br />

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-secondary" onClick={hidemodal}>Close</button>
                    <button type="submit" class="btn btn-primary" >{addItem.editing ? "Update Item" : "Add Item"}</button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}
