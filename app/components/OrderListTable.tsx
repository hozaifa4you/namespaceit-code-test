"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { Order } from "@prisma/client";
import { IconEye, IconTrash } from "@tabler/icons-react";

export default function UserOrdersListTable() {
  const [orders, setOrders] = useState<any[] | null>(null);

  console.log(orders);

  useEffect(() => {
    async function getOrderData() {
      try {
        const { data } = await axios.get<any[]>("/api/user/orders", {
          headers: { "Content-Type": "application/json" },
        });
        console.log(data);

        setOrders(data);
      } catch (err: any) {
        notifications.show({
          title: "Order List",
          message: err.response.data.msg || err.message,
        });
      }
    }
    getOrderData();
  }, []);

  // <Avatar size={26} src="" radius={26} />
  //             <Text size="sm" fw={500}>
  //               Name
  //             </Text>

  const rows =
    orders &&
    orders.length > 0 &&
    orders.map((item) => {
      return (
        <Table.Tr key={item.id}>
          <Table.Td>{item.id}</Table.Td>
          <Table.Td>
            <Group gap="sm">
              {
                item?.orderProducts?.map((x: any) => (
                  <Flex gap={5} key={x.item.id}>
                    <Avatar size={26} src={x.item.image} radius={26} />
                    <Text size="sm" fw={500}>
                      {x.item.name}
                    </Text>
                  </Flex>
                )) as any
              }
            </Group>
          </Table.Td>
          <Table.Td>{item.totalProduct}</Table.Td>
          <Table.Td>{item.totalPayment}</Table.Td>
          <Table.Td>
            <Flex gap={5} align="center">
              <ActionIcon size="sm" color="grape">
                <IconEye />
              </ActionIcon>
              <ActionIcon size="sm" color="pink">
                <IconTrash />
              </ActionIcon>
            </Flex>
          </Table.Td>
        </Table.Tr>
      );
    });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Table.Th>Order Id</Table.Th>
            </Table.Th>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
