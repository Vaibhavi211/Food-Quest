import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/footer.css'

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://foodquest-back.onrender.com/api/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                // If the user already exists, alert the user
                if (response.status === 400 && json.message === "User with this email already exists") {
                    alert("An account with this email already exists. Please log in.");
                } else {
                    alert("Enter valid credentials");
                }
            } else {
                alert("Registration successful!");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="body-wrapper">
            <Navbar />
            <div className="content-wrapper">
                <div className='container mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={credentials.name}
                                placeholder="Enter Name"
                                onChange={onChange}
                            />
                        </div>
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
                        <div className="form-group mb-3">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name='location'
                                value={credentials.location}
                                id="location"
                                placeholder="Location"
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="m-3 btn btn-primary">Submit</button>
                        <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
