import React from "react";
import useProductPage from "../../page/ProductsPage/useProductPage";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SearchInputHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filterProps } = useProductPage();
  const { searchString } = { ...filterProps } || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    if (location?.pathname == "/product") {
      searchString(data?.search);
    } else {
      navigate(`/product?search=${data?.search}`);
    }

    // Form không hợp lệ, hiển thị thông báo cảnh báo
  };

  return (
    <div className="col-md-6">
      <div className="header-search">
        <form onSubmit={handleSubmit(_onSubmit)}>
          <select className="input-select">
            <option value={0}>All Categories</option>
            <option value={1}>Category 01</option>
            <option value={1}>Category 02</option>
          </select>
          <input
            className="input"
            placeholder="Search here"
            {...register("search", {})}
          />
          <button className="search-btn">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchInputHeader;
