import React from "react";



const Home = () => {
  return (
    <div className="h-screen bg-cover bg-center"
    style={{ backgroundImage: `url('/src/assets/bgimage.jpg')` }}>
      <div className="pt-16 flex justify-center h-screen items-center">

        {/* <h1 className="text-white">Welcome to the Quotation App</h1>
        <p className="text-white">Create and manage quotations for sanitaryware products with ease.</p> */}
        <button className="text-white px-8 py-4 border-2 border-white rounded-lg bg-transparent backdrop-blur-sm text-xl justify-center top-1/3 hover:text-blue-300 hover:border-blue-300">Create a Quotation...</button>
      </div>
    </div>
  );
}

export default Home;
