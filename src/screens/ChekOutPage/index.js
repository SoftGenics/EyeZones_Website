import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { GlobleInfo } from "../../App";
import { SERVER_API_URL } from '../../server/server';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./index.css"; // Import the external CSS file

const CheckoutPage = () => {
    const { checkoutData } = useContext(GlobleInfo);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pincode: "",
        city: "",
        state: "",
        house_flat_office_no: "",
        address: "",
        contact_name: "",
        mobile_num: checkoutData?.product?.mobile_number || "",
        address_type: "home",
        landmark: "",
    });
    const [message, setMessage] = useState(""); // Fix message variable

    // Redirect if checkoutData is empty
    useEffect(() => {
        if (!checkoutData || Object.keys(checkoutData).length === 0) {
            navigate(-1); // Go back to the previous page
        }
    }, [checkoutData, navigate]);
    const amount = checkoutData.power.selectedLensOrProducrPrice
    console.log("checkoutData", checkoutData)

    // Fetch address data from the API
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token is missing.");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get("http://localhost:8000/getalladdressinfo", config);
            const data = response.data;
            // setAddressList(data); // Set the address list

            // If data is available, update the form with the first address
            if (data.length > 0) {
                setFormData({
                    ...formData,
                    addresses_id: data[0]?.addresses_id || null, // Set addresses_id
                    pincode: data[0]?.pincode || "",
                    city: data[0]?.city || "",
                    state: data[0]?.state || "",
                    house_flat_office_no: data[0]?.house_flat_office_no || "",
                    address: data[0]?.address || "",
                    contact_name: data[0]?.contact_name || "",
                    mobile_num: formData.mobile_num, // Keep the mobile number as is
                    address_type: data[0]?.address_type || "home",
                    landmark: data[0]?.landmark || "",
                });
            }
        } catch (error) {
            console.error("Error fetching address info:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePayment = async (amount) => {
        // let amount = 100;
        try {
            const response = await axios.post(
                `${SERVER_API_URL}/api/payment/order`,
                { amount }, // Request body
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            console.log(data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: "rzp_test_6nQE4mF6koMgtv",
            // amount: data.amount,
            amount: Math.round(data.amount * 100), // Convert to smallest unit
            currency: data.currency,
            name: "Dceyewr",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${SERVER_API_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            checkoutData: checkoutData // Adding checkoutData here
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                        // Redirect to the home page after 3 seconds
                        setTimeout(() => {
                            navigate(`/product-display/${"Aviator"}`);
                        }, 2000); // 3 seconds delay
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    // Handle form submission
    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token is missing.");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(
                "http://localhost:8000/createOrUpdateAddress",
                formData,
                config
            );

            console.log("API Response:", response.data);
            setMessage(response.data.message || "Address submitted successfully!");
            handlePayment(amount)
        } catch (error) {
            console.error("Error submitting address:", error);
            setMessage("Failed to submit the address. Please try again.");
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Page</h2>
            <hr className="hr-line" />

            {/* Display Message */}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmitAddress} className="checkout-form">
                {/* Pincode */}
                <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter your pincode"
                        required
                        className="form-input"
                    />
                </div>

                {/* City */}
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                        className="form-input"
                    />
                </div>

                {/* State */}
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                        required
                        className="form-input"
                    />
                </div>

                {/* House/Flat/Office No */}
                <div className="form-group">
                    <label htmlFor="house_flat_office_no">House/Flat/Office No:</label>
                    <input
                        type="text"
                        id="house_flat_office_no"
                        name="house_flat_office_no"
                        value={formData.house_flat_office_no}
                        onChange={handleChange}
                        placeholder="Enter house/flat/office no."
                        required
                        className="form-input"
                    />
                </div>

                {/* Address */}
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                        className="form-textarea"
                    ></textarea>
                </div>

                {/* Contact Name */}
                <div className="form-group">
                    <label htmlFor="contact_name">Contact Name:</label>
                    <input
                        type="text"
                        id="contact_name"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        placeholder="Enter contact name"
                        required
                        className="form-input"
                    />
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                    <label htmlFor="mobile_num">Mobile Number:</label>
                    <input
                        type="text"  // Change input type to "text" for display only
                        id="mobile_num"
                        name="mobile_num"
                        value={formData.mobile_num}
                        readOnly  // Makes the input non-editable
                        className="form-input"
                    />
                </div>

                {/* Address Type */}
                <div className="form-group">
                    <label htmlFor="address_type">Address Type:</label>
                    <select
                        id="address_type"
                        name="address_type"
                        value={formData.address_type}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Landmark */}
                <div className="form-group">
                    <label htmlFor="landmark">Landmark:</label>
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Enter landmark (optional)"
                        className="form-input"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="form-submit">
                    Submit Address
                </button>
                <Toaster />
            </form>
        </div>
    );
};

export default CheckoutPage;
