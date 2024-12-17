import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { UseCart } from "../context/CartContext";



const ProductDetails = () => {

    const { addToCart } = UseCart();

    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const response = await fetch(`http://localhost:5002/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details: ",error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>
    return(
        <div className="pt-16 min-h-screen text-white bg-black items-center flex flex-col">
            <h1 className="text-3xl">Product Details</h1>
            <img src={product.image_url} alt={product.name} className="pt-6 max-w-xs md:max-w-sm rounded-lg shadow-lg" />
            <h1 className="text-2xl">{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product)} className="bg-blue-500 py-1 px-2 rounded mt-2 hover:bg-blue-900">Add to Cart</button>
        </div>
    );
}

export default ProductDetails;