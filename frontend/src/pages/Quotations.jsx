import React from "react";
import { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Quotations = () => {

    const [quotations, setQuotations] = useState([]);

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const response = await fetch(`${backendUrl}/quotations`);
                const result = await response.json();
                console.log(result);
                if(result.success) {
                    setQuotations(result.data);
                } else {
                    console.error("Failed to fetch quotations");
                }

            } catch (error) {
                console.error("Error fetching quotations: ", error);
            }
        };
        fetchQuotations();
    }, []);
    return(
        <div className="pt-16 min-h-screen text-white bg-black">
            <h1 className="text-3xl font-bold pl-5">Quotations</h1>
            <ul>
                {quotations.map((quotation) => (
                    <li key={quotation.id} className="p-3 border rounded-md border-blue-300 m-2">
                        <div>
                            <strong>{quotation.customername}</strong> - {new Date(quotation.date).toLocaleDateString()}
                        </div>
                        <div>Total Amount: ₹{quotation.totalamount}</div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quotations;