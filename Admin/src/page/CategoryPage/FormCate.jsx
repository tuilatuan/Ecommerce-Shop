import React, { useEffect } from "react";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../contants/regex";

const FormCate = ({ id, name, slug, onUpdateCategory, onReset, onNewCategory }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValue: {
      id,
      name,
      slug,
    },
  });
  useEffect(() => {
    if (!id && !name && !slug) return;
    reset?.({ id, name, slug });
  }, [id, name, slug]);

  const _onReset = () => {
    onReset();
    reset?.({ id: "", name: "", slug: "" });
  };

  const _onSubmit = (data) => {
    if (!data?.id) {
      onNewCategory(data);
    } else {
      onUpdateCategory(data);
    }
    _onReset();
  };

  return (
    <div className="card">
      <h5 className="card-header">{id ? "Edit" : "New"} Form</h5>
      <div className="card-body">
        <form id="form" onSubmit={handleSubmit(_onSubmit)}>
          <Input
            label="Id"
            name="id"
            disabled
            // defaultValue={id}
            {...register("id", {})}
            errors={errors?.id?.message || ""}
          />
          <Input
            label="Name"
            name="name"
            // defaultValue={name}
            {...register("name", {
              required: MESSAGE.require,
            })}
            errors={errors?.name?.message || ""}
          />
          <Input
            label="Slug"
            name="slug"
            // defaultValue={slug}
            {...register("slug", {
              required: MESSAGE.require,
            })}
            errors={errors?.slug?.message || ""}
          />
          <div className="row pt-2 pt-sm- mt-1">
            <div className="col-sm-6 pl-0">
              <p className="text-right">
                <button className="btn btn-space btn-primary">
                  {id ? "Update" : "New"}
                </button>
                <button
                  type="button"
                  onClick={_onReset}
                  className="btn btn-space btn-secondary"
                >
                  Reset
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCate;
