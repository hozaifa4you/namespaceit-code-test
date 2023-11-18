"use client";
import React from "react";
import { Container, Text } from "@mantine/core";

import CartTable from "@/app/components/CartTable";
import CustomStepper from "@/app/components/Stepper";

const CartPage = () => {
  return (
    <Container size="md" mt={15}>
      <CustomStepper active={1} />

      <Text size="xl" fw={900} my={20}>
        Your Cart
      </Text>

      <CartTable />
    </Container>
  );
};

export default CartPage;
