"use client";
import UserOrdersListTable from "@/app/components/OrderListTable";
import { Container, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";

const UserOrdersList = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const session = useSession();

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
