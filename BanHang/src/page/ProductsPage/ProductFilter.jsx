import React, { useEffect, useRef } from "react";
import Checkbox from "../../component/Checkbox";

const ProductFilter = ({
  categories,
  activeCategory,
  currentPriceRange,
  onCateFilterChange,
  handlePriceFilterChange,
}) => {
  const myPriceFilterTimeout = useRef();
  const onFilterChange = (id, isChecked) => {
    onCateFilterChange(id, isChecked);
  };
  useEffect(() => {
    var priceInputMax = document.getElementById("price-max"),
      priceInputMin = document.getElementById("price-min");

    // Price Slider
    var priceSlider = document.getElementById("price-slider");
    if (priceSlider) {
      noUiSlider.create(priceSlider, {
        start: currentPriceRange,
        connect: true,
        step: 100000,
        range: {
          min: 0,
          max: 70000000,
        },
        // tooltips: true,
        format: wNumb({
          decimals: 0,
          thousand: ".",
          suffix: " đ",
        }),
      });

      priceSlider.noUiSlider.on("update", function (values, handle) {
        var value = values[handle];
        handle
          ? (priceInputMax.textContent = value)
          : (priceInputMin.textContent = value);
        if (myPriceFilterTimeout.current) {
          clearTimeout(myPriceFilterTimeout.current);
        }
        myPriceFilterTimeout.current = setTimeout(() => {
          handlePriceFilterChange(
            values.map((value) => {
              var cleanValue = value?.replace(/\./g, "");
              cleanValue = cleanValue?.replace("đ", "");
              return cleanValue;
            })
          );
        }, 500);
      });
    }
  }, []);
  return (
    <div id="aside" className="col-md-3">
      {/*Categores */}
      <div className="aside">
        <h3 className="aside-title">Categories</h3>
        <div className="checkbox-filter">
          {categories?.map((category, index) => {
            return (
              <Checkbox
                key={category?.id || index}
                id={category?.id || index}
                label={category?.name || ""}
                checked={
                  // activeCategory == category?.id
                  activeCategory?.includes((category?.id).toString())
                }
                onChange={(value) => {
                  onFilterChange((category?.id).toString(), value.target.checked);
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Categores */}
      {/* Price */}
      <div className="aside">
        <h3 className="aside-title">Price</h3>
        <div className="price-filter">
          <div id="price-slider" />
          <div className="prices">
            <span className="input-number price-min" id="price-min">
              0
            </span>
            to
            <span className="input-number price-max" id="price-max">
              9999999999
            </span>
          </div>
        </div>
      </div>
      {/* /Price */}
    </div>
  );
};

export default ProductFilter;
