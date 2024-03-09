import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

export default function Invoice() {
    const [userdata, setUserData] = useState({})
    const [Items, setItems] = useState([])
    const [checkOuts, setcheckOuts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    console.log(checkOuts)


    const getItems = async () => {
        axios.get("http://localhost:8080/api/v1/items",).then(function (response) {
            setItems(response.data.data);
        }).catch(function (error) {
            //console.log(error);
        });
    }
    const getUsers = async () => {
        const usertoken = localStorage.getItem("token")
        axios.get(`http://localhost:8080/api/v1/user/get-all-user-data?token=${usertoken}`,).then(function (response) {
            setUserData(response.data.data);
        }).catch(function (error) {
            //console.log(error);
        });
    }

    useEffect(() => {
        getItems()
        getUsers()
        if (searchParams.get("items")) {
            setcheckOuts(JSON.parse(searchParams.get("items")))
        }
        window.print();  
    }, [])

    const getSum = (arr) =>{
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            sum = sum + parseInt(item.quantity) * parseInt(item.itemUnitPrice)
        }
        return sum
    }
    return (
        <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
            <div class="card">
                <div class="card-header p-4">
                    <div class="float-right"> 
                        Date: {new Date().toDateString()}</div>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-sm-6" style={{ textAlign: "left" }}>
                            <h3 class="text-dark mb-1">{userdata.firstName} {userdata.lastName}</h3>
                            <div>{userdata.role === "1" ? "admin" : "customer"}</div>
                            <div>Email: {userdata.email}</div>
                        </div>

                    </div>
                    <div class="table-responsive-sm">
                        <table class="table table-striped">
                            <thead>

                                <tr>
                                    <th class="center">#</th>
                                    <th>Item</th>
                                    <th class="right">Price</th>
                                    <th class="center">Qty</th>
                                    <th class="center">total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkOuts.map(item =>
                                    <tr>
                                        <td class="center">{item.itemId}</td>
                                        <td class="left strong">{item.itemName}</td>
                                        <td class="left">Rs:{item.itemUnitPrice}</td>
                                        <td class="right">{item.quantity}</td>
                                        <td class="right">Rs:{parseInt(item.quantity) * parseInt(item.itemUnitPrice)}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan={3}></td>
                                    <td>SubTotal</td>
                                    <td> Rs:{getSum(checkOuts)} </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td>Discount</td>
                                    <td> Rs:0.00 </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td>Total</td>
                                    <td> Rs:{getSum(checkOuts)} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
