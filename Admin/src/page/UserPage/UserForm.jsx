import React, { useEffect, useState } from "react";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../contants/regex";

const UserForm = ({
  address,
  id,
  name,
  phoneNumber,
  createdAt,
  updatedAt,
  setUpdateData,
  handleUpdateUser,
}) => {
  const [create, setCreate] = useState(false);

  const _onToggleCreate = () => {
    setCreate(!create);
    setUpdateData("");
    reset?.({ id: "", name: "", phoneNumber: "", address: "" });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValue: {
      id,
      name,
      phoneNumber,
      address,
    },
  });

  useEffect(() => {
    if (!id && !name && !phoneNumber && !address) return;
    reset?.({ id, name, phoneNumber, address });
  }, [id, name, phoneNumber, address]);

  const _onUpdate = (data) => {
    handleUpdateUser(data);
    reset?.({
      id: "",
      name: "",
      phoneNumber: "",
      address: "",
    });
  };
  return (
    <div className="card">
      <div className="row col-12 justify-content-between align-items-center">
        <h5 className="card-header">Update Form</h5>
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => _onToggleCreate()}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="card-body">
        <form action="#" id="basicform" onSubmit={handleSubmit(_onUpdate)}>
          <Input
            name="id"
            label="Id"
            disabled
            defaultValue={id}
            {...register("id", {})}
          />
          <Input
            name="name"
            label="Name"
            // defaultValue={name}
            {...register("name", {
              required: MESSAGE.require,
            })}
            errors={errors?.name?.message || ""}
          />
          <Input
            name="phone"
            label="Phone"
            // defaultValue={phoneNumber}
            {...register("phoneNumber", {
              required: MESSAGE.require,
            })}
            errors={errors?.phoneNumber?.message || ""}
          />
          <Input
            name="address"
            label="Address"
            // defaultValue={address}
            {...register("address", {
              required: MESSAGE.require,
            })}
            errors={errors?.address?.message || ""}
          />

          <div className="row">
            <div className="col-sm-12 pl-0">
              <p className="text-right">
                <button type="submit" className="btn btn-space btn-primary">
                  Create
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
