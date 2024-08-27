import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-0">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2024 Unimate. All rights reserved.</p>
        <nav>
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="/terms" className="hover:text-red-600">Terms of Service</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-600">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
