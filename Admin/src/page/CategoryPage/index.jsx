import React, { useState } from "react";
import FormCate from "./FormCate";
import { productService } from "../../services/productService";

import { message } from "antd";
import useQuery from "../../hooks/useQuery";

const CategoryPage = () => {
  const { data, refetch } = useQuery(productService.getAllCategory);

  const categories = data?.data.categories;

  const [updateData, setUpdateData] = useState({});

  //handle Data
  const onUpdateCategory = async (data) => {
    console.log("capnhat");
    try {
      const { id, name, slug } = data || {};
      const payload = {
        id: id,
        name: name,
        slug: slug,
      };

      const res = await productService.updateCategory(payload);
      if (res.status == 200) {
        message.success("Cập nhật thành công");
        refetch();
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch (error) {
      message.warning("Cập nhật lỗi");
    }
  };
  const onNewCategory = async (data) => {
    console.log("new");

    try {
      const { name, slug } = data || {};
      const payload = {
        name: name,
        slug: slug,
      };

      const res = await productService.newCategory(payload);
      if (res.status == 200) {
        message.success("Tạo mới thành công");
        refetch();
      } else {
        message.error("Tạo mới thất bại");
      }
    } catch (error) {
      message.warning("Tạo mới lỗi");
    }
  };
  const onDeleteCategory = async (data) => {
    try {
      const payload = { id: data };
      const res = await productService.deleteCategory(payload);
      if (res.status == 200) {
        message.success("Xóa thành công");
        refetch();
      } else {
        message.error("Xóa thất bại");
      }
    } catch (error) {
      message.warning("Xóa lỗi");
    }
  };

  // handle local
  const _onEdit = (data) => {
    setUpdateData(categories[data]);
  };
  const onReset = () => {
    setUpdateData({});
  };

  //props
  const handleProps = {
    onUpdateCategory,
    onReset,
    onNewCategory,
  };
  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="card">
          <h5 className="card-header">Catagory List</h5>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.length > 0 &&
                  categories.map((cate, index) => {
                    const { name, id, slug } = cate || {};
                    return (
                      <tr key={id || index}>
                        <th scope="row">{id}</th>
                        <td>{name}</td>
                        <td>{slug}</td>
                        <th scope="col">
                          <button
                            onClick={() => _onEdit(index)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCategory(id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-xl-5 col-lg-6 col-md-12 col-sm-8 col-12">
        <FormCate {...updateData} {...handleProps} />
      </div>
    </div>
  );
};

export default CategoryPage;
