import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import { SERVER_API_URL } from '../../server/server';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import yourPerfectPairBanner from '../../Assets/images/your-perfect-pair-banner.webp';
// import crystalClearVisionBanner from '../../Assets/images/crystal-clear-vision-banner.webp';
// import textBanner from '../../Assets/images/text_banner.webp';
import aviatorVector from '../../Assets/images/goggles/aviator-vector.webp';
import catsEye from '../../Assets/images/goggles/cats-eye.webp';
import rectangleVector from '../../Assets/images/goggles/rectangle-vector.webp';
import roundVector from '../../Assets/images/goggles/round-vector.webp';
import squareVector from '../../Assets/images/goggles/square-vector.webp';
import wayfarerVector from '../../Assets/images/goggles/wayfarer-vector.webp';
// import heliusGlasses from '../../Assets/images/Helius.webp'; // Add your Helius Eyewear image
import pawerGlass from '../../Assets/images/power_glass.png'
import computerGlassMen from '../../Assets/images/computer-glass-men.webp'
import sunglasses from '../../Assets/images/sunglasses-image.webp'
import prescription from '../../Assets/images/prescription-glasses.webp'
import zeroPawer from '../../Assets/images/zero-power-glasses.webp'
// import lykosEyewear from '../../Assets/images/lykos-banner.webp'
import forMenSection from '../../Assets/images/for-men-section.webp'
import forWomenSection from '../../Assets/images/for-women-section.webp'
import forChildSection from '../../Assets/images/for-child-section.webp'
// import stayAheadInStyleBanner from '../../Assets/images/stay-ahead-in-style-banner.webp'
// import Blinkers from '../../Assets/images/Blinkers.webp'
// import EyePoppin from '../../Assets/images/EyePoppin.webp'

// import prog11 from '../../Assets/images/prog11.webp'
// import a2 from '../../Assets/images/a2.webp'
// import b2 from '../../Assets/images/b2.webp'
// import d2 from '../../Assets/images/d2.webp'
// import d from '../../Assets/images/d.webp'
// import e2 from '../../Assets/images/e2.webp'

import prog11 from '../../Assets/images/sunglasses1.png'
import a2 from '../../Assets/images/sunglasses2.jpg'
import b2 from '../../Assets/images/sunglasses3.png'
import d2 from '../../Assets/images/sunglasses4.png'
import d from '../../Assets/images/sunglasses5.png'
import e2 from '../../Assets/images/sunglasses6.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './home.css';

// const glasses = [
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/M/8/M8021BU20V_1_lar.jpg",
//     glass_brand: "Tees By Fastrack",
//     glass_name: "Blue Aviator Sunglasses For Men And Women",
//     glass_price: "₹1,000",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/P/5/P513GY5V_1_lar.jpg",
//     name: "Credit Card Offers",
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
//     name: "New Arrivals",
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1510UFA1MBLV_1_lar.jpg",
//     name: "Limited Edition",
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/4/p420bk3p_1_lar.jpg",
//     name: "Festive Collection",
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1278WFP6MOLV_1_lar.jpg",
//     name: "Hot Deals",
//   },

//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
//     name: "Flash Sale",
//   },
// ];
const glasses = [
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/M/8/M8021BU20V_1_lar.jpg",
    glass_brand: "Tees By Fastrack ",
    glass_name: "Premium Blue Aviator Sunglasses For Men And Women with UV Protection",
    glass_price: "₹1,000",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/P/5/P513GY5V_1_lar.jpg",
    glass_brand: "RayShield Signature ",
    glass_name: "Stylish Grey Rectangle Sunglasses for Men with Polarized Lenses",
    glass_price: "₹850",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
    glass_brand: "Urban Eyes Elite ",
    glass_name: "Matte Red Round Sunglasses with Anti-Glare Coating for All-Day Comfort",
    glass_price: "₹1,200",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1510UFA1MBLV_1_lar.jpg",
    glass_brand: "SunBlaze Luxe ",
    glass_name: "Blue Mirror Finish Sunglasses for Women with Lightweight Frame",
    glass_price: "₹999",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/4/p420bk3p_1_lar.jpg",
    glass_brand: "VisionPro Classic ",
    glass_name: "Classic Black Wayfarer Sunglasses for Men – Timeless Design",
    glass_price: "₹950",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1278WFP6MOLV_1_lar.jpg",
    glass_brand: "OpticOne Urban ",
    glass_name: "Olive Green Square Frame Sunglasses with Gradient Lenses",
    glass_price: "₹1,100",
    glass_tax: "Inclusive of all taxes"
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
    glass_brand: "ZoomWear Exclusive ",
    glass_name: "Limited Edition Matte Red Aviator Sunglasses with HD Vision",
    glass_price: "₹1,050",
    glass_tax: "Inclusive of all taxes"
  }
];

