import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal" // Make sure this path is correct for your Modal component
import Cart from '../screens/Cart';
import '../App.css'; // Ensure this import is necessary

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    let navigate = useNavigate();
    let data = useCart();
    let handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">
                        Food Quest
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem('authToken') && (
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {!localStorage.getItem('authToken') ? (
                            <div>
                                <Link className="btn bg-white mx-1 text-success" to="/login">
                                    Login
                                </Link>
                                <Link className="btn bg-white mx-1 text-success" to="/signup">
                                    SignUp
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div
                                    className="btn bg-white mx-1 text-success"
                                    onClick={() => {
                                        setCartView(true);
                                    }}
                                >
                                    MyCart &nbsp;
                                    {data.length > 0 ? (
                                        <Badge pill bg="danger">
                                            {data.length}
                                        </Badge>
                                    ) : null}

                                </div>
                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart />
                                    </Modal>
                                )}
                                <div className="btn bg-white mx-1 text-success" onClick={handleLogout}>
                                    LogOut
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
