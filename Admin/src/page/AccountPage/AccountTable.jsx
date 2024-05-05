import React from "react";
import { ROLE } from "../../contants/general";

const AccountTable = ({ allAccount, changeAccountUpdate }) => {
  return (
    <div className="card">
      <h5 className="card-header">Account Table</h5>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Id_user</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allAccount?.length > 0 &&
              allAccount.map((account, index) => {
                const { id, user_id, email, role } = account || {};

                const roleLabel =
                  ROLE.find((roleList) => roleList.value === role)?.label ||
                  "Không xác định";
                return (
                  <tr key={id || index}>
                    <th scope="row">{id}</th>
                    <td>{user_id}</td>
                    <td>{email}</td>
                    <td>{roleLabel}</td>
                    <td>
                      <button
                        onClick={() => changeAccountUpdate(index)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;
