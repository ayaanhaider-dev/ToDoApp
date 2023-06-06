import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <p className="text-white text-center">
          &copy; {new Date().getFullYear()} Todo App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
