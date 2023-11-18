"use client";
import React from "react";
import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  Button,
  ActionIcon,
  Image,
} from "@mantine/core";

import { useDispatch, useSelector } from "@/redux/store";
import { selectCart } from "@/redux/slices/cartSlice";
import classes from "./styles/CartTable.module.css";
import { IconEye, IconTrash } from "@tabler/icons-react";

const data = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    reviews: { positive: 2223, negative: 259 },
  },
];

export default function CartTable() {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const rows = cart?.map((cartItem, i) => {
    return (
      <Table.Tr key={i}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            <Image
              radius="md"
              h={50}
              w={50}
              fit="contain"
              src={cartItem.item.image}
            />
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {cartItem.item.name}
          </Anchor>
        </Table.Td>
        <Table.Td>{cartItem.item.price}Tk</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            *{cartItem.qty}
          </Anchor>
        </Table.Td>
        <Table.Td>
          {Number(cartItem.item.price) * Number(cartItem.qty)}Tk
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="filled"
            size="sm"
            radius="xs"
            aria-label="Settings"
          >
            <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            ml={5}
            variant="outline"
            size="sm"
            radius="xs"
            aria-label="Settings"
            color="pink"
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  const totalRow = (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Text size="sm" fw={700}>
          Grand Total
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={700}>
          {cart?.reduce(
            (acc, cur) => acc + Number(cur.item.price) * cur.qty,
            0
          )}
          TK
        </Text>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Image</Table.Th>
            <Table.Th>Product</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Total Price</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
          {totalRow}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}