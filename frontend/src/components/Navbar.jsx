import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            FeedHub
          </Link>
        </div>

        <div className="navbar-right">
          {isAuthPage ? (
            <>
              {location.pathname !== "/login" && (
                <Link to="/login" className="nav-btn">
                  Login
                </Link>
              )}
              {location.pathname !== "/signup" && (
                <Link to="/signup" className="nav-btn outline">
                  Signup
                </Link>
              )}
            </>
          ) : user ? (
            <div className="profile-wrapper">
              <div className="profile-icon">{getInitials(user.username)}</div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </nav>
      <div className="space"></div>
    </div>
  );
};

export default Navbar;
