import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Inventory } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    fetchOrders();
  }, [generalContext.ordersVersion]);

  const fetchOrders = () => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setOrders(res.data);
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deleteOrder/${id}`);
      generalContext.showToast("Order cancelled", "success");
      fetchOrders();
    } catch (err) {
      generalContext.showToast("Failed to cancel order", "error");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <div className="no-orders">
          <Inventory className="icon" />
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  const buyOrders = orders.filter((o) => o.mode === "BUY");
  const sellOrders = orders.filter((o) => o.mode === "SELL");

  return (
    <div className="orders-page">
      <h3 className="title">Orders ({orders.length})</h3>

      {buyOrders.length > 0 && (
        <>
          <h4 className="order-section-title buy-title">
            Buy Orders ({buyOrders.length})
          </h4>
          <div className="order-table">
            <table>
              <tbody>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {buyOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price?.toFixed(2) || "0.00"}</td>
                    <td>{order.priceType || "MARKET"}</td>
                    <td>{order.product || "CNC"}</td>
                    <td className="profit">Executed</td>
                    <td>
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleDelete(order._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {sellOrders.length > 0 && (
        <>
          <h4 className="order-section-title sell-title">
            Sell Orders ({sellOrders.length})
          </h4>
          <div className="order-table">
            <table>
              <tbody>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {sellOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price?.toFixed(2) || "0.00"}</td>
                    <td>{order.priceType || "MARKET"}</td>
                    <td>{order.product || "CNC"}</td>
                    <td className="profit">Executed</td>
                    <td>
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleDelete(order._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
