import React, { useEffect } from "react";

const Chart = () => {
  useEffect(() => {
    Morris.Area({
      element: "morris_totalrevenue",
      behaveLikeLine: true,
      data: [
        { x: "2024-1", y: 0 },
        { x: "2024-2", y: 7500 },
        { x: "2024-3", y: 1500 },
        { x: "2024-4", y: 7500 },
        { x: "2024-5", y: 3000 },
        { x: "2024-6", y: 4000 },
      ],
      xkey: "x",
      ykeys: ["y"],
      labels: ["Y"],
      lineColors: ["#5969ff"],
      resize: true,
    });
  }, []);

  return (
    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
      <div className="card">
        <h5 className="card-header"> Total Revenue</h5>
        <div className="card-body">
          <div id="morris_totalrevenue" />
        </div>
        <div className="card-footer">
          <p className="display-7 font-weight-bold">
            <span className="text-primary d-inline-block">$26,000</span>
            <span className="text-success float-right">+9.45%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
