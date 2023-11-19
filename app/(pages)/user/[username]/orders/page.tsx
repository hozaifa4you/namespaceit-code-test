"use client";
import React from "react";
import { Container, Text } from "@mantine/core";

import UserOrdersListTable from "@/app/components/OrderListTable";

const UserOrdersList = () => {
  return (
    <Container size="lg" mt={25}>
      <Text ta="center" fw={900} size="lg">
        Your Order List
      </Text>

      <UserOrdersListTable />
    </Container>
  );
};

export default UserOrdersList;
