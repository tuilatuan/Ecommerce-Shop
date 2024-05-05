import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import { MESSAGE } from "../../contants/regex";
import Input from "../../component/Input";
import { Input as antInput, Select } from "antd";
import useProductDetail from "./useProductDetail";
import { productService } from "../../services/productService";
import { message } from "antd";

const ProductNew = () => {
  const { productProps, categories } = useProductDetail();
  const navigate = useNavigate();
  const [cateID, setcateID] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //set anh
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  var transCategories = [];
  if (categories?.length > 0) {
    transCategories = categories?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }
  const _onChageCate = (data) => {
    setcateID(data);
  };
  ///set hinh

  const onNewProduct = async (data) => {
    console.log("data :>> ", data);
    try {
      const formData = new FormData();
      formData.append("image", image);
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const res = await productService.newProduct(formData);
      console.log("res :>> ", res);
      if (res.status == 200) {
        message.success("Tạo mới thành công ");
        navigate(PATHS.PRODUCT.INDEX);
      } else {
        message.error("Tạo mới thất bại ");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const _onSubmit = (data) => {
    const newData = { ...data, category_id: cateID };
    onNewProduct(newData);
  };

  return (
    <div className="row">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-header">
            <h2 className="pageheader-title">Product Detail</h2>
            <p className="pageheader-text">
              Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris
              facilisis faucibus at enim quis massa lobortis rutrum.
            </p>
            <div className="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={PATHS.HOME} className="breadcrumb-link">
                      Home
                    </Link>
                  </li>
                  <Link
                    to={PATHS.PRODUCT.INDEX}
                    className="breadcrumb-item "
                    aria-current="page"
                  >
                    Products
                  </Link>
                  <li className="breadcrumb-item active" aria-current="page">
                    New Product
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* ============================================================== */}
      {/* basic form */}
      {/* ============================================================== */}
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card">
          <h5 className="card-header">Basic Form</h5>
          <div className="card-body">
            <form id="basicform" onSubmit={handleSubmit(_onSubmit)}>
              <Input
                label="Product Image"
                name="productimage"
                type="file"
                className="col-xl-6 col-lg-6"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="row">
                <Input
                  label="Product Name"
                  name="productname"
                  className="col-xl-6 col-lg-6"
                  {...register("name", {
                    required: MESSAGE.require,
                  })}
                  errors={errors?.name?.message || ""}
                />
                <Input
                  label="Slug"
                  name="Slug"
                  className="col-xl-6 col-lg-6"
                  {...register("slug", {
                    required: MESSAGE.require,
                  })}
                  errors={errors?.slug?.message || ""}
                />
              </div>
              <div className="row">
                <Input
                  label="Price"
                  className="col-xl-6 col-lg-6"
                  name="price"
                  {...register("price", {
                    required: MESSAGE.require,
                  })}
                  errors={errors?.price?.message || ""}
                />
                <Input
                  className="col-xl-6 col-lg-6"
                  label="Category"
                  name="category"
                  renderInput={() => {
                    return (
                      <>
                        <Select
                          style={{
                            width: "100%",
                          }}
                          className="customSelect form-control"
                          suffixIcon={<></>}
                          placeholder="Please select type category"
                          options={transCategories}
                          value={1}
                          onChange={_onChageCate}
                        />
                      </>
                    );
                  }}
                />
              </div>
              <Input
                label="Description"
                name="desc"
                renderInput={({ formState: errors }) => {
                  return (
                    <textarea
                      className="form-control"
                      style={{
                        height: 120,
                        resize: "none",
                      }}
                      {...register("description", {
                        required: MESSAGE.require,
                      })}
                    ></textarea>
                  );
                }}
                errors={errors?.desc?.message || ""}
              />

              <div className="row">
                <div className="col-sm-6 pl-0">
                  <p className="text-right">
                    <button type="submit" className="btn btn-space btn-success">
                      Create
                    </button>
                    <Link
                      to={PATHS.PRODUCT.INDEX}
                      className="btn btn-space btn-secondary"
                    >
                      Back
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ============================================================== */}
      {/* end basic form */}
      {/* ============================================================== */}
    </div>
  );
};

export default ProductNew;
