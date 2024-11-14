import { PRODUCTS } from "../../collections.js";

export function getProduct({ query, params }) {
  return PRODUCTS().findOne(query, {
    _id: false,
  });
}

export function getProductById(id) {
  return getProduct({ query: { id } });
}

export function getProductByPaymentGateway(gatewayName, gatewayId) {
  const path = "paymentGateways." + gatewayName;
  return getProduct({ query: { [path]: gatewayId } });
}
