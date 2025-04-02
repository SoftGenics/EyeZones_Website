import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import { SERVER_API_URL } from '../../server/server';

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

import './home.css';

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
  const yourPerfectPairBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "left")?.image_url : null;

  const crystalClearVisionBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "right")?.image_url : null;

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

          {/* Top Banners */}
          <Link to="#">
            <div className='your-perfect-pair'>
              <div className='yourPerfectPairBanner-container'>
                {/* <img src={yourPerfectPairBanner} className='yourPerfectPairBanner' alt='Your Perfect Pair Banner' /> */}
                {yourPerfectPairBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${yourPerfectPairBanner}`} // Ensure correct URL
                    className="yourPerfectPairBanner"
                    alt="Your Perfect Pair Banner"
                  />
                )}
              </div>

              <div className='crystalClearVisionBanner-container'>
                {/* <img src={crystalClearVisionBanner} className='crystalClearVisionBanner' alt='Crystal Clear Vision Banner' /> */}
                {crystalClearVisionBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${crystalClearVisionBanner}`} // Ensure correct URL
                    className="crystalClearVisionBanner"
                    alt="Crystal Clear Vision Banner"
                  />
                )}
              </div>
            </div>
          </Link>

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
