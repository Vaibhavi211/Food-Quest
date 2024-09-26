import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3 " style={{ color: "white" }}>The Cart is Empty!</div>
            </div>
        );
    }


    const handleRemove = (index) => {
        dispatch({ type: 'REMOVE', index: index });
    };


    const handleReduceQuantity = (index) => {
        const food = data[index];
        if (food.qty > 1) {
            // Update the quantity and price if the quantity is more than 1
            dispatch({
                type: 'UPDATE',
                id: food.id,
                size: food.size,
                qty: -1, // Subtract 1 from the quantity
                price: -food.price / food.qty // Adjust the price accordingly
            });
        } else {
            // If the quantity is 1, remove the item completely
            handleRemove(index);
        }
    };

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem('userEmail');

        let response = await fetch('https://foodquest-back.onrender.com/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString(),
            }),
        });

        if (response.status === 200) {
            dispatch({ type: 'DROP' });
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row" style={{ color: "white" }}>{index + 1}</th>
                                <td style={{ color: "white" }}>{food.name}</td>
                                <td style={{ color: "white" }}>{food.qty}</td>
                                <td style={{ color: "white" }}>{food.size}</td>
                                <td style={{ color: "white" }}>₹{food.price}</td>
                                <td>
                                    {/* Reduce Quantity Button */}
                                    <button
                                        type="button"
                                        className="btn p-0 text-warning me-2"
                                        onClick={() => handleReduceQuantity(index)}
                                    >
                                        Reduce
                                    </button>
                                    {/* Remove Item Button */}
                                    <button
                                        type="button"
                                        className="btn p-0 text-danger"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2" style={{ color: "white" }}>Total Price: ₹{totalPrice}/-</h1>
                </div>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
