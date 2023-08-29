import { Link } from "react-router-dom";
import Color from "../UI/Color";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";

const DesktopNav = (params) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <nav className="desktop">
      <div className="wrapper">
        <div className="desktop-container">
          <a href="#" className="desktop-container-logo">
            Patryk Kawiak - <Color>Portfolio</Color>
          </a>
          <div className="desktop-container-list">
            <a href="#" className="desktop-container-list-item">
              Home
            </a>
            <a href="#about" className="desktop-container-list-item">
              About
            </a>
            <a href="#skills" className="desktop-container-list-item">
              Skills
            </a>
            <a href="#project" className="desktop-container-list-item">
              Projects
            </a>
            <a href="#contact" className="desktop-container-list-item">
              Contact
            </a>
            {!user && (
              <Link className="desktop-container-list-item" to={"/login"}>
                Login
              </Link>
            )}
            {user && (
              <Link className="desktop-container-list-item" to={"/admin"}>
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default DesktopNav;
