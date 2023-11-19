"use client";
import React, { useState } from "react";
import { Container, Text } from "@mantine/core";

import CartTable from "@/app/components/CartTable";
import CustomStepper from "@/app/components/Stepper";
import ShippingAddress from "@/app/components/ShippingAddress";
import PaymentInfo from "@/app/components/PaymentInfo";
import OrderInfo from "@/app/components/OrderInfo";

export type CartType =
  | "Cart"
  | "Shipping"
  | "Payment"
  | "Complete"
  | "OrderInfo";

const CartPage = () => {
  const [cartType, setCartType] = useState<CartType>("Cart");
  const [stepper, setStepper] = useState(1);

  return (
    <Container size="md" mt={15}>
      <CustomStepper active={stepper} />

      {stepper !== 4 && (
        <Text size="xl" fw={900} my={20}>
          Your{" "}
          {cartType === "Cart"
            ? "Cart"
            : cartType === "Shipping"
            ? "Shipping Info"
            : cartType === "Payment"
            ? "Payment Info"
            : "Order Info"}
        </Text>
      )}

      {cartType === "Cart" && (
        <CartTable setCartType={setCartType} setStepper={setStepper} />
      )}
      {cartType === "Shipping" && (
        <ShippingAddress setCartType={setCartType} setStepper={setStepper} />
      )}
      {cartType === "OrderInfo" && <OrderInfo />}
      {cartType === "Payment" && (
        <PaymentInfo setCartType={setCartType} setStepper={setStepper} />
      )}
    </Container>
  );
};

export default CartPage;