const categories = [
  {
    title: "Sunglass Styles for Men",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/310x300/media/wysiwyg/titan_cms/cards-section/Budget-Buys_Round-SG_310X300_1.png",
  },
  {
    title: "Bold Sunglass Frames",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/310x300/media/wysiwyg/titan_cms/cards-section/Budget-Buys_Square_310X300.png",
  },
  {
    title: "Sunglass Picks for Boys",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/310x300/media/wysiwyg/titan_cms/cards-section/Budget-Buys_Aviator_310X300.png",
  },
  {
    title: "Chic Sunglasses for Women",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/310x300/media/wysiwyg/titan_cms/cards-section/Budget-Buys_Cycling_310X300.png",
  },
  {
    title: "Trendy Sunglass Frames",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/500x500/media/wysiwyg/titan_cms/cards-section/frame-aligner-image_270X240_new.jpg",
  },
  {
    title: "Sunglass Looks for Girls",
    img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/310x300/media/wysiwyg/titan_cms/cards-section/Budget-Buys_Wayfarer_FR_310X300.png",
  },
];

const slide = [
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-16_1_.jpg",
    name: "Summer Sale",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/Web-banners_Credit-card_2800X800_1_.png",
    name: "Credit Card Offers",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-15_1.jpg",
    name: "New Arrivals",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/Web_Banner_1400x400_copy_3_1_.jpg",
    name: "Limited Edition",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-9.jpg",
    name: "Festive Collection",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-16_1_.jpg",
    name: "Hot Deals",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/3_3.jpg",
    name: "Signature Styles",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-1_2.jpg",
    name: "Eyewear Trends",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/3_3.jpg",
    name: "Designer Picks",
  },
  {
    src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1450x400/media/wysiwyg/2800x800-7_2_.jpg",
    name: "Flash Sale",
  },
];

