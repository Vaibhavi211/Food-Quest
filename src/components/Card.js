import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const options = props.options;
    const priceOption = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOption[0]);

    const finalPrice = qty * parseFloat(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleAddToCart = async () => {
        // Find the food item in the cart that matches the current one by ID and size
        let food = data.find(item => item.id === props.foodItem._id && item.size === size);

        if (food) {
            // If the food already exists in the cart, update its quantity and price
            await dispatch({
                type: 'UPDATE',
                id: props.foodItem._id,
                size: size, // Ensure size is passed to match the correct item
                price: finalPrice, // The price of the current selected quantity and size
                qty: qty // The quantity to add to the existing one
            });
        } else {
            // If the food doesn't exist, add it as a new item
            await dispatch({
                type: 'ADD',
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img
            });
        }
    };

    return (
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px', backgroundColor: 'rgb(240, 224, 210)' }}>
            <img
                src={props.foodItem.img}
                className="card-img-top"
                alt={props.foodItem.name}
                style={{ height: '120px', objectFit: 'fill' }}
            />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text">-----------------------</p>
                <div className="container w-100">
                    {/* Quantity Selector */}
                    <select
                        className="m-2 h-100 bg-success rounded"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                    >
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    {/* Size Selector */}
                    <select
                        className="m-2 h-100 bg-success rounded"
                        value={size}
                        ref={priceRef}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        {priceOption.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>

                    {/* Total Price */}
                    <div className="d-inline h-100 fs-5">
                        ₹{finalPrice} /-
                    </div>
                </div>
                <hr />
                <button className="btn btn-success justify-content ms-2" onClick={handleAddToCart}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
}

