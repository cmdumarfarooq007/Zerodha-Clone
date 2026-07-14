import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allPositions").then((res) => {
      setPositions(res.data);
    });
  }, []);

  if (positions.length === 0) {
    return (
      <div>
        <h3 className="title">Positions (0)</h3>
        <p style={{ color: "#999", fontSize: "0.9rem", marginTop: "20px" }}>
          You have no open positions.
        </p>
      </div>
    );
  }

  const totalPL = positions.reduce((sum, stock) => {
    const curValue = stock.price * stock.qty;
    return sum + (curValue - stock.avg * stock.qty);
  }, 0);

  return (
    <div>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>

            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col" style={{ flexBasis: "50%" }}>
          <h5 style={{ color: totalPL >= 0 ? "rgb(72, 194, 55)" : "rgb(250, 118, 78)" }}>
            {totalPL >= 0 ? "+" : ""}
            {totalPL.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h5>
          <p>Total P&L</p>
        </div>
      </div>
    </div>
  );
};

export default Positions;
