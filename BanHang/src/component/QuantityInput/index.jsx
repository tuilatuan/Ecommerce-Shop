import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const QuantityInput = (
  {
    className,
    defaultValue = 1,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);
  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue ?? 1);
      },
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const _onInputChange = (e) => {
    setCurrentQuantity(
      e.target.value !== "" ? _modifyValue(Number(e.target.value)) : ""
    );
  };
  const _onInputBlur = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(defaultValue);
    }
  };

  const _onIncrease = () => {
    const value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };
  const _onDecrease = () => {
    const value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };
  const _modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };
  return (
    <div className="qty-label">
      <div className="input-number">
        <input
          type="number"
          value={currentQuantity}
          onChange={_onInputChange}
          onBlur={_onInputBlur}
          max={max}
          {...inputProps}
        />
        <span className="qty-up" onClick={_onIncrease}>
          +
        </span>
        <span className="qty-down" onClick={_onDecrease}>
          -
        </span>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
