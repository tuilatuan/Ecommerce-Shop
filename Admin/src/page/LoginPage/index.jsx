import React, { useEffect } from "react";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";
import tokenMethod from "../../utils/token";
import PATHS from "../../contants/paths";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (tokenMethod.get()) {
      navigate(PATHS.HOME);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = async (data) => {
    try {
      const res = await dispatch(handleLogin(data));
      if (res.payload) {
        navigate("/");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <div className="splash-container">
      <div className="card ">
        <div className="card-header text-center" style={{ backgroundColor: "#000" }}>
          <Link to={PATHS.HOME}>
            <img
              className="logo-img"
              src="./public/assets/img/logo.png"
              alt="logo"
            />
          </Link>
          <span className="splash-description">
            Please enter your user information.
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(_onSubmit)}>
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
              type="password"
              {...register("password", {
                required: MESSAGE.require,
              })}
              errors={errors?.password?.message || ""}
            />
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Sign in
            </button>
          </form>
        </div>
        {/* <div className="card-footer bg-white p-0  ">
          <div className="card-footer-item card-footer-item-bordered">
            <a href="#" className="footer-link">
              Create An Account
            </a>
          </div>
          <div className="card-footer-item card-footer-item-bordered">
            <a href="#" className="footer-link">
              Forgot Password
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
