import React from "react";
import { Routes, Route } from "react-router-dom";
import AddReview from './AddReview'; // Import AddReview component
import ViewBooks from './ViewBooks'; // Import ViewBooks component
import UserDeshboard from "./UserDeshboard"; // Import UserDashboard component
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer"; // Import Footer component
import Cookies from 'js-cookie';
import ViewsReviews from "./ViewReviews";

const CustomerHandling = () => {
    // Define the checkCookies function
    const checkCookies = () => {
        console.log("Checking cookies...");
        console.log(Cookies.get(customerId));
    };

    return (
        <div className="min-h-screen flex flex-col">
            
            <main className="flex-grow container mx-auto">
            <Routes>
                <Route path="/" element={<UserDeshboard />} />
                <Route path="/add-review" element={<AddReview />} /> {/* Add Review Route */}
                <Route path="/view-review" element={<ViewsReviews />} /> {/* View Reviews Route */}
            </Routes>

            </main>
            <button onClick={checkCookies} className="p-2 bg-blue-500 text-white rounded mt-4">
                Check Cookies
            </button>
            
        </div>
    );
};

export default CustomerHandling;
