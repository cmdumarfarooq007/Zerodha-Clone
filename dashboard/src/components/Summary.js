import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ user }) => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const totalInvestment = holdings.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPL = totalCurrentValue - totalInvestment;
  const plPercent =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : 0;
  const isProfit = totalPL >= 0;

  const displayName = user ? user.split("@")[0] : "User";

  return (
    <>
      <div className="username">
        <h6>Hi, {displayName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {totalCurrentValue >= 1000
                ? (totalCurrentValue / 1000).toFixed(2) + "k"
                : totalCurrentValue.toFixed(2)}
            </h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance{" "}
              <span>
                {totalCurrentValue >= 1000
                  ? (totalCurrentValue / 1000).toFixed(2) + "k"
                  : totalCurrentValue.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {isProfit ? "+" : ""}
              {totalPL >= 1000
                ? (totalPL / 1000).toFixed(2) + "k"
                : totalPL.toFixed(2)}{" "}
              <small className={isProfit ? "profit" : "loss"}>
                {isProfit ? "+" : ""}
                {plPercent}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>
                {totalCurrentValue >= 1000
                  ? (totalCurrentValue / 1000).toFixed(2) + "k"
                  : totalCurrentValue.toFixed(2)}
              </span>
            </p>
            <p>
              Investment{" "}
              <span>
                {totalInvestment >= 1000
                  ? (totalInvestment / 1000).toFixed(2) + "k"
                  : totalInvestment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
