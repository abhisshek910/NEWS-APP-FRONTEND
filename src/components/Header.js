import React, { useState } from "react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
function Header() {
  const navigate = useNavigate();
  const [showMediaIcons, setShowMrdiaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2
            onClick={() => {
              navigate("/");
            }}
          >
            <span>D</span>hhamka
            <span>N</span>ews
          </h2>
        </div>
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="#" target="_abhi">
                <FaFacebookSquare className="facebook"></FaFacebookSquare>
              </a>
            </li>
            <li>
              <a href="#" target="_abhi">
                <FaInstagramSquare className="instagram"></FaInstagramSquare>
              </a>
            </li>
          </ul>
          <div className="hamberger-menu">
            <a href="#" onClick={() => setShowMrdiaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
