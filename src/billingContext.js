import React, { useContext, useEffect, useReducer } from "react";
import billingReducer from "./billingReducer";

export const BillingContext = React.createContext(null);

let initialBillingForm;
try {
  initialBillingForm = JSON.parse(localStorage.getItem("billing")) ?? {};
} catch {
  console.error("The billing data could not be parsed into JSON");
  initialBillingForm = {};
}

export function BillingProvider(props) {
  const [billing, dispatchBilling] = useReducer(
    billingReducer,
    initialBillingForm
  );
  useEffect(() => localStorage.setItem("billing", JSON.stringify(billing)), [
    billing,
  ]);
  const contextValue = {
    billing,
    dispatchBilling,
  };
  return (
    <BillingContext.Provider value={contextValue}>
      {props.children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error(
      "useBilling must be used within a BillingProvider. Wrap a parent component in <BillingProvider> to fix this error."
    );
  }
  return context;
}
