import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price, mode, onClose }) => {
  const generalContext = useContext(GeneralContext);
  const isBuy = mode === "BUY";

  const [orderType, setOrderType] = useState("Regular");
  const [productType, setProductType] = useState("CNC");
  const [orderPriceType, setOrderPriceType] = useState("MARKET");
  const [quantity, setQuantity] = useState(1);
  const [priceValue, setPriceValue] = useState(price || 0);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [validity, setValidity] = useState("DAY");

  const marginRequired =
    orderPriceType === "MARKET"
      ? (quantity * (price || 0)).toFixed(2)
      : (quantity * priceValue).toFixed(2);

  const handleSubmit = async () => {
    if (quantity <= 0) {
      generalContext.showToast("Quantity must be at least 1", "error");
      return;
    }
    if (orderPriceType !== "MARKET" && priceValue <= 0) {
      generalContext.showToast("Please enter a valid price", "error");
      return;
    }

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: quantity,
        price: orderPriceType === "MARKET" ? price || 0 : priceValue,
        mode: mode,
        product: productType,
        orderType: orderType,
        priceType: orderPriceType,
        triggerPrice: orderPriceType.includes("SL") ? triggerPrice : undefined,
        validity,
      });
      generalContext.showToast(
        `${mode} order for ${quantity} x ${uid} placed successfully!`,
        "success"
      );
      generalContext.refreshOrders();
      onClose();
    } catch (err) {
      generalContext.showToast("Failed to place order", "error");
    }
  };

  const headerGradient = isBuy
    ? "linear-gradient(135deg, #4184f3, #2962ff)"
    : "linear-gradient(135deg, #ff5722, #d84315)";

  return (
    <div className="order-overlay" onClick={onClose}>
      <div
        className="order-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="order-header"
          style={{ background: headerGradient }}
        >
          <div className="order-header-top">
            <h3>
              {mode} <span>{uid}</span>
            </h3>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="market-options">
            <label>
              <input
                type="radio"
                name="orderType"
                value="Regular"
                checked={orderType === "Regular"}
                onChange={(e) => setOrderType(e.target.value)}
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                name="orderType"
                value="Stoploss"
                checked={orderType === "Stoploss"}
                onChange={(e) => setOrderType(e.target.value)}
              />
              Stoploss
            </label>
          </div>
        </div>

        <div className="order-body">
          <div className="product-tabs">
            {["CNC", "MIS", "NRML"].map((p) => (
              <button
                key={p}
                className={`tab-btn ${productType === p ? "active" : ""}`}
                onClick={() => setProductType(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="price-type-row">
            {["MARKET", "LIMIT", "SL", "SL-M"].map((t) => (
              <label key={t} className={`price-type-label ${orderPriceType === t ? "active" : ""}`}>
                <input
                  type="radio"
                  name="priceType"
                  value={t}
                  checked={orderPriceType === t}
                  onChange={(e) => setOrderPriceType(e.target.value)}
                />
                {t}
              </label>
            ))}
          </div>

          <div className="order-inputs">
            <div className="input-group">
              <label>Quantity</label>
              <div className="qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {(orderPriceType === "LIMIT" || orderPriceType === "SL") && (
              <div className="input-group">
                <label>Price</label>
                <input
                  type="number"
                  className="price-input"
                  value={priceValue}
                  step="0.05"
                  onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)}
                />
              </div>
            )}

            {orderPriceType === "MARKET" && (
              <div className="input-group">
                <label>Price</label>
                <input
                  type="text"
                  className="price-input"
                  value="Market"
                  disabled
                />
              </div>
            )}

            {orderPriceType === "SL-M" && (
              <div className="input-group">
                <label>Trigger Price</label>
                <input
                  type="number"
                  className="price-input"
                  value={triggerPrice}
                  step="0.05"
                  onChange={(e) => setTriggerPrice(parseFloat(e.target.value) || 0)}
                />
              </div>
            )}

            {orderPriceType === "SL" && (
              <>
                <div className="input-group">
                  <label>Price</label>
                  <input
                    type="number"
                    className="price-input"
                    value={priceValue}
                    step="0.05"
                    onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="input-group">
                  <label>Trigger</label>
                  <input
                    type="number"
                    className="price-input"
                    value={triggerPrice}
                    step="0.05"
                    onChange={(e) => setTriggerPrice(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="validity-row">
            <span className="validity-label">Validity</span>
            <div className="validity-options">
              <button
                className={`validity-btn ${validity === "DAY" ? "active" : ""}`}
                onClick={() => setValidity("DAY")}
              >
                DAY
              </button>
              <button
                className={`validity-btn ${validity === "IOC" ? "active" : ""}`}
                onClick={() => setValidity("IOC")}
              >
                IOC
              </button>
            </div>
          </div>
        </div>

        <div className="order-footer">
          <div className="margin-info">
            <span>Margin required</span>
            <strong>₹{marginRequired}</strong>
          </div>
          <button
            className={`submit-btn ${isBuy ? "buy" : "sell"}`}
            onClick={handleSubmit}
          >
            {mode}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
