import { useNavigate } from "react-router-dom";
import "../css/header.css";
function Header() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2
            onClick={() => {
              navigate("/");
            }}
          >
            <span>D</span>hhamaka
            <span>N</span>ews
          </h2>
        </div>
      </nav>
    </>
  );
}

export default Header;
