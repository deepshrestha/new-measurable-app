import React from "react";

export default function DownloadData() {
  const onHandleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="col-md-4 col-xs-12">
        <div className="metric-box download-data">
          <div className="d-flex align-items-center">
            <div className="text-center">
              <a
                href="#"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#downloadDataModal"
              >
                Download Data
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="downloadDataModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="downloadDataModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: 460 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Download Device Data</h2>
            </div>

            <div className="modal-body">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="start-date"
                className="form-control"
                onChange={onHandleChange}
              />
              <label className="form-label" style={{ marginTop: 20 }}>
                End Date
              </label>
              <input
                type="date"
                name="end-date"
                className="form-control"
                onChange={onHandleChange}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
