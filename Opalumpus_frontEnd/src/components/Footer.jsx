import "./FooterStyles.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const isAdmin = () => {
    return localStorage.getItem('admin') === 'true'
  }
  
  return (
    <div className="footer">
      <div>
        <h1>Opalumpus</h1>
        <p>Your partner to every adventure</p>
      </div>
      <div>
        <a href="/" className="fa-brands fa-facebook-square"></a>
        <a href="/" className="fa-brands fa-instagram-square"></a>
        <a href="/" className="fa-brands fa-twitter-square"></a>
      </div>
      <div>
        {isAdmin() ? <button className="admin-signin-button" onClick={() => {
          localStorage.removeItem('admin');
          navigate('/')
        }}>Log out as admin</button>: <button
          className="admin-signin-button"
          onClick={() => navigate("/admin-signin")}
        >
          Sign In as Admin
        </button>}
      </div>
    </div>
  );
};
export default Footer;
