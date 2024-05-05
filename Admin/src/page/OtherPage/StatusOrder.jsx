import React from "react";

const StatusOrder = ({ statusData }) => {
  return (
    <div className="card">
      <h5 className="card-header">Status Order</h5>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {statusData?.length > 0 &&
              statusData.map((status, index) => {
                return (
                  <tr key={status.id || index}>
                    <th scope="row">{status.id}</th>
                    <td>{status.name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusOrder;
