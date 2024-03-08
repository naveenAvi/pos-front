import axios from 'axios';
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginN() {
    const [loading, setLoading] = useState(false)
    const [UserName, setUserName] = useState("tasheelaa.info@gmail.com");
    const [password, setPassword] = useState("12345");

    const navigate = useNavigate();

    const login = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = {
            "username": UserName,
            "password": password
        }
        const response = await axios.post("http://localhost:8080/login", data);
        setLoading(false)
        if (response.status === 200) {
            localStorage.setItem("token", response.headers.authorization);
            axios.defaults.headers.common['Authorization'] = `${response.headers.authorization}`;
            if (UserName === "tasheelaa.info@gmail.com") {
                localStorage.setItem("role", "admin");
                window.location.href = "/admin"
            } else {
                localStorage.setItem("role", "customer");
                window.location.href = "/"
            }

        } else {
            console.log("login error!");
        }
    }

    const register = () => {
        navigate("/register");
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={login} >
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            {loading ?
                                <Spinner animation="border" role="status" style={{ color: "white", width: "15px", height: "15px" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> : "Log in"}

                        </button>
                        <Link to="/register">Create account</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
