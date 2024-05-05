import React from "react";
import Checkbox from "../../component/Checkbox";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const FilterProduct = ({
  categories,
  activeCategory,
  currentPriceRange,
  onCateFilterChange,
  handlePriceFilterChange,
  searchString,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onFilterChange = (id, isChecked) => {
    onCateFilterChange(id, isChecked);
  };

  const _onSearchString = (data) => {
    if (data.search == "") {
      message.warning("Chưa điền tên sản phẩm");
    } else {
      searchString(data.search);
    }
  };

  const _onResetFilter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    navigate(PATHS.PRODUCT.INDEX);
    reset({ search: "" });
  };
  return (
    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
      <div className="product-sidebar">
        <div className="product-sidebar-widget">
          <h4 className="mb-0">E-Commerce Filter</h4>
        </div>
        <div className="product-sidebar-widget searchproduct">
          <input
            className="form-control"
            type="text"
            placeholder="Search.."
            {...register("search")}
          />

          <button
            className="btn btn-outline-primary"
            onClick={handleSubmit(_onSearchString)}
          >
            Tìm
          </button>
        </div>
        <div className="product-sidebar-widget">
          <h4 className="product-sidebar-widget-title">Category</h4>
          {categories?.map((category, index) => {
            return (
              <Checkbox
                key={category.id || index}
                id={category.id || index}
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
        <div className="product-sidebar-widget">
          <button className="btn btn-outline-light" onClick={_onResetFilter}>
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
