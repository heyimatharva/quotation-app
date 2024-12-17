import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

// location.pathname === '/products' || 

function Navbar(){
    const location = useLocation();
    
    return (
        <nav className=" absolute top-0 justify-between bg-black w-full z-10 bg-transparent h-17">
            <ul className='flex'>
                <li className="p-2 text-white hover:text-blue-300 text-xl"><Link to="/">Home</Link></li>
                <li className="p-2 pl-10 text-white hover:text-blue-300 text-xl"><Link to="/products">Products</Link></li>
                <li className="p-2 pl-5 text-white hover:text-blue-300 text-xl"><Link to="/quotations">Quotations</Link></li>
                {location.pathname.startsWith('/products') && (
                    <div className="p-2 pr-10 text-white hover:text-blue-300 text-xl ml-auto"><Link to="/cart">
                        <button>
                            <ShoppingCartIcon className="h-8 w-8 text-white" />
                        </button>
                        </Link></div>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;