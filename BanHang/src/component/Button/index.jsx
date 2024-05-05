import React from "react";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      type="button"
      className={`${className} btn btn-outline-primary-2  `}
      {...rest}
    >
      {/* <span className="btn-text">Place Order</span> */}
      {children}
    </button>
  );
};

export default Button;
