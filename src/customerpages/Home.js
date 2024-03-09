import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [items, setItems] = useState(null);
    const [OrderSaved, setOrderSaved] = useState(false);
    const [checkouts, setCheckouts] = useState([
        {
            itemId:1,
            itemName:"hello",
            quantity:"500",
            itemUnitPrice:"200",
        },
        {
            itemId:1,
            itemName:"hello",
            quantity:"500",
            itemUnitPrice:"200",
        }
    ]);
    const [total, setTotal] = useState(0);
    const [cartID, setcartID] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        getItems();
        const tempcart = localStorage.getItem("cartid")
        if (tempcart) {
            setcartID(parseInt(tempcart))
        }

    }, [])

    const addItemToCard = (item) => {
        const alreadyadded = checkouts.findIndex(Addedproduct => Addedproduct.itemId === item.itemId)
        if (alreadyadded > -1) {
            let temparr = JSON.parse(JSON.stringify(checkouts))
            temparr[alreadyadded].quantity = temparr[alreadyadded].quantity + 1
            setCheckouts(temparr)
        } else {
            setCheckouts([...checkouts, { ...item, quantity: 1 }]);
        }

        let itemTotal = total + item.itemUnitPrice;
        setTotal(itemTotal);
    }

    const getItems = async () => {
        axios.get("http://localhost:8080/api/v1/items",).then(function (response) {
            setItems(response.data.data);
        }).catch(function (error) {
            //console.log(error);
        });
    }


    const saveOrderprocess = async (item) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/cart-item?cartId=${item.cartId}&itemId=${item.itemId}&quantity=${item.quantity}`, item);
        } catch (error) {
        }
    }

    const saveOrder = async () => {
        await checkouts.forEach(async item => {
            await saveOrderprocess({ cartId: `POS-C-1`, itemId: item.itemId.toString(), quantity: item.quantity.toString() })
        });
        setOrderSaved(true)
        localStorage.setItem("cartid", cartID + 1)
        setcartID(cartID + 1)
    }

    const PrintInvoice = () => {
        setOrderSaved(false)
        navigate("/invoice?items=" + encodeURIComponent(JSON.stringify(checkouts)))
    }


    return (
        <div>
            <NavBar />
            <div className='container'>
                <div className='heading text-center'>
                    <h1></h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='col-md-12'>
                        <h1>Items</h1>
                        <div className='row'>
                            {items && items.map(item => (
                                <div key={item.id} className=' mb-3 col-6'>
                                    <div className='products shadow-sm boardered bg-light px-3 py-3 text-center' style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <img src='project.jpg' style={{ width: '40%' }} />
                                        <h5 style={{ textAlign: 'left' }}>{item.itemName}</h5>
                                        <h6 style={{ textAlign: 'left', marginTop: "20px" }} >Rs. {item.itemUnitPrice}</h6>
                                        <button
                                            onClick={() => addItemToCard(item)}
                                            className='btn btn-primary'
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <h1>Cart</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkouts.map(items => (
                                <tr key={items.itemId}>
                                    <td>{items.itemId}</td>
                                    <td>{items.itemName}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.itemUnitPrice}</td>
                                    <td>{items.quantity * items.itemUnitPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={4}>Total (Rs.)</th>
                                <th>{total}</th>
                            </tr>
                        </thead>
                    </table>
                    <button className='btn btn-primary' onClick={saveOrder}>Save Order</button>
                    {OrderSaved?
                    <button className='btn btn-primary' onClick={PrintInvoice}>Print Invoice</button>:""}
                </div>
            </div>
        </div>
    )
}