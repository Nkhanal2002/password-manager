import React from "react";

const Footer = () => {
  return (
    <div className="p-3 bg-border text-foreground sm:w-[90vw] mx-auto rounded-md shadow-md">
      <p className="footer-info text-center">
        PassManager &copy; {new Date().getFullYear()}
      </p>
      <p className="text-xs sm:text-md text-foreground text-center">
        ⚠️ This app is built for demo and educational purposes only. Please do
        not store any real passwords or sensitive information.
      </p>
    </div>
  );
};

export default Footer;
