import React, { forwardRef } from "react";
import styled from "styled-components";
const Label = styled.label`
  color: #333;
  font-size: 16px;
  text-transform: capitalize;
  margin-bottom: 10px;
  display: inline-block;
`;

const Input = forwardRef(
  (
    {
      label,
      required,
      name = "",
      errors,
      renderInput = undefined,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`form-group ${className && className}`}>
        {label && (
          <Label className="label" htmlFor={name}>
            {label} {required && <span>*</span>}
          </Label>
        )}

        {renderInput?.({ rest, errors, ref }) || (
          <input
            type="text"
            {...rest}
            className={`form-control  ${!!errors ? "input-error" : ""}`}
            ref={ref}
            name={name}
            id={name}
          />
        )}
        {errors && (
          <p className="error form-error" style={{ minHeight: 23 }}>
            {errors || ""}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
