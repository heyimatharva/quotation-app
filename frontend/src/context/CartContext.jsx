import React, { createContext, useContext, useState, useEffect} from "react";

const CartContext = createContext();

export const UseCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

const addToCart = (product) => {
    setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if(existingProduct){
            return prevCart.map((item) => 
            item.id === product.id ? {...item, quantity: item.quantity + 1} : item);

        } else {
            return [...prevCart, {...product, quantity: 1}];
        }
    });
    
};

const updateQuantity = (id, increment) => {
    setCart((prevCart) => 
    prevCart.map((item) => item.id === id
    ? {...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1))}
    : item)
    );
};

const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart}}>
        {children}
    </CartContext.Provider>
);

};

export default CartProvider;
