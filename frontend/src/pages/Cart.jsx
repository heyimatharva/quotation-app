import React from 'react';
import { UseCart } from '../context/CartContext.jsx';
import {TrashIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Cart = () => {

    const { cart, updateQuantity, removeFromCart } = UseCart();

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    console.log("The cart state: ", cart);

//style={{width: '50px'}}
    return (
        <div className='pt-16 min-h-screen text-white bg-black '>
            <h1 className='text-3xl p-4'>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className='flex items-center space-x-4 p-4'>
                            <img src={item.image_url} alt={item.name} style={{width: '50px'}} />
                            <div>
                                <h2>{item.name}</h2>
                                <p>Price: ₹ {item.price}</p>
                            </div>
                            <div>
                                <button onClick={() => updateQuantity(item.id, false)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, true)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}><TrashIcon className='text-red-600 h-4 w-4' /></button>
                        </div>
                    ))}
                    <h3 className='p-4'>Total Amount: ₹ {totalAmount}</h3>
                    <Link to="/quotation"><button className='m-4 bg-green-500 text-white px-4 py-2'>Proceed to Quotation</button></Link>
                </>
            
            )}
        </div>
    );
}

export default Cart;