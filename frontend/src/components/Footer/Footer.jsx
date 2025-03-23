import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section - About */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>
            Bringing you the best quality food with a seamless and hassle-free
            experience. Fresh, fast, and delivered right to your doorstep.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center Section - Company Links */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>📞 +1 345 678 9012</li>
            <li>📩 food@bigbite.com</li>
            <li>📍 123 Main Street,Hyderabad,India</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
