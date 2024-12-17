import React, { useState } from "react";
import { UseCart } from '../context/CartContext.jsx';
import { jsPDF } from "jspdf";
import axios from "axios";

const Quotation = () => {
    const { cart } = UseCart();
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [showQuotation, setShowQuotation] = useState(false);

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleGenerateQuotation = async () => {
        if(customerName.trim() === "" || mobileNumber.trim() === ""){
            alert("Please fill all the fields");
            return;
        }
        setShowQuotation(true);

        const payload = {
            customerName,
            mobileNumber,
            date: new Date().toISOString(),
            cartDetails : cart,
            totalAmount,
        };

        console.log("Payload: ", payload);

        try {
            const response = await axios.post("http://localhost:5002/quotations", payload);
            console.log("after API call");
            if(response.status === 201){
                console.log("Response: ", response.data);
            }
        } catch(error) {
            console.error("Error generating quotation: ",error);
            alert("Failed to store the quotation.");
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Quotation", 10, 10);

        doc.text(`Name: ${customerName}`, 10, 20);
        doc.text(`Mobile: ${mobileNumber}`, 10, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 40);

        let startY = 50;

        cart.forEach((item, index) => {

            const img = new Image();
            // const img = item.image_url;
            img.crossOrigin = "Anonymous";
            img.src = item.image_url;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const targetWidth = 40;
                const targetHeight = 40;
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                const base64Image = canvas.toDataURL("image/png");
                let yOffset = startY + index * 50;

                // if (yOffset + targetHeight + 20 > doc.internal.pageSize.height) {
                //     doc.addPage();
                //     yOffset = 20; // Reset Y position for the new page
                // }

                doc.addImage(img, "PNG", 10, yOffset, targetWidth, targetHeight);

                doc.text(`Product: ${item.name}`, 55, yOffset + 10);
                doc.text(`Quantity: ${item.quantity}`, 55, yOffset + 20);
                doc.text(`Price: ${item.price}`, 55, yOffset + 30);

                if (index === cart.length - 1) {
                    let totalY = yOffset + targetHeight + 20; // Position for total amount

                    // if (totalY > doc.internal.pageSize.height) {
                    //     doc.addPage();
                    //     totalY = 20; // Reset Y position for total
                    // }

                    doc.setFontSize(14);    
                
                    doc.text(`Total Amount: ₹${totalAmount}`, 10, totalY);
                }

            };
        });
    
    //     if (index === cart.length - 1) {
    //         const totalY = yOffset + 40; // Position for total amount
    //         doc.setFontSize(14);    
        
    // doc.text(`Total Amount: ₹${totalAmount}`, 10, startY + cart.length * 50 + 10);
    //     }
    setTimeout(() => doc.save("quotation.pdf"), 1000);
        
    };

    
    return(
        <div className="pt-16 bg-black text-white min-h-screen">
            <h1>Quotation</h1>
            <div className="">
                <input type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 rounded mb-2 text-black pr-5 mr-5"
                 />
                <input type="text" 
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)} 
                className="p-2 rounded mb-2 text-black"
                />
                
            </div>
            <button onClick={handleGenerateQuotation} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mb-8 mt-3">Generate Quotation</button>

            {showQuotation && (
                <>
                <h1 className="text-xl font-semibold mb-2">{customerName}</h1>
                <h2 className="text-xl font-semibold mb-4">{mobileNumber}</h2>
                <h2 className="text-xl font-semibold mb-4">{new Date().toLocaleDateString()}</h2>

                <div className="p-4 rounded shadow">
                    {cart.map((item) => (
                        <div key={item.id}
                        className="flex items-center mb-4 border-b border-gray-300 pb-4"
                        >
                            <img src={item.image_url}
                             alt={item.name}
                             className="w-16 h-16 object-cover rounded mr-4" 
                            />
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>

                        </div>
                    ))}
                    <div className="text-right font-bold text-lg">
                        Total Amount: ₹{totalAmount}
                    </div>
                </div>
                <button onClick={generatePDF}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 text-white font-bold m-6">
                    Generate PDF
                </button>
                </>
            )}

        </div>
    );
};

export default Quotation;