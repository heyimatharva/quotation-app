import React from "react";
import { useEffect, useState } from "react";
import {UseCart} from '../context/CartContext.jsx';
import { Link } from "react-router-dom";

const Products = () => {

    const {addToCart} = UseCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const response = await fetch("http://localhost:5002/products");
                const data = await response.json();
                setProducts(data);
            } catch(error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    //pt-16 h-screen text-white bg-black 

    return (
        <div className="pt-16 min-h-screen text-white bg-black grid grid-cols-3 gap-4 p-4 border-black">
            {products.map((product) => (
                <div key={product.id} className="p-4 border rounded shadow border-black">
                    <Link to={`/products/${product.id}`}><img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded mb-2"  /></Link>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p>Price: ₹{product.price}</p>
                    <button className="bg-blue-500 py-1 px-2 rounded mt-2 hover:bg-blue-900" onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;