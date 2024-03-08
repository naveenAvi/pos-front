import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminNavBar() {

    const navigate = useNavigate();

    useEffect(() => {
        const usertoken = localStorage.getItem("token")
        const role = localStorage.getItem("role")
        if (!usertoken || role !== "admin") {
            navigate("/login")
        } else {
            axios.defaults.headers.common['Authorization'] = `${usertoken}`;
        }
    }, [])


    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a class="navbar-brand" href="">POS Software</a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" aria-current="page" to="/admin" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/admin/categories'>Categories</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/admin/items' >Items</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/stocks" >Stocks</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/orders" >Orders</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/customers" >Customers</Link>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <button class="btn btn-primary" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
