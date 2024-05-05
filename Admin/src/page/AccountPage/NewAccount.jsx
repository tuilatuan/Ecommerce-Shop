import React, { useState } from "react";
import Input from "../../component/Input";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";
import useAccountPage from "./useAccountPage";
import { Select } from "antd";
import { ROLE } from "../../contants/general";

const NewAccount = () => {
  const { handleCreateAccount } = useAccountPage();
  const [role, setRole] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    const payload = { ...data, role: role };

    handleCreateAccount?.(payload);
  };
  const _onChageCate = (data) => {
    setRole(data);
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
          <div className="page-header">
            <h2 className="pageheader-title">Dashboard Create Account </h2>
            <p className="pageheader-text">
              Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris
              facilisis faucibus at enim quis massa lobortis rutrum.
            </p>
            <div className="page-breadcrumb row justify-content-between mr-0">
              <nav
                aria-label="breadcrumb  "
                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#" className="breadcrumb-link">
                      Home
                    </a>
                  </li>
                  ss
                  <li className="breadcrumb-item active" aria-current="page">
                    Products
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="card">
          <h5 className="card-header">Creat Account From</h5>
          <div className="card-body">
            <form id="basicform" onSubmit={handleSubmit(_onSubmit)}>
              <Input
                label="Name"
                name="name"
                {...register("name", {
                  required: MESSAGE.require,
                })}
                errors={errors?.name?.message || ""}
              />
              <Input
                label="Phone"
                name="phone"
                {...register("phoneNumber", {
                  required: MESSAGE.require,
                  pattern: {
                    value: REGREX.phone,
                    message: MESSAGE.phone,
                  },
                })}
                errors={errors?.phoneNumber?.message || ""}
              />
              <Input
                label="Address"
                name="address"
                {...register("address", {
                  required: MESSAGE.require,
                })}
                errors={errors?.address?.message || ""}
              />
              <Input
                label="Email"
                name="email"
                {...register("email", {
                  required: MESSAGE.require,
                  pattern: {
                    value: REGREX.email,
                    message: MESSAGE.email,
                  },
                })}
                errors={errors?.email?.message || ""}
              />
              <Input
                label="Password"
                name="password"
                {...register("password", {
                  required: MESSAGE.require,
                })}
                errors={errors?.password?.message || ""}
              />
              <Input
                label="Chức vụ"
                name="role"
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
                        options={ROLE}
                        value={role}
                        onChange={_onChageCate}
                      />
                    </>
                  );
                }}
              />

              <div className="row">
                <div className="col-sm-6 pl-0">
                  <p className="text-right">
                    <button className="btn btn-space btn-primary">Submit</button>
                    <Link
                      to={PATHS.ACCOUNT.INDEX}
                      className="btn btn-space btn-secondary"
                    >
                      Cancel
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAccount;
