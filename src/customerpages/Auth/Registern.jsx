import axios from 'axios';
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterN() {
    const [loading, setLoading] = useState(false)

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, seterror] = useState("");


    const navigate = useNavigate();

    const register = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = {
            "firstName": FirstName,
            "lastName": LastName,
            "password": password,
            "email": email
        }
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/register", data);
            setLoading(false)
            navigate("/login");
        } catch (error) {
            setLoading(false)
            seterror("user already registered")
        }

    }

    const login = () => {
        navigate("/login")
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={register}>
                    <h3>Sign Up</h3>
                    <p style={{ color: "red" }}>{error}</p>
                    <div className="mb-3">
                        <label>First name</label>
                        <input value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            required />
                    </div>
                    <div className="mb-3">
                        <label>Last name</label>
                        <input value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            required />
                    </div>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="Last name"
                            required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                        {loading ?
                                <Spinner animation="border" role="status" style={{ color: "white", width: "15px", height: "15px" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> : "Sign up"}
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
