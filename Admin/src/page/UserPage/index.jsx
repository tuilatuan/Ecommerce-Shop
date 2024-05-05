import React, { useState } from "react";
import useUserPage from "./useUserPage";
import Input from "../../component/Input";
import UserForm from "./UserForm";

const UserPage = () => {
  const { userProps } = useUserPage();
  const [updateData, setUpdateData] = useState({});
  const { allUser, handleUpdateUser, handleDeleteUser } = userProps || {};

  const _onUpdate = (index) => {
    setUpdateData(allUser[index]);
  };

  return (
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="card">
          <h5 className="card-header">Catagory List</h5>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser?.length > 0 &&
                  allUser.map((cate, index) => {
                    const { name, id, phoneNumber, address } = cate || {};
                    return (
                      <tr key={id || index}>
                        <th scope="row">{id}</th>
                        <td>{name}</td>
                        <td>{phoneNumber}</td>
                        <th scope="col">{address}</th>
                        <th scope="col">
                          <button
                            onClick={() => _onUpdate(index)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(id)}
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
      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
        <UserForm
          {...updateData}
          setUpdateData={setUpdateData}
          handleUpdateUser={handleUpdateUser}
        />
      </div>
    </div>
  );
};

export default UserPage;
