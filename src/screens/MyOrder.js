import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true); // For showing a loading state

    // Fetch user order data
    const fetchMyOrder = async () => {
        try {
            const response = await fetch("https://foodquest-back.onrender.com/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: localStorage.getItem('userEmail') })
            });

            const result = await response.json();
            setOrderData(result.orderData?.order_data || []); // Handle cases where orderData might be empty or undefined
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <h2 className="text-center mb-4">My Orders</h2>

                {/* Show a loading spinner while fetching data */}
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {/* Check if orderData is available */}
                        {orderData.length > 0 ? (
                            orderData.slice(0).reverse().map((order, orderIndex) => (
                                <div key={orderIndex} className="col-12 mb-4">
                                    {/* Display Order Date */}
                                    <div className="order-date text-center mb-3">
                                        <h5>Order Date: {order[0]?.Order_date}</h5>
                                        <hr />
                                    </div>

                                    <div className="row">
                                        {order.map((item, itemIndex) => (
                                            item.Order_date ? null : (
                                                <div key={itemIndex} className="col-12 col-md-6 col-lg-4">
                                                    <div className="card h-100">
                                                        <img src={item.img} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <p className="card-text">
                                                                Quantity: {item.qty} <br />
                                                                Size: {item.size} <br />
                                                                Price: ₹{item.price}
                                                            </p>
                                                        </div>
                                                        <div className="card-footer">
                                                            <small className="text-muted">Ordered on {order[0]?.Order_date}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <h4>No Orders Found</h4>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
