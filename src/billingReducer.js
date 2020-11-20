export default function billingReducer(billing, action) {
  switch (action.type) {
    case "empty":
      return {};
    case "updateBilling": {
      const { number, name, city, country } = action;
      return { number, name, city, country };
    }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
