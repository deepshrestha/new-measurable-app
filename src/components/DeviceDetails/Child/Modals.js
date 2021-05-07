import React, { useState } from "react";

const Modals = ({handleData, onCheckOutletBtn, onCancelModal}) => {
  //console.log(handleData)
  const [onConfirm, setOnConfirm] = useState(false);
  const onConfirmClick = () => {
    $('#confirmationModal').modal('hide');
    setOnConfirm(true);
  };
  const onRuleSetClick = () => {
    $('#ruleSetModal').modal('hide');
    //if(handleData.openModal){
      onCheckOutletBtn(handleData.event);
    //}
  }
  return (
    <>
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Confirm</h2>
            </div>

            <div className="modal-body">
              <hr />
              <p>
                This will override the following Rule Set, are you sure you wish
                to proceed?
              </p>
              <h3>Fish Tank Light OFF</h3>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => onCancelModal(handleData.event)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#ruleSetModal"
                onClick={onConfirmClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {onConfirm && (
        <div
          className="modal fade"
          id="ruleSetModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ruleSetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Rule Set Duration</h2>
              </div>

              <div className="modal-body">
                <hr />
                <p>Please provide Rule Set duration in Minutes</p>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Duration"
                />
                <label className="override-ruleset">
                  <input type="checkbox" checked readOnly={true} />
                  The Rule Set can be overridden
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => onCancelModal(handleData.event)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onRuleSetClick}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
