import { Routes, Route, Navigate } from "react-router-dom";

import Confirmation from "../pages/Confirmation";
import Delivery from "../pages/Delivery";
import Payment from "../pages/Payment";

import { CheckoutRoutePath } from "../routes/checkout-route-path";

export default function CheckoutRoutes() {
  return (
    <Routes>
      <Route
        path={CheckoutRoutePath.Delivery}
        element={<Delivery />}
      />
      <Route
        path={CheckoutRoutePath.Payment}
        element={<Payment />}
      />
      <Route
        path={CheckoutRoutePath.Confirmation}
        element={<Confirmation />}
      />

      {/* Default redirect */}
      <Route
        index
        element={<Navigate to={CheckoutRoutePath.Delivery} replace />}
      />
    </Routes>
  );
}