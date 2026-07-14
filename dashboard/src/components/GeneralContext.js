import React, { useState, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";
import Toast from "./Toast";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {},
  openSellWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  showToast: (message, type) => {},
  ordersVersion: 0,
  refreshOrders: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [ordersVersion, setOrdersVersion] = useState(0);

  const handleOpenBuyWindow = (uid, price) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price || 0);
  };

  const handleOpenSellWindow = (uid, price) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price || 0);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  }, []);

  const refreshOrders = useCallback(() => {
    setOrdersVersion((v) => v + 1);
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
        closeSellWindow: handleCloseSellWindow,
        showToast,
        ordersVersion,
        refreshOrders,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          price={selectedStockPrice}
          mode="BUY"
          onClose={handleCloseBuyWindow}
        />
      )}
      {isSellWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          price={selectedStockPrice}
          mode="SELL"
          onClose={handleCloseSellWindow}
        />
      )}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
