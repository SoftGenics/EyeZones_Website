import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SERVER_API_URL } from '../../server/server';
import { SERVER_URL } from '../../server/server';
import axios from 'axios'; // Import Axios
import { GlobleInfo } from '../../App';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import tdesign from '../../Assets/images/tdesign_cart.png';
import { ColorRing } from 'react-loader-spinner';
import { IoShareSocialOutline } from "react-icons/io5";
import forword from '../../Assets/images/forword.png';
import backword from '../../Assets/images/backword.png';
import { IoClose } from 'react-icons/io5';
import { FaFacebookF, FaTwitter, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import wishlist from '../../Assets/images/wishlist.svg'
import wishlist1 from '../../Assets/images/wishlist1.svg'

import "./index.css"; // Import the corresponding CSS file
import Header from "../../components/Header";
import FaqPage from '../../screens/FaqPage'

const reviews = [
    { id: 1, user: "Nasrin Ahmed", comment: "Very perfect and beautiful.", date: "3 days ago", rating: 5 },
    { id: 2, user: "Nasrin Ahmed", comment: "Very perfect and beautiful.", date: "3 days ago", rating: 5 },
    { id: 3, user: "Nasrin Ahmed", comment: "Very perfect and beautiful.", date: "3 days ago", rating: 5 },
    { id: 4, user: "Nasrin Ahmed", comment: "Very perfect and beautiful.", date: "3 days ago", rating: 5 }
];

// const suggestedFrames = [
//     { id: 1, name: "Black Full Rim Rectangle", price: 2750, color: "Black", material: "Plastic", rating: 5 },
//     { id: 2, name: "Black Full Rim Rectangle", price: 2750, color: "Black", material: "Plastic", rating: 5 },
//     { id: 3, name: "Black Full Rim Rectangle", price: 2750, color: "Black", material: "Plastic", rating: 5 },
//     { id: 4, name: "Black Full Rim Rectangle", price: 2750, color: "Black", material: "Plastic", rating: 5 }
// ];


const lensData = {
    Plano: [
        { type: "Blue Block", price: 800 },
        { type: "Photo CR", price: 1800 },
        { type: "Tinteble", price: 1200 }
    ],
    SingleVision: [
        { type: "Blue Block", price: 800 },
        { type: "Photo CR", price: 1800 },
        { type: "Tinteble", price: 1200 }
    ],
    Bifocal: [
        { type: "Arc", price: 1500 },
        { type: "Blue Block", price: 1800 },
        { type: "Photo CR", price: 1800 },
        { type: "Drivex", price: 3200 }
    ],
    Progressive: [
        { type: "Arc", price: 2500 },
        { type: "Blue Block", price: 2800 },
        { type: "Photo CR", price: 3600 },
        { type: "Drivex", price: 4000 }
    ]
}


const ProductDetails = () => {
    const history = useNavigate();
    const { product_id } = useParams();
    const [mobile_num, setMobile_num] = useState("");
    const { getProductCount, saveCheckoutData, updateCounts } = useContext(GlobleInfo)
    const [item, setItem] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPowerPopup, setShowPowerPopup] = useState(false);
    const [showPopupContainer, setShowPopupContainer] = useState(true);
    const [showPopuplensePrice, setShowPopuplensePrice] = useState(false);
    const [selectLansType, setSelectLansType] = useState('')
    const [selectedLens, setSelectedLens] = useState({ type: '', price: '' });
    const [leftLens, setLeftLens] = useState({ SPH: "-0.00", CYL: "-0.25" });
    const [rightLens, setRightLens] = useState({ SPH: "-0.00", CYL: "-0.25" });
    const [add, setAdd] = useState('')
    const [axis, setAxis] = useState('')
    const [showAll, setShowAll] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null); // State for selected color

    const [showSharePopup, setShowSharePopup] = useState(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const shareUrl = `${SERVER_URL}/product-item/${product_id}`;
    const [copied, setCopied] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (item?.result?.frameColor && item?.result?.lenshColor) {
            try {
                const frameColors = JSON.parse(item.result.frameColor) || [];
                const lensColors = JSON.parse(item.result.lenshColor) || [];

                if (Array.isArray(frameColors) && frameColors.length > 0) {
                    const [frameName, frameHex] = Object.entries(frameColors[0])[0] || ["Unknown", "#ffffff"];
                    const lensObj = lensColors[0] || { "Default Lens": "#000000" };
                    const [lensName, lensHex] = Object.entries(lensObj)[0] || ["Default", "#000000"];

                    setSelectedColor({ frameName, frameHex, lensName, lensHex });
                }
            } catch (error) {
                console.error("Error parsing colors:", error);
            }
        }
    }, [item]); // Runs when item changes

    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual token key
        if (token) {
            // Decode the token to get user information
            const decodedToken = jwtDecode(token);
            const mobile_num = decodedToken.mobile_num;
            setMobile_num(mobile_num)
            // console.log("Decoded Mobile Number:", mobile_num);
        }
    }, []);

    // Function to handle sharing
    const handleShare = (platform) => {
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item?.result?.product_name)}`;
                break;
            case "email":
                url = `mailto:?subject=Check out this product&body=${encodeURIComponent(shareUrl)}`;
                break;
            case "whatsapp":
                url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, "_blank");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset text after 2 seconds
    };

    const handleSubmit = () => {
        if (selectLansType) {
            const power = {
                selectLansType,
                selectedLensOrProducrPrice: selectedLens.price + product_price,
                selectedType: selectedLens.type,
                leftLens,
                rightLens,
                axis,
                add,
            };
            const product = {
                mobile_number: mobile_num,
                selectedColor: selectedColor,
                product_id: product_id
            }

            // Save the data to context
            saveCheckoutData({ power, product });

            // Navigate to the checkout page
            history('/ChekOutPage')
        } else {
            alert("Please select valid options.");
        }
    };

    const handleDirectPayment = () => {
        if (product_price, mobile_num, product_id) {
            const power = {
                selectedLensOrProducrPrice: product_price,
            }
            const product = {
                mobile_number: mobile_num,
                selectedColor: selectedColor,
                product_id: product_id
            }
            // Save the data to context
            saveCheckoutData({ power, product });

            // Navigate to the checkout page
            history('/ChekOutPage')
        } else {
            alert("Please select valid options.");
        }

    }

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handlePowerClick = () => {
        const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual token key
        if (!token) {
            console.error('User details not found.');
            history('/login', { replace: true })
            return;
        }
        setShowPowerPopup(!showPowerPopup);
    };


    const handleLanseClick = (type) => {
        setSelectLansType(type);
        setShowPopupContainer(false)
        setShowPopuplensePrice(true)
    };

    // Function to show the popup and set the lens type and price
    const showPawerPopup = (lensType, lensPrice) => {
        setShowPopuplensePrice(false)
        setSelectedLens({ type: lensType, price: lensPrice });
    };

    const handleLensChange = (lens, field, value) => {
        if (lens === 'left') {
            setLeftLens((prev) => ({ ...prev, [field]: value }));
        } else {
            setRightLens((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleChangeAdd = (field, value) => {
        if (field === 'ADD') {
            setAdd(parseFloat(value));
        }
    };

    const handleChangeAxis = (field, value) => {
        if (field === 'AXIS') {
            setAxis(parseFloat(value));
        }
    };

    const addToCart = (item) => {
        // Extract product details from `result`
        const productDetails = item.result;

        // Get existing cart items from localStorage
        const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Find if the item already exists in the cart
        const itemIndex = existingCartItems.findIndex(cartItem => cartItem.product_id === productDetails.product_id);

        if (itemIndex !== -1) {
            // If the item exists, increase its quantity
            existingCartItems[itemIndex].quantity = Number(existingCartItems[itemIndex].quantity) || 1;
            existingCartItems[itemIndex].quantity += 1;
        } else {
            // If item does not exist, add it with quantity = 1
            const newItem = {
                ...productDetails,
                quantity: 1
            };
            existingCartItems.push(newItem);
        }

        // Update localStorage with new cart data
        localStorage.setItem("cart", JSON.stringify(existingCartItems));

        // Alert user
        alert(`${productDetails.product_title} added to cart successfully!`);
    };

    // Run effect whenever wishlistItems updates
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(storedWishlist);
    }, []); // ✅ Add wishlistItems as dependency

    const toggleWishlist = (product) => {
        setWishlistItems((prevWishlist) => {
            let updatedWishlist = [...prevWishlist];
            const index = updatedWishlist.findIndex(item => item.product_id === product.product_id);

            if (index !== -1) {
                updatedWishlist.splice(index, 1); // Remove if exists
            } else {
                updatedWishlist.push(product); // Add if not exists
            }

            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            updateCounts(); // Update count globally
            return updatedWishlist;
        });
        // ✅ Use window.location.reload() to bypass ESLint restriction
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_API_URL}/product/productdetail/${product_id}`);
                console.log("response new", response.data)
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        setSelectedImage(null)
    }, [product_id]);

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await axios.get(`${SERVER_API_URL}/product`);
                const products = response.data;
                setAllProducts(products);
                console.log("products", products)

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData1();
    }, [product_id]);

    const handleColorSelect = (frameColor, lensColor) => {
        setSelectedColor({
            frameColor,
            lensColor
        });
    };

    const getColorsForProduct = (productTitle) => {
        // ✅ Ensure allProducts.result is an array before filtering
        const productsArray = Array.isArray(allProducts?.result) ? allProducts.result : [];

        // Filter products that match the same title
        const matchingProducts = productsArray.filter(p => p.product_title === productTitle);

        // Extract frame and lens colors
        const colors = matchingProducts.map(p => ({
            productId: p.product_id,  // ✅ Include product ID
            frameColor: p.frameColor || "#FFFFFF", // Default White if null
            lensColor: p.lenshColor || "#000000",  // Default Black if null
            product_thumnail_img: p.product_thumnail_img,
            product_title: p.product_title,
            product_price: p.product_price,
            discount: p.discount,
            highlights: p.highlights,
            gender: p.gender,
        }));

        return colors;
    };
    console.log("item new", item)
    console.log("wishlist", wishlistItems)
    console.log("item?.result?", item?.result?.product_id)

    const images = item?.result?.product_all_img || [];

    const handleImageClickPopup = (index) => {
        setCurrentIndex(index);
        setSelectedImage(`${SERVER_API_URL}/${images[index]}`);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(`${SERVER_API_URL}/${images[nextIndex]}`);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(`${SERVER_API_URL}/${images[prevIndex]}`);
    };

    const product_price = item?.result?.product_price - (item?.result?.product_price * item?.result?.discount / 100)



    return (
        <>
            <Header />
            {loading ? (
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            ) : (
                <div className="product-details-container">
                    <div className='product-details-container-row'>
                        <div className='product-details-child-left'>
                            {/* Breadcrumb */}
                            <div className="main-content">
                                {/* Main Product Image Section */}
                                <div className="product-image-section">
                                    <div className="main-image">
                                        <div className='share-container'>
                                            {wishlistItems.some(item1 => item1.product_id === item?.result?.product_id) ? (
                                                <img src={wishlist} alt="wishlist" className='share-icon' onClick={() => toggleWishlist(item.result)} />
                                            ) : (
                                                <img src={wishlist1} alt="wishlist" className='share-icon' onClick={() => toggleWishlist(item.result)} />
                                            )}
                                            <IoShareSocialOutline className='share-icon' onClick={() => setShowSharePopup(true)} />
                                        </div>

                                        {/* ====== Popup Share Modal ====== */}
                                        {showSharePopup && (
                                            <div className="share-popup-overlay">
                                                <div className="share-popup">
                                                    <button className="close-btn" onClick={() => setShowSharePopup(false)}>
                                                        <IoClose />
                                                    </button>
                                                    <h3>Share this Product</h3>
                                                    <div className="share-product-info">
                                                        <img src={`${SERVER_API_URL}/${item?.result?.product_thumnail_img}`} alt="avioter" className="share-product-img" />
                                                        <div className="share-product-text">
                                                            <p className="share-brand">{item?.result?.product_title}</p>
                                                            <p className="share-title">{item?.result?.highlights}</p>
                                                        </div>
                                                    </div>

                                                    <div className='copy-container'>
                                                        <input type="text" value={shareUrl} readOnly className="share-link" />
                                                        {/* <button className="copy-btn" onClick={() => navigator.clipboard.writeText(shareUrl)}>COPY</button> */}
                                                        <button
                                                            className={`copy-btn ${copied ? "copied" : ""}`}
                                                            onClick={handleCopy}
                                                        >
                                                            {copied ? "Copied!" : "Copy"}
                                                        </button>
                                                    </div>

                                                    <div className="share-icons">
                                                        <FaFacebookF className="social-icon" onClick={() => handleShare("facebook")} />
                                                        <FaTwitter className="social-icon" onClick={() => handleShare("twitter")} />
                                                        <FaEnvelope className="social-icon" onClick={() => handleShare("email")} />
                                                        <FaWhatsapp className="social-icon" onClick={() => handleShare("whatsapp")} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        <img className='larg-image' src={selectedImage ? selectedImage : `${SERVER_API_URL}/${item?.result?.product_thumnail_img}`} alt={`Large Image`} onClick={() => handleImageClickPopup(0)} />
                                    </div>

                                    {/* ====== Popup Modal ====== */}
                                    {isPopupOpen && (
                                        <div className="image-popup-overlay">
                                            <div className="image-popup">
                                                <span className="close-btn" onClick={closePopup}>&times;</span>
                                                <button className="prev-btn1" onClick={handlePrev}><img className='forword-btn' src={backword} alt="forword-btn" /></button>
                                                <img className="popup-image" src={selectedImage} alt="Popup Large View" />
                                                <button className="next-btn1" onClick={handleNext}><img className='forword-btn' src={forword} alt="forword-btn" /></button>
                                            </div>
                                            <div className="thumbnail-row" style={{ width: "50%", justifyContent: "space-around" }}>
                                                {item?.result && item.result.product_all_img && (
                                                    <>
                                                        <button onClick={handlePrev} style={{ background: "transparent", border: "none", fontSize: "20px" }}><IoIosArrowBack color='#333' /></button>
                                                        <div className="thumbnail">
                                                            <img
                                                                className='mini-image'
                                                                src={`${SERVER_API_URL}/${item?.result?.product_all_img[0]}`}
                                                                alt={`ImageItem ${product_id + 1}`}
                                                                onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[0]}`)}
                                                            />
                                                        </div>

                                                        <div className="thumbnail">
                                                            <img
                                                                className='mini-image'
                                                                src={`${SERVER_API_URL}/${item?.result?.product_all_img[1]}`}
                                                                alt={`ImageItem ${product_id + 1}`}
                                                                onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[1]}`)}
                                                            />
                                                        </div>

                                                        <div className="thumbnail">
                                                            <img
                                                                className='mini-image'
                                                                src={`${SERVER_API_URL}/${item?.result?.product_all_img[2]}`}
                                                                alt={`ImageItem ${product_id + 1}`}
                                                                onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[2]}`)}
                                                            />
                                                        </div>

                                                        <div className="thumbnail">
                                                            <img
                                                                className='mini-image'
                                                                src={`${SERVER_API_URL}/${item?.result?.product_all_img[3]}`}
                                                                alt={`ImageItem ${product_id + 1}`}
                                                                onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[3]}`)}
                                                            />
                                                        </div>
                                                        <button className="" style={{ background: "transparent", border: "none", fontSize: "20px" }} onClick={handleNext}><IoIosArrowForward color='#333' /></button>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                    <div className="thumbnail-row">
                                        {item?.result && item.result.product_all_img && (
                                            <>
                                                <div className="thumbnail modified-thumbnail">
                                                    <img
                                                        className='mini-image modified-mini-image'
                                                        src={`${SERVER_API_URL}/${item?.result?.product_all_img[0]}`}
                                                        alt={`ImageItem ${product_id + 1}`}
                                                        onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[0]}`)}
                                                    />
                                                </div>

                                                <div className="thumbnail modified-thumbnail">
                                                    <img
                                                        className='mini-image modified-mini-image'
                                                        src={`${SERVER_API_URL}/${item?.result?.product_all_img[1]}`}
                                                        alt={`ImageItem ${product_id + 1}`}
                                                        onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[1]}`)}
                                                    />
                                                </div>

                                                <div className="thumbnail modified-thumbnail">
                                                    <img
                                                        className='mini-image modified-mini-image'
                                                        src={`${SERVER_API_URL}/${item?.result?.product_all_img[2]}`}
                                                        alt={`ImageItem ${product_id + 1}`}
                                                        onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[2]}`)}
                                                    />
                                                </div>

                                                <div className="thumbnail modified-thumbnail">
                                                    <img
                                                        className='mini-image modified-mini-image'
                                                        src={`${SERVER_API_URL}/${item?.result?.product_all_img[3]}`}
                                                        alt={`ImageItem ${product_id + 1}`}
                                                        onClick={() => handleImageClick(`${SERVER_API_URL}/${item?.result?.product_all_img[3]}`)}
                                                    />
                                                </div>

                                            </>
                                        )}

                                    </div>
                                </div>


                                {/* Product Info Section */}
                                <div className="product-info-section">
                                    <h1 className="product-title1">{item?.result?.highlights} Stylish Sunglasses</h1>
                                    <h3>{item?.result?.product_title}</h3>
                                    {/* <p className="product-price">₹{product_price.toFixed(0)}</p> */}
                                    {/* <button className="try-on-btn">TRY ON FACE</button> */}
                                    <button className="add-to-cart-btn" onClick={() => addToCart(item)}><img src={tdesign} style={{ marginRight: "10px" }} alt="tdesign" />ADD TO CART</button>
                                    <div className="cart-controls">
                                    </div>

                                    <div className="cart-controls" style={{ marginBottom: "5px" }}>
                                        <button
                                            className="buy-now-btn"
                                            onClick={handleDirectPayment}
                                            disabled={!selectedColor} // Disable if selectedColor is null
                                            style={{ opacity: !selectedColor ? 0.5 : 1, cursor: !selectedColor ? "not-allowed" : "pointer" }}
                                        >
                                            BUY NOW
                                        </button>
                                        <button
                                            className="buy-now-btn"
                                            onClick={handlePowerClick}
                                            disabled={!selectedColor} // Disable if selectedColor is null
                                            style={{ opacity: !selectedColor ? 0.5 : 1, cursor: !selectedColor ? "not-allowed" : "pointer" }}
                                        >
                                            ADD POWER
                                        </button>

                                    </div>

                                    {/* card info */}
                                    <div className=''>
                                        <div className="container">
                                            <h3 className="color-title">
                                                {selectedColor && (
                                                    <p>
                                                        Selected Color: <strong>{selectedColor.frameColor}</strong> (Frame) &{" "}
                                                        <strong>{selectedColor.lensColor}</strong> (Lens)
                                                    </p>
                                                )}
                                            </h3>
                                            <div className="grid-container">
                                                {getColorsForProduct(item?.result?.product_title).length > 0 ? (
                                                    getColorsForProduct(item?.result?.product_title).map((colorObj) => (

                                                        <Link to={`/product-item/${colorObj.productId}`}>
                                                            <div
                                                                key={colorObj.productId}
                                                                className={`product-card ${selectedId === colorObj.productId ? "selected" : ""}`}
                                                                // onClick={() => setSelectedId(colorObj.productId)}
                                                                onClick={() => handleColorSelect(colorObj.frameColor, colorObj.lensColor)}
                                                            >
                                                                <img src={`${SERVER_API_URL}/${colorObj.product_thumnail_img}`} alt="Sunglasses" className="product-image" />
                                                                <div className="product-info">
                                                                    <h3>{colorObj.product_title || "Unnamed Product"}</h3>
                                                                    <div className="product-discount">
                                                                        <p className="discount-title" style={{ fontSize: "10px" }}>₹{colorObj.product_price}</p>
                                                                        <span className="discount-off" style={{ fontSize: "10px" }}>({colorObj.discount}% OFF)<span className='out-of-stock' style={{ color: "#e8a617", textTransform: "uppercase", fontSize: "6px" }}>For {colorObj.gender}</span></span>
                                                                    </div>
                                                                    <p className="product-price1">
                                                                        ₹{(colorObj.product_price - (colorObj.product_price * colorObj.discount / 100)).toFixed(0)}/-
                                                                    </p>

                                                                    <p style={{ marginBottom: "8px" }}>{colorObj.highlights || "N/A"}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <span>No Colors Available</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="technical-details">
                                        <h3>Technical Details</h3>
                                        <ul>
                                            <li><strong>Product ID:</strong> DCM413</li>
                                            <li><strong>Frame Shape:</strong> 54 mm / 16 mm / 145 mm</li>
                                            <li><strong>Frame Type:</strong> 54 mm / 16 mm / 145 mm</li>
                                            <li className="color-section">
                                                <strong>Frame Color: </strong>
                                                {selectedColor ? (null) : (<p className='chose-color'>Please select color</p>)}
                                                <div className="color-options">
                                                    {getColorsForProduct(item?.result?.product_title).length > 0 ? (
                                                        getColorsForProduct(item?.result?.product_title).map((colorObj) => (

                                                            <Link to={`/product-item/${colorObj.productId}`}>
                                                                <span
                                                                    key={colorObj.productId}  // ✅ Using Product ID as key
                                                                    className={`color-box ${selectedColor?.frameColor === colorObj.frameColor && selectedColor?.lensColor === colorObj.lensColor ? "selected-color" : ""}`}
                                                                    title={`Frame: ${colorObj.frameColor}, Lens: ${colorObj.lensColor}`}
                                                                    style={{
                                                                        background: `linear-gradient(to top, ${colorObj.frameColor} 50%, ${colorObj.lensColor} 50%)`,
                                                                        display: 'inline-block',
                                                                        width: '30px',
                                                                        height: '30px',
                                                                        borderRadius: '15px',
                                                                        margin: '0 5px',
                                                                        border: '1px solid #ddd',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={() => handleColorSelect(colorObj.frameColor, colorObj.lensColor)}
                                                                ></span>
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <span>No Colors Available</span>
                                                    )}
                                                </div>
                                            </li>
                                            {/* Show the remaining list items only when "See All" is clicked */}
                                            {showAll && (
                                                <>

                                                    <li><strong>Discount:</strong> 20%</li>
                                                    <li><strong>Frame Material:</strong> 54 mm / 16 mm / 145 mm</li>
                                                    <li><strong>Frame Description:</strong> 54 mm / 16 mm / 145 mm kkkkkkkkkk</li>
                                                    <li><strong>Lens Information:</strong> 54 mm / 16 mm / 145 mm</li>
                                                    <li><strong>Frame Material:</strong> 54 mm / 16 mm / 145 mm</li>
                                                    <li><strong>Model No:</strong> 54 mm / 16 mm / 145 mm</li>
                                                    <li><strong>Frame Size:</strong> 54 mm / 16 mm / 145 mm</li>
                                                </>
                                            )}
                                        </ul>

                                        {/* Display selected color */}
                                        {selectedColor && (
                                            <p>
                                                Selected Color: <strong>{selectedColor.frameColor}</strong> (Frame) &{" "}
                                                <strong>{selectedColor.lensColor}</strong> (Lens)
                                            </p>
                                        )}
                                        {/* Show "See All" button if more than 3 details */}
                                        <button
                                            className="see-all-btn"
                                            onClick={() => setShowAll(!showAll)}
                                        >
                                            {showAll ? "See Less" : "See All"}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            {/* Customer Reviews Section */}
                            <div className="customer-reviews">
                                <h2>Customer Reviews & Ratings</h2>
                                <p>4.0 <span>★</span> 23,045 reviews</p>
                                <div className="reviews-row">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="review-card">
                                            <p>{review.comment}</p>
                                            <p style={{ color: "#FCBF02" }}>{'★'.repeat(review.rating)}</p>
                                            <p>{review.user} - {review.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="suggested-frames">
                                <h2>Suggested Frames</h2>
                                <div className="frames-row">
                                    {item?.suggestedProducts?.length > 0 ? (
                                        item.suggestedProducts.map((frame) => (
                                            <div key={frame.id} className="frame-card">
                                                <Link to={`/product-item/${frame.product_id}`}>
                                                    <div className="frame-image">
                                                        {frame.product_thumnail_img ? (
                                                            <img src={`${SERVER_API_URL}/${frame.product_thumnail_img}`} alt={frame.name} style={{ maxWidth: "100%" }} />
                                                        ) : (
                                                            <div className="no-image">Image Not Available</div>
                                                        )}
                                                    </div>
                                                </Link>
                                                <h3>{frame.product_title || "Unnamed Product"}</h3>

                                                <div className="product-discount">
                                                    <p className="discount-title">₹{frame.product_price}</p>
                                                    <span className="discount-off">({frame.discount}% OFF)<span className='out-of-stock' style={{ color: "#e8a617", textTransform: "uppercase", fontSize: "9px" }}>For {frame.gender}</span></span>
                                                </div>
                                                <p className="product-price1">
                                                    ₹{(frame.product_price - (frame.product_price * frame.discount / 100)).toFixed(0)}/-
                                                </p>

                                                <p style={{ marginBottom: "8px" }}>{frame.highlights || "N/A"}</p>

                                                <p>Material: {frame.material || "fiber"}</p>
                                                {/* <button className="cart-btn">
                                            <img src={tdesign} alt="Add to Cart" />
                                        </button> */}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products match the selected criteria.</p>
                                    )}
                                </div>

                            </div>

                            {/* Power Popup Section */}
                            {showPowerPopup && (
                                <div className="power-popup">
                                    <div className="popup-header">
                                        <h3>Select Lens Type</h3>
                                        <button className="close-btn" onClick={handlePowerClick}>✕</button>
                                    </div>
                                    {showPopupContainer && (
                                        <div className="popup-content">
                                            <div className="lens-option" onClick={() => handleLanseClick('Plano')}>
                                                <div className="icon">👓</div>
                                                <div className="lens-info">
                                                    <h4>Plano</h4>
                                                    <p>Block 98% of harmful rays (Anti-glare and blue-cut options)</p>
                                                </div>
                                                <div className="arrow">➔</div>
                                            </div>
                                            <div className="lens-option" onClick={() => handleLanseClick('SingleVision')}>
                                                <div className="icon">👓</div>
                                                <div className="lens-info">
                                                    <h4>Single Vision</h4>
                                                    <p>For distance or near vision (Thin, anti-glare, blue-cut options)</p>
                                                </div>
                                                <div className="arrow">➔</div>
                                            </div>
                                            <div className="lens-option" onClick={() => handleLanseClick('Bifocal')}>
                                                <div className="icon">👓</div>
                                                <div className="lens-info">
                                                    <h4>Bifocal</h4>
                                                    <p>Bifocal and Progressives (For two powers in the same lenses)</p>
                                                </div>
                                                <div className="arrow">➔</div>
                                            </div>

                                            <div className="lens-option" onClick={() => handleLanseClick('Progressive')}>
                                                <div className="icon">👓</div>
                                                <div className="lens-info">
                                                    <h4>Progressive</h4>
                                                    <p>For Distance or Near Vision (Green, Grey, Brown)</p>
                                                </div>
                                                <div className="arrow">➔</div>
                                            </div>
                                            <div className="lens-option">
                                                <div className="icon">👓</div>
                                                <div className="lens-info">
                                                    <h4>Frame Only</h4>
                                                    <p>Buy Only Frame</p>
                                                </div>
                                                <div className="arrow">➔</div>
                                            </div>

                                            <div className="footer-info">
                                                <p>Not sure what to select? Call 9999899998</p>
                                            </div>
                                            <div className="price-info-popup">
                                                <p>Sub Total</p>
                                                <p>₹{product_price}</p>
                                            </div>
                                        </div>
                                    )}
                                    {showPopuplensePrice && (
                                        <div className="popup-content">
                                            {lensData[selectLansType]?.map((lensOption, index) => (
                                                <div key={index} className="lens-option" onClick={() => showPawerPopup(lensOption.type, lensOption.price)}>
                                                    <div className="icon">👓</div>
                                                    <div className="lens-info">
                                                        <h4>{lensOption.type}</h4>
                                                        <p>{lensOption.price}</p>
                                                    </div>
                                                    <div className="arrow">➔</div>
                                                </div>
                                            ))}
                                            <div className="price-info-popup">
                                                <p>Sub Total</p>
                                                <p>₹{product_price}</p>
                                            </div>
                                        </div>
                                    )}

                                    {!showPopuplensePrice && !showPopupContainer && (<>
                                        <div className="power-bg-container">
                                            <div className="lens-pricing-container">
                                                <h1 className="pricing-title">What About Eye Power?</h1>
                                                <p className="pricing-description">
                                                    You can select your eye power in the following table. Charges may be different from lens to lens based on the lens number.
                                                </p>

                                                <div className="lens-selection-table">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Left Lens</th>
                                                                <th>Right Lens</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>SPH</td>
                                                                <td>
                                                                    <select
                                                                        value={leftLens.SPH}
                                                                        onChange={(e) => handleLensChange('left', 'SPH', e.target.value)}
                                                                        className="lens-select"
                                                                    >
                                                                        {Array.from({ length: 81 }, (_, index) => {
                                                                            const value = (-10 + index * 0.25).toFixed(2);
                                                                            return <option key={value} value={value}>{value}</option>;
                                                                        })}
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={rightLens.SPH}
                                                                        onChange={(e) => handleLensChange('right', 'SPH', e.target.value)}
                                                                        className="lens-select"
                                                                    >
                                                                        {Array.from({ length: 81 }, (_, index) => {
                                                                            const value = (-10 + index * 0.25).toFixed(2);
                                                                            return <option key={value} value={value}>{value}</option>;
                                                                        })}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>CYL</td>
                                                                <td>
                                                                    <select
                                                                        value={leftLens.CYL}
                                                                        onChange={(e) => handleLensChange('left', 'CYL', e.target.value)}
                                                                        className="lens-select"
                                                                    >
                                                                        {Array.from({ length: 81 }, (_, index) => {
                                                                            const value = (-6 + index * 0.25).toFixed(2);
                                                                            return <option key={value} value={value}>{value}</option>;
                                                                        })}
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={rightLens.CYL}
                                                                        onChange={(e) => handleLensChange('right', 'CYL', e.target.value)}
                                                                        className="lens-select"
                                                                    >
                                                                        {Array.from({ length: 81 }, (_, index) => {
                                                                            const value = (-6 + index * 0.25).toFixed(2);
                                                                            return <option key={value} value={value}>{value}</option>;
                                                                        })}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>AXIS</td>
                                                                <td colSpan="2">
                                                                    <input
                                                                        type="number"
                                                                        value={axis}
                                                                        onChange={(e) => handleChangeAxis('AXIS', e.target.value)}
                                                                        className="add-input"
                                                                    />
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td>ADD</td>
                                                                <td colSpan="2">
                                                                    <input
                                                                        type="number"
                                                                        value={add}
                                                                        onChange={(e) => handleChangeAdd('ADD', e.target.value)}
                                                                        className="add-input"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='submit-lens-details' type='button' onClick={handleSubmit}>check out</button>
                                        <div className="price-info-popup">
                                            <p>Sub Total</p>
                                            <p>₹{product_price + selectedLens.price}</p>
                                        </div>
                                    </>
                                    )}

                                </div>
                            )}
                        </div>
                        <div className='product-details-child-rigth'>
                            <div className="price-product-card">
                                <h1 className="price">₹{product_price.toFixed(0)}/-</h1>
                                <p className="shipping-info">
                                    Get <strong>Fast, Free Shipping</strong> with
                                </p>
                                <p className="location">📍 Delivering to San Francisco 94122</p>
                                <a href="#" className="update-location">- Update location</a>
                                <p className="stock">In Stock</p>
                                <div className='quntity-container'>
                                    <label className="quantity-label">Quantity:</label>
                                    <button className='add-power-cart' onClick={handlePowerClick}
                                        disabled={!selectedColor} // Disable if selectedColor is null
                                        style={{ opacity: !selectedColor ? 0.7 : 1, cursor: !selectedColor ? "not-allowed" : "pointer" }}>Add power</button>
                                </div>

                                <select className="quantity-dropdown">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>
                                <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
                                <button className="buy-now" onClick={handleDirectPayment}
                                    disabled={!selectedColor} // Disable if selectedColor is null
                                    style={{ opacity: !selectedColor ? 0.5 : 1, cursor: !selectedColor ? "not-allowed" : "pointer" }}>Buy Now</button>

                                <p className="seller-info">Ships from <strong>Softgenics Ind. Pvt. Ltd.</strong></p>
                                <p className="sold-by">Sold by <a href="#">SOJOS Vision</a></p>
                                <p className="returns">Returns <a href="#">30-day refund/replacement</a></p>
                                <p className="payment">Payment <a href="#">Secure transaction</a></p>
                            </div>
                            {/* youtube container */}
                            <div className='youtube-main-container'>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src="https://www.youtube.com/embed/2VptJdqr_0o?autoplay=1&mute=1"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            {/* https://www.youtube.com/shorts/0B-wiEkX8Uc */}
                            <div className='youtube-main-container'>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src="https://www.youtube.com/embed/0B-wiEkX8Uc?autoplay=1&mute=1"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <FaqPage />
                </div>
            )}

        </>

    );
};

export default ProductDetails;