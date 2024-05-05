import React, { useEffect } from "react";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../contants/regex";

const FormInfo = ({
  account_id,
  address,
  email_user,
  name,
  phoneNumber,
  user_id,
  handleUpdateProfileInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      address,
      email_user,
      name,
      phoneNumber,
    },
  });

  useEffect(() => {
    reset({ address, email_user, name, phoneNumber });
  }, [address, email_user, name, phoneNumber]);

  const _onSubmit = (data) => {
    const payload = {
      id: user_id,
      phoneNumber: data.phoneNumber,
      name: data.name,
      address: data.address,
    };
    handleUpdateProfileInfo?.(payload);
  };
  return (
    <div className="card">
      <h3 className="text-center">Profile Info</h3>
      <form onSubmit={handleSubmit(_onSubmit)}>
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
              value: REGREX.phoneNumber,
              message: MESSAGE.phoneNumber,
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
          disabled
          {...register("email_user", {
            required: MESSAGE.require,
            pattern: {
              value: REGREX.email,
              message: MESSAGE.email,
            },
          })}
          errors={errors?.email_user?.message || ""}
        />
        <button className="btn btn-warning m-auto">Cập nhật</button>
      </form>
    </div>
  );
};

export default FormInfo;
