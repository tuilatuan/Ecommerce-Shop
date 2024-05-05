import React from "react";

const Checkbox = ({ id, label, number, onChange, className, ...props }) => {
  return (
    <>
      <div className="input-checkbox ">
        <input
          type="checkbox"
          id={id || "category-2"}
          onChange={onChange}
          {...props}
        />
        <label htmlFor={id || "category-2"}>
          <span />
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
