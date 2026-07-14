import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const generalContext = useContext(GeneralContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCommodityModal, setShowCommodityModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [funds, setFunds] = useState({
    available: 4043.10,
    used: 3757.30,
    openingBalance: 3736.40,
    payin: 4064.00,
  });

  const handleAddFunds = () => {
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) {
      generalContext.showToast("Please enter a valid amount", "error");
      return;
    }
    if (!upiId) {
      generalContext.showToast("Please enter your UPI ID", "error");
      return;
    }
    setFunds((prev) => ({
      ...prev,
      available: prev.available + amount,
      payin: prev.payin + amount,
    }));
    generalContext.showToast(`₹${amount.toFixed(2)} added successfully via UPI`, "success");
    setShowAddModal(false);
    setFundAmount("");
    setUpiId("");
  };

  const handleWithdraw = () => {
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) {
      generalContext.showToast("Please enter a valid amount", "error");
      return;
    }
    if (amount > funds.available) {
      generalContext.showToast("Insufficient balance", "error");
      return;
    }
    if (!bankAccount) {
      generalContext.showToast("Please enter your bank account number", "error");
      return;
    }
    setFunds((prev) => ({
      ...prev,
      available: prev.available - amount,
    }));
    generalContext.showToast(`₹${amount.toFixed(2)} withdrawal initiated`, "success");
    setShowWithdrawModal(false);
    setFundAmount("");
    setBankAccount("");
  };

  const handleOpenCommodity = () => {
    generalContext.showToast("Commodity account opening request submitted!", "success");
    setShowCommodityModal(false);
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={() => setShowAddModal(true)}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={() => setShowWithdrawModal(true)}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {funds.available.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">
                {funds.used.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                {funds.available.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>
                {funds.openingBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>
                {funds.payin.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button
              className="btn btn-blue"
              onClick={() => setShowCommodityModal(true)}
            >
              Open Account
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fund-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="fund-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Funds</h3>
            <p className="fund-modal-sub">Instant deposit via UPI</p>
            <div className="fund-modal-field">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                min="1"
              />
            </div>
            <div className="fund-modal-field">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <div className="fund-modal-quick">
              {[500, 1000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  className="quick-amount"
                  onClick={() => setFundAmount(amt.toString())}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="fund-modal-actions">
              <button className="btn btn-grey" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-green" onClick={handleAddFunds}>
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="fund-modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="fund-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Withdraw Funds</h3>
            <p className="fund-modal-sub">
              Available: ₹
              {funds.available.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <div className="fund-modal-field">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                min="1"
                max={funds.available}
              />
            </div>
            <div className="fund-modal-field">
              <label>Bank Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <div className="fund-modal-actions">
              <button className="btn btn-grey" onClick={() => setShowWithdrawModal(false)}>
                Cancel
              </button>
              <button className="btn btn-blue" onClick={handleWithdraw}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {showCommodityModal && (
        <div className="fund-modal-overlay" onClick={() => setShowCommodityModal(false)}>
          <div className="fund-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Open Commodity Account</h3>
            <p className="fund-modal-sub">
              Trade in gold, silver, crude oil, and more on MCX
            </p>
            <div className="fund-modal-field">
              <label>PAN Number</label>
              <input type="text" placeholder="Enter PAN number" />
            </div>
            <div className="fund-modal-field">
              <label>Aadhaar Number</label>
              <input type="text" placeholder="Enter Aadhaar number" />
            </div>
            <div className="fund-modal-actions">
              <button className="btn btn-grey" onClick={() => setShowCommodityModal(false)}>
                Cancel
              </button>
              <button className="btn btn-blue" onClick={handleOpenCommodity}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
