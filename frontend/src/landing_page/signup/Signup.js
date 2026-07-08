import React from "react";
import OpenAccount from "../OpenAccount";

function Signup() {
  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row text-center">
          <h1 className="fs-2 mb-4">Sign up for a Zerodha account</h1>
          <p className="text-muted mb-5">
            Enter your mobile number to get started. We'll send you a one-time password.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile number</label>
              <input type="tel" className="form-control form-control-lg" id="mobile" placeholder="Enter your mobile number" />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg">Continue</button>
            </div>
            <p className="text-muted mt-3 text-center" style={{ fontSize: "12px" }}>
              By signing up, you agree to our Terms and Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <OpenAccount />
    </>
  );
}

export default Signup;
