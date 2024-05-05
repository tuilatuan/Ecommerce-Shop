import React, { useEffect } from "react";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../contants/regex";

const EditForm = ({ id, name, price, setUpdateData, handleUpdateShipping }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValue: {
      id,
      name,
      price,
    },
  });

  useEffect(() => {
    reset?.({
      id,
      name,
      price,
    });
  }, [id, name, price]);

  const _onReset = () => {
    setUpdateData(undefined);
    reset?.({
      id: "",
      name: "",
      price: "",
    });
  };

  const _onSubmit = (data) => {
    handleUpdateShipping(data);
  };

  return (
    <div className="card">
      <h5 className="card-header">Edit Form</h5>
      <div className="card-body">
        <form action="#" id="basicform" onSubmit={handleSubmit(_onSubmit)}>
          <Input label="id" name="id" disabled {...register("id", {})} />

          <Input
            label="Status"
            name="name"
            {...register("name", { required: MESSAGE.require })}
            errors={errors?.name?.message || ""}
          />
          <Input
            label="Price"
            name="price"
            {...register("price", { required: MESSAGE.require })}
            errors={errors?.price?.message || ""}
          />
          <div className="row">
            <div className="col-sm-12 row pl-4">
              <button type="submit" className="btn btn-space btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-space btn-secondary"
                onClick={() => _onReset()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
