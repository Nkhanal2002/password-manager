import React from "react";

const Footer = () => {
  return (
    <div className="p-3 bg-border text-foreground sm:w-[90vw] mx-auto rounded-md shadow-md">
      <p className="footer-info text-center">
        PassManager &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
