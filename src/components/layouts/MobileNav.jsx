import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  return (
    <>
      <nav className="mobile">
        <div className="mobile-logo">
          <a className="mobile-logo-link" href="#">
            Portfolio
          </a>
        </div>
        <button
          onClick={toggleNav}
          className={`mobile-burger ${isNavOpen ? "active" : ""}`}
        >
          <div className="mobile-burger-bar"></div>
          <div className="mobile-burger-bar"></div>
          <div className="mobile-burger-bar"></div>
        </button>

        <div className={`mobile-menu ${isNavOpen ? "active" : ""}`}>
          <a href="#" className="mobile-menu-link" onClick={toggleNav}>
            Home
          </a>
          <a href="#about" className="mobile-menu-link" onClick={toggleNav}>
            About
          </a>
          <a href="#skills" className="mobile-menu-link" onClick={toggleNav}>
            Skills
          </a>
          <a href="#project" className="mobile-menu-link" onClick={toggleNav}>
            Projects
          </a>
          <a href="#contact" className="mobile-menu-link" onClick={toggleNav}>
            Contact
          </a>
          {!user && <Link className="mobile-menu-link" to={'/login'}>Login</Link>}
          {user && <Link className="mobile-menu-link" to={'/admin'}>Admin</Link>}
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
