import React from "react";
import cn from "../../utils/cn";
import { MODAL_TYPE } from "../../contants/general";
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";
import { handleLogin } from "../../store/reducers/authReducer";

const LoginForm = ({ modalType }) => {
  const dispatch = useDispatch();

  const _onLogin = (data) => {
    dispatch(handleLogin(data));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div
      id="login"
      className={cn("tabcontent", {
        show: modalType === MODAL_TYPE.login,
      })}
    >
      <form onSubmit={handleSubmit(_onLogin)}>
        <Input
          label="email"
          name="email"
          required
          placeholder="Your email address"
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
          label="password"
          name="password"
          type="password"
          required
          placeholder="Your password"
          {...register("password", {
            required: MESSAGE.require,
            pattern: {
              value: REGREX.password,
              message: MESSAGE.password.regex,
            },
            minLength: {
              value: 6,
              message: MESSAGE.password.length,
            },
          })}
          errors={errors?.password?.message || ""}
        />
        <Button type="submit" className="btn-fill">
          Đăng Nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
