import { useNavigate } from "react-router-dom";
import "../css/header.css";
import logo from "../assets/logo.png";
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
    </>
  );
}

export default Header;
