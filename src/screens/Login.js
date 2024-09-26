import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/footer.css'

import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://foodquest-back.onrender.com/api/loginuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();   //data came from backend
            console.log(json);

            if (!json.success) {
                alert("Enter correct email or password");
            } else {
                localStorage.setItem("userEmail", credentials.email)
                localStorage.setItem("authToken", json.authToken)
                alert("Login successful!");
                navigate('/');
            }
        } catch (error) {
            console.error("Enter correct email or password:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    };
    return (
        <div className="body-wrapper">

            <Navbar />
            <div className="content-wrapper">
                <div className='container mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={credentials.email}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={onChange}
                            // required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={credentials.password}
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={onChange}
                            />
                        </div>

                        <button type="submit" className="m-3 btn btn-primary">Submit</button>
                        <Link to='/signup' className='m-3 btn btn-danger'>Create New Account</Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div >
    )
}
