import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const existingItem = state.find(
                (item) => item.id === action.id && item.size === action.size
            );

            // If the item already exists, update its quantity and price
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.id && item.size === action.size
                        ? {
                            ...item,
                            qty: item.qty + parseInt(action.qty), // Add to the existing quantity
                            price: item.price + parseFloat(action.price), // Add to the existing price
                        }
                        : item
                );
            }
            // Otherwise, add a new item to the cart
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: parseInt(action.qty),
                    size: action.size,
                    price: parseFloat(action.price),
                    img: action.img,
                },
            ];

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id && food.size === action.size) {
                    return {
                        ...food,
                        qty: food.qty + parseInt(action.qty), // Add the new quantity to the existing one
                        price: food.price + parseFloat(action.price), // Add the new price to the existing one
                    };
                }
                return food;
            });

        case "DROP":
            let emptyarr = []
            return emptyarr

        default:
            console.error("Error in Reducer: unknown action type", action.type);
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

