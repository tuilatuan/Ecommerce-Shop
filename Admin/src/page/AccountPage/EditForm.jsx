import React, { useEffect, useState } from "react";
import Input from "../../component/Input";
import { Select } from "antd";
import { ROLE } from "../../contants/general";
import { useForm } from "react-hook-form";

const EditForm = ({ email, id, role, user_id, handleUpdateAccount }) => {
  const [roleCurrent, setRoleCurrent] = useState(role || 0);
  console.log("roleCurrent :>> ", roleCurrent);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
      id,
      role,
      user_id,
    },
  });

  useEffect(() => {
    reset?.({
      email,
      id,
      role,
      user_id,
    });
    setRoleCurrent(role);
  }, [email, id, role, user_id]);
  const _onChageCate = (data) => {
    setRoleCurrent(data);
  };

  const _onSubmit = (data) => {
    const payload = {
      ...data,
      role: roleCurrent,
    };

    handleUpdateAccount(payload);
  };
  return (
    <div className="card">
      <h5 className="card-header">Update Account Form</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(_onSubmit)}>
          <div className="row">
            <Input
              label="ID Account"
              disabled
              className="col-lg-6"
              {...register("id")}
            />
            <Input
              label="ID User"
              disabled
              className="col-lg-6"
              {...register("user_id")}
            />
          </div>
          <Input label="Email" disabled name="email" {...register("email")} />
          <Input label="Password" name="password" {...register("password")} />
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
                    placeholder="Please select type Role"
                    options={ROLE}
                    value={roleCurrent}
                    onChange={_onChageCate}
                  />
                </>
              );
            }}
          />
          <button className="btn btn-success">Cập nhật</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
