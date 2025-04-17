import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { GlobleInfo } from "../../App";
import { SERVER_API_URL } from '../../server/server';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./index.css"; // Import the external CSS file

const CheckoutPage = () => {
    const { checkoutData } = useContext(GlobleInfo);
    const [addressList, setAddressList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addNewAddress, setAddNewAddress] = useState(true);

    const navigate = useNavigate();

    const [createformData, setCreateformData] = useState({
        pincode: "",
        city: "",
        state: "",
        house_flat_office_no: "",
        address: "",
        contact_name: "",
        phone_number: "",
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
    console.log("selectedAddress", selectedAddress)

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
            setAddressList(data); // Set the address list
            console.log("data data", data)
        } catch (error) {
            console.error("Error fetching address info:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (addressList.length > 0) {
            setSelectedAddress(addressList[0]);
        }
    }, [addressList]);

    // Handle new create input changes
    const newCreateHandleChange = (e) => {
        const { name, value } = e.target;
        setCreateformData({ ...createformData, [name]: value });
    };

    const handlePayment = async (amount) => {
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
            name: "EYE ZONES",
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
                            navigate(`/product-display/${"All"}`);
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

    
    // HandleDeliverHere
    const handleDeliverHereAndPayment = async () => {
        if (!selectedAddress) {
          alert("Please select an address");
          return;
        }
      
        const amount = checkoutData?.power?.selectedLensOrProducrPrice;
        if (!amount || isNaN(amount)) {
          alert("Invalid amount for payment");
          return;
        }
      
        console.log("Selected Address ID:", selectedAddress.addresses_id);
        console.log("Amount:", amount);
      
        try {
          const response = await axios.post(
            `${SERVER_API_URL}/api/payment/order`,
            { amount },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          const data = response.data;
          console.log("Order Created:", data);
      
          handlePaymentVerifyHere(data.data);
        } catch (error) {
          console.error("Payment initiation failed:", error);
        }
      };
      

    // handlePaymentVerifyHere Function
    const handlePaymentVerifyHere = async (data) => {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        const options = {
            key: "rzp_test_6nQE4mF6koMgtv",
            // amount: data.amount,
            amount: Math.round(data.amount * 100), // Convert to smallest unit
            currency: data.currency,
            name: "EYE ZONES",
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
                            checkoutData: checkoutData, // Adding checkoutData here
                            selectedAddressId: selectedAddress.addresses_id
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                        // Redirect to the home page after 3 seconds
                        setTimeout(() => {
                            navigate(`/product-display/${"All"}`);
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

    // Handle new address form submission
    const handleNewSubmitAddress = async (e) => {
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
                "http://localhost:8000/addaddress",
                createformData,
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
        <>
            {addressList.length > 0 ? (
                <div className="delivery-container">
                    {/* Header */}
                    <div className="delivery-header">
                        <span className="step-badge">{addressList.length}</span>
                        <span className="header-title">DELIVERY ADDRESS</span>
                    </div>

                    {/* Selected Address */}
                    {addressList.map((user) =>
                        <div className="address-section">
                            <div className="address-row">
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedAddress?.addresses_id === user.addresses_id} // or compare using id if available
                                    onChange={() => setSelectedAddress(user)}
                                    className="radio-btn"
                                />
                                <div className="address-info">
                                    <div className="info-row">
                                        <span className="name">{user.contact_name}</span>
                                        <span className="badge" style={{ textTransform: "uppercase" }}>{user.address_type}</span>
                                        <span className="phone">{user.mobile_num}</span>
                                    </div>
                                    <p className="full-address">01, {user.address}, {user.city}, {user.state} - <strong>{user.pincode}</strong></p>
                                </div>
                                <button className="edit-btn">EDIT</button>
                            </div>

                            <button className="deliver-btn" onClick={() => handleDeliverHereAndPayment()} style={{ opacity: selectedAddress?.addresses_id === user.addresses_id ? 1 : 0.5, cursor: selectedAddress?.addresses_id === user.addresses_id ? "pointer" : "not-allowed" }}>DELIVER HERE</button>
                        </div>
                    )}

                    {/* Add new address */}
                    <div className="add-new-address">
                        <span className="plus" onClick={() => setAddNewAddress(!addNewAddress)}>+</span>
                        <span className="add-text" onClick={() => setAddNewAddress(!addNewAddress)}>Add a new address</span>
                    </div>
                </div>
            ) : (null)}

            {addNewAddress && (
                <div className="new-address-bg-container">
                    <form onSubmit={handleNewSubmitAddress} className="new-address-container">
                        <div className="section-header">
                            <input type="radio" checked readOnly />
                            <span className="section-title">ADD A NEW ADDRESS</span>
                        </div>

                        <div className="form-grid">
                            <input
                                type="text"
                                name="contact_name"
                                placeholder="Name"
                                value={createformData.contact_name}
                                onChange={newCreateHandleChange}
                                required
                            />
                            <input
                                type="number"
                                name="mobile_num"
                                placeholder="10-digit mobile number"
                                value={createformData.mobile_num}
                                readOnly  // Makes the input non-editable
                            />

                            <input
                                type="number"
                                name="pincode"
                                value={createformData.pincode}
                                onChange={newCreateHandleChange}
                                placeholder="Pincode"
                                required
                            />
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Alternate Phone (Optional)"
                                value={createformData.phone_number}
                                onChange={newCreateHandleChange}
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Address (Area and Street)"
                                className="full-width"
                                value={createformData.address}
                                onChange={newCreateHandleChange}
                                required
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City/District/Town"
                                value={createformData.city}
                                onChange={newCreateHandleChange}
                                required
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={createformData.state}
                                onChange={newCreateHandleChange}
                                required
                            />

                            <input
                                type="text"
                                name="landmark"
                                placeholder="Landmark (Optional)"
                                value={createformData.landmark}
                                onChange={newCreateHandleChange}
                                required
                            />

                            <input
                                type="text"
                                name="house_flat_office_no"
                                placeholder="house_flat_office_no"
                                value={createformData.house_flat_office_no}
                                onChange={newCreateHandleChange}
                                required
                            />
                        </div>

                        <div className="address-type">
                            <label style={{ display: "flex", justifyContent: "center" }}>
                                <input
                                    type="radio"
                                    name="address_type"
                                    value="home"
                                    checked={createformData.address_type === "home"}
                                    onChange={newCreateHandleChange}
                                    style={{ marginRight: "4px" }}
                                />
                                Home (All day delivery)
                            </label>
                            <label style={{ display: "flex", justifyContent: "center" }}>
                                <input
                                    type="radio"
                                    name="address_type"
                                    value="work"
                                    checked={createformData.address_type === "work"}
                                    onChange={newCreateHandleChange}
                                    style={{ marginRight: "4px" }}
                                />
                                Work (Delivery between 10 AM - 5 PM)
                            </label>
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" type="submit">SAVE AND DELIVER HERE</button>
                            <button className="cancel-btn" onClick={() => setAddNewAddress(!addNewAddress)}>CANCEL</button>
                        </div>
                        <Toaster />
                    </form>
                </div>
            )}
        </>
    );
};

export default CheckoutPage;