const Home = () => {
  const [bannerData, setBannerData] = useState([])
  const [brandHeading, setBrandHeading] = useState([]);
  console.log("brandHeading1", brandHeading)

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/api/carousel/all`);
        console.log("Carousel Data:", response.data);
        setBannerData(response.data)
        // Handle response data (e.g., set state)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBannerData(); // Call the async function
    fetchBrandHeading();
  }, []); // Empty dependency array ensures it runs once

  const fetchBrandHeading = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/brand`);
      setBrandHeading(response.data.result);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Find banners by their `exact_place`
  // const yourPerfectPairBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "left")?.image_url : null;

  // const crystalClearVisionBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "right")?.image_url : null;

  const textBanner = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_2' && b.place === "Group_A" && b.exact_place === "left")?.image_url : null;

  const heliusGlasses = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_1' && b.place === "Group_B" && b.exact_place === "center_poster")?.image_url : null;

  const lykosEyewear = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_3' && b.place === "Group_B" && b.exact_place === "center_poster")?.image_url : null;

  const stayAheadInStyleBanner = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_2' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  const Blinkers = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_3' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  const EyePoppin = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_4' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  return (
    <>
      <Header />
      <div className='home-bg-container'>
        <div className='home-main-container'>
          {/* top card */}
          <div className='card-container-main'>
            <div class="card-container">
              <div class="card">
                <img src={prog11} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Power Glass</h3>
                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

            <div class="card-container">
              <div class="card">
                <img src={b2} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Power Sunglasses</h3>
                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

            <div class="card-container">
              <div class="card">
                <img src={d} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Screen saver</h3>

                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

            <div class="card-container">
              <div class="card">
                <img src={a2} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Sunglasses</h3>
                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

            <div class="card-container">
              <div class="card">
                <img src={d2} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Contact Lenses</h3>
                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

            <div class="card-container">
              <div class="card">
                <img src={e2} alt="Eyeglasses" class="card-image" />
                <h3 class="card-title">Progressive lenses</h3>
                <div class="card-content">
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                  <p>Air Light-Weight Powered Lenses</p>
                  <p>Starting from ₹2000</p>
                </div>
              </div>
            </div>

          </div>

          <div className="slider-main-container">
            <div className="slider-navigation">
              <div className="prev-slider-btn">&#8249;</div>
              <div className="next-slider-btn">&#8250;</div>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1.2}
              centeredSlides={true}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".next-slider-btn",
                prevEl: ".prev-slider-btn",
              }}
              pagination={{ clickable: true }}
              speed={1300} // ← smooth transition (800ms)
              style={{
                padding: '0 5%',
              }}
            >
              {slide.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/product-display/${item.name}`}>
                    <img
                      src={item.src}
                      alt={item.name}
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        objectFit: 'cover',
                        height: '300px', // or whatever works for your design
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="sunglasses-grid">
            {categories.map((cat, index) => (
              <Link to={`/product-display/${cat.title}`}>
                <div className="sunglasses-card" key={index}>
                  <img src={cat.img} alt={cat.title} className="sunglasses-img" />
                  <div className="sunglasses-overlay">
                    <p className="sunglasses-title">{cat.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Glasses Categories Section */}
          <div className="glasses-category-container">
            <div className="category-banner">
              <img src={`${SERVER_API_URL}/uploads/${textBanner}`} className='text-banner' alt={textBanner} />

            </div>

            <div className="categories-grid">
              <div className="category-item">
                <Link to={`/product-display/${"Aviator"}`}><img src={aviatorVector} alt="Aviator" className="category-icon" /></Link>
                <p>Aviator</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Cats Eye"}`}><img src={catsEye} alt="Cats-Eye" className="category-icon" /></Link>
                <p>Cats Eye</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Rectangle"}`}><img src={rectangleVector} alt="Rectangle" className="category-icon" /></Link>
                <p>Rectangle</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Round"}`}><img src={roundVector} alt="Round" className="category-icon" /></Link>
                <p>Round</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Square"}`}><img src={squareVector} alt="Square" className="category-icon" /></Link>
                <p>Square</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Wayfarer"}`}><img src={wayfarerVector} alt="Wayfarer" className="category-icon" /></Link>
                <p>Oval</p>
              </div>
            </div>
          </div>

          <div className="glasses-swiper-container">
            <h2 className="swiper-heading">Frequently Bought</h2>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              modules={[Navigation, Pagination, Autoplay]}
              className="glasses-swiper"
            >

              {glasses.map((glass, index) => (
                <SwiperSlide key={index} className="glasses-slide">
                  <div className="glass-card">
                    <div className="glass-icons">
                      <span className="heart-icon">❤️</span>
                    </div>
                    <img src={glass.src} alt={glass.name} className="glass-img" />
                    <h3 className="glass-brand">{glass.glass_brand}</h3>
                    <p className="glass-name">{glass.glass_name}</p>
                    <p className="glass-price">{glass.glass_price}</p>
                    <p className="glass-tax">{glass.glass_tax}</p>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>

          {/* Top Banners */}
          {/* <Link to="#">
            <div className='your-perfect-pair'>
              <div className='yourPerfectPairBanner-container'>
                {yourPerfectPairBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${yourPerfectPairBanner}`} // Ensure correct URL
                    className="yourPerfectPairBanner"
                    alt="Your Perfect Pair Banner"
                  />
                )}
              </div>

              <div className='crystalClearVisionBanner-container'>
                {crystalClearVisionBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${crystalClearVisionBanner}`} // Ensure correct URL
                    className="crystalClearVisionBanner"
                    alt="Crystal Clear Vision Banner"
                  />
                )}
              </div>
            </div>
          </Link> */}



          {/* Helius Eyewear Section Group C*/}

          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_1")
                .map((heading, index) => (
                  <h2 key={index} className="Helius-Eyewear">{heading.brand_name}</h2>
                ))}
              <hr className="hr-line" />
            </div>
            <Link to={`/product-display/${"Helius Glasses"}`}> <img src={`${SERVER_API_URL}/uploads/${heliusGlasses}`} alt="Helius Glasses" className="helius-glasses-image" /></Link>
          </div>


          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Eyeglasses</h1>
              <hr className='hr-line' />
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/${"Square"}`}> <img src={pawerGlass} className='pawerGlass' /></Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <Link to={`/product-display/${"Square"}`}><img src={pawerGlass} className='pawerGlass' /></Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group D */}
          <div className='eyeglasses-container'>
            {brandHeading
              .filter((heading) => heading.section === "section_2")
              .map((heading, index) => (
                <h2 key={index} className='eyeglasses-title'>{heading.brand_name}</h2>
              ))}
            <hr className='hr-line' />
            <div className='eyeglasses-grid'>

              {/* Computer Glasses*/}
              <div className='eyeglasses-card' style={{ backgroundImage: `url(${computerGlassMen})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Computer Glasses</h2>
                  <p className='eyeglasses-card-description'>Protect Your Eyes - Blue Light Filtering</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

              {/* Sunglasses */}
              <div className='eyeglasses-card' style={{ backgroundImage: `url(${sunglasses})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Sunglasses</h2>
                  <p className='eyeglasses-card-description'>Stay Stylish - 100% UV Protection</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

              {/* Prescription Glasses */}
              <div className='eyeglasses-card' style={{ backgroundImage: `url(${prescription})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Prescription</h2>
                  <p className='eyeglasses-card-description'>Perfect Clarity - Tailored to Your Needs</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

              {/* Zero Power Glasses */}
              <div className='eyeglasses-card' style={{ backgroundImage: `url(${zeroPawer})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Zero Power Glasses</h2>
                  <p className='eyeglasses-card-description'>Style without Prescription</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

            </div>
          </div>

          {/* Helius Eyewear Section  Group E*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_3")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-display/${"Square"}`}><img src={`${SERVER_API_URL}/uploads/${lykosEyewear}`} alt="Helius Glasses" className="helius-glasses-image" /></Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Eyeglasses</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group F */}
          <div className='eyeglasses-container'>
            {brandHeading
              .filter((heading) => heading.section === "section_4")
              .map((heading, index) => (
                <h2 key={index} className='eyeglasses-title'>{heading.brand_name}</h2>
              ))}
            <hr className='hr-line' />
            <div className='eyeglasses-grid eyeglasses-grid1'>

              {/* Computer Glasses */}
              <div className='eyeglasses-card eyeglasses-card1' style={{ backgroundImage: `url(${forMenSection})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Computer Glasses</h2>
                  <p className='eyeglasses-card-description'>Protect Your Eyes - Blue Light Filtering</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

              {/* Sunglasses */}
              <div className='eyeglasses-card eyeglasses-card1' style={{ backgroundImage: `url(${forWomenSection})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Sunglasses</h2>
                  <p className='eyeglasses-card-description'>Stay Stylish - 100% UV Protection</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

              {/* Prescription Glasses */}
              <div className='eyeglasses-card eyeglasses-card1' style={{ backgroundImage: `url(${forChildSection})` }}>
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Prescription</h2>
                  <p className='eyeglasses-card-description'>Perfect Clarity - Tailored to Your Needs</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </div>

            </div>
          </div>

          {/* Lykos Eyewear Section Group G */}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_5")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to="/product-display"> <img src={`${SERVER_API_URL}/uploads/${stayAheadInStyleBanner}`} alt="Helius Glasses" className="helius-glasses-image" /></Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Premium Sunglasses</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blinkers Eyeglasses Section Group H*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_6")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-display/${"Square"}`}><img src={`${SERVER_API_URL}/uploads/${Blinkers}`} alt="Helius Glasses" className="helius-glasses-image" /></Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Eyeglasses</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EyePoppin Eyeglasses Section Group I*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_7")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-display/${"Square"}`}> <img src={`${SERVER_API_URL}/uploads/${EyePoppin}`} alt="Helius Glasses" className="helius-glasses-image" /></Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Eyeglasses</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <img src={pawerGlass} className='pawerGlass' />
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Power Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
