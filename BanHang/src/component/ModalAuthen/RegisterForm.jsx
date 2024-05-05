import React from "react";
import cn from "../../utils/cn";
import { MODAL_TYPE } from "../../contants/general";
import Input from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";
import { message } from "antd";
import { handleRegister } from "../../store/reducers/authReducer";

const RegisterForm = ({ modalType }) => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    try {
      // const { name, email, password, phone, address } = data;
      const data2 = {
        ...data,
        role: 0,
      };
      dispatch(handleRegister(data2));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <div
      id="register"
      className={cn("tabcontent", {
        show: modalType === MODAL_TYPE.register,
      })}
    >
      <form className="form" onSubmit={handleSubmit(_onSubmit)}>
        <Input
          label="Name"
          name="name"
          required
          placeholder="Your Name"
          className="mb-6"
          {...register("name", {
            required: MESSAGE.require,
          })}
          errors={errors?.name?.message || ""}
        />
        <Input
          label="Số điện thoại"
          name="Phone"
          required
          placeholder="Your Phone"
          className="mb-6"
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
          placeholder="Your Password"
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

        <Input
          label="Địa chỉ"
          name="address"
          required
          placeholder="Your Address"
          {...register("address", {
            required: MESSAGE.require,
          })}
          errors={errors?.address?.message || ""}
        />

        <Button type="submit" className="btn-fill">
          Đăng Ký
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
