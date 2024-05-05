import React, { useEffect, useState } from "react";
import useProductDetail from "./useProductDetail";
import { Input as antInput, Select } from "antd";
const { TextArea } = antInput;
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../contants/regex";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";

const ProductDetailPage = () => {
  const { productProps, categories } = useProductDetail();

  const product = productProps?.product || "";
  const { onUpdateProduct } = productProps || {};

  const { id, name, category_id, description, price, slug, images } = product || {};

  const [cateID, setcateID] = useState(category_id || 0);

  useEffect(() => {
    setcateID(category_id);
  }, [category_id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id,
      name,
      category_id,
      description,
      price,
      slug,
      images,
    },
  });

  useEffect(() => {
    if (!product) return;
    reset?.({
      id,
      name,
      category_id,
      description,
      price,
      slug,
      images,
    });
  }, [product]);

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

  const _onsubmit = (data) => {
    let payload = { ...data, category_id: cateID, price: Number(data?.price) };
    onUpdateProduct(payload);
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
                    {name}
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
            <form
              id="basicform"
              data-parsley-validate
              onSubmit={handleSubmit(_onsubmit)}
            >
              <div className="row">
                <Input
                  label="Product Name"
                  name="productname"
                  className="col-xl-6 col-lg-6"
                  defaultValue={name}
                  {...register("name", {
                    required: MESSAGE.require,
                  })}
                  errors={errors?.name?.message || ""}
                />
                <Input
                  label="Slug"
                  defaultValue={slug}
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
                  defaultValue={price}
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
                          value={cateID}
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
                      defaultValue={description}
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
                      Update
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

export default ProductDetailPage;
