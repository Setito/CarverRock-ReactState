import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext";
import { BillingProvider } from "./billingContext";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <BillingProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </BillingProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
