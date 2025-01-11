import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Jeeshan Hotel. All rights reserved.</p>
        </footer>
    );
};

export default Footer;