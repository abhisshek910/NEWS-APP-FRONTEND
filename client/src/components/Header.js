import { useNavigate } from "react-router-dom";
import "../css/header.css";
import logo from "../assets/logo.png";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Header() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img
            className="logo-img"
            src={logo} // Replace with the actual path to your logo image
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className="logo-text">
            <h2>
              <span>D</span>hhamaka
              <span>N</span>ews
            </h2>
          </div>
        </div>
      </nav>
      <div className="carousel-container">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showThumbs={false}
          className="carousel-div"
        >
          <div>
            <img src={img1} className="carousel-image2" />
          </div>
          <div>
            <img src={img2} className="carousel-image" />
          </div>
          <div>
            <img src={img3} className="carousel-image" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Header;
