import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useBilling } from "./billingContext";
import OrderConfirmation from "./OrderConfirmation"

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default function Checkout() {
  const { billing, dispatchBilling } = useBilling();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  // Derived state
  const errors = getErrors(billing);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist(); // persist the event
    dispatchBilling({
      type: "updateBilling",
      number: e.target.id === "number" ? e.target.value : billing.number, 
      name: e.target.id === "name" ? e.target.value : billing.name,
      city: e.target.id === "city" ? e.target.value : billing.city,
      country: e.target.id === "country" ? e.target.value : billing.country
    })
  }

  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(billing);
        //dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(billing) {
    const result = {};
    if (!billing.number) result.number = "Card Number is required";
    if (!billing.name) result.name = "Name on Card is required";
    if (!billing.city) result.city = "City is required";
    if (!billing.country) result.country = "Country is required";
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <OrderConfirmation name={billing.name} />
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number">Card Number</label>
          <br />
          <input
            id="number"
            type="text"
            value={billing.number}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.number || status === STATUS.SUBMITTED) && errors.number}
          </p>
        </div>
        <div>
          <label htmlFor="name">Name on Card</label>
          <br />
          <input
            id="name"
            type="text"
            value={billing.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.name || status === STATUS.SUBMITTED) && errors.name}
          </p>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={billing.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={billing.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
