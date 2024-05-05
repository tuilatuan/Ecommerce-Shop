import React from "react";

const ShippingType = ({ shippingData, setUpdateData }) => {
  const _onSetDataUpdate = (data) => {
    setUpdateData(data);
  };
  const _onReset = () => {
    setUpdateData(undefined);
  };
  return (
    <div className="card">
      <h5 className="card-header">Shipping Type</h5>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {shippingData?.length > 0 &&
              shippingData.map((shpping, index) => {
                return (
                  <tr key={shpping.id || index}>
                    <th scope="row">{shpping.id}</th>
                    <td>{shpping.name}</td>
                    <td>{shpping.price}</td>
                    <td>
                      <div className="btn-group ml-auto">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => _onSetDataUpdate(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => _onReset}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
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

export default ShippingType;
