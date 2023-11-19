"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Table,
  Anchor,
  Text,
  ActionIcon,
  Image,
  Button,
  Flex,
} from "@mantine/core";

import { useDispatch, useSelector } from "@/redux/store";
import {
  selectCart,
  decreaseCardQtyReducer,
  increaseCardQtyReducer,
} from "@/redux/slices/cartSlice";
// import classes from "./styles/CartTable.module.css";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { CartType } from "../(pages)/product/cart/page";
import { orderSlice } from "@/redux/slices/orderSlice";
import { Product } from "@prisma/client";

interface PropTypes {
  setCartType: Dispatch<SetStateAction<CartType>>;
  setStepper: Dispatch<SetStateAction<number>>;
}

export default function CartTable({ setCartType, setStepper }: PropTypes) {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const router = useRouter();

  const total = cart?.reduce(
    (acc, cur) => acc + Number(cur.item.price) * cur.qty,
    0
  );
  const grandTotal = total! + 100;
  const totalQty = cart?.reduce((acc, curr) => acc + curr.qty, 0);

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
          <Flex align="center" gap={10}>
            <ActionIcon
              color="pink"
              variant="outline"
              size="xs"
              aria-label="Settings"
              onClick={() => dispatch(decreaseCardQtyReducer(cartItem.item.id))}
            >
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            <Text size="md" fw={500}>
              x{cartItem.qty}
            </Text>
            <ActionIcon
              variant="outline"
              size="xs"
              aria-label="Settings"
              onClick={() => dispatch(increaseCardQtyReducer(cartItem.item.id))}
            >
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Flex>
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
    <>
      <Table.Tr>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            Total
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            {total}Tk
          </Text>
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            Delivery Charge
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            100TK
          </Text>
        </Table.Td>
      </Table.Tr>

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
            {grandTotal}Tk
          </Text>
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Td>
          <Button variant="light" color="red" onClick={() => router.push("/")}>
            Back
          </Button>
        </Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td>
          <Button
            variant="light"
            ml={10}
            onClick={() => {
              dispatch(
                orderSlice.actions.setProduct({
                  product: cart as [{ item: Product; qty: number }],
                  orderId: Math.random().toString(),
                  deliveryCharge: 100,
                  totalProduct: totalQty as number,
                })
              );
              setStepper(2), setCartType("Shipping");
            }}
          >
            Continue
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  );

  return (
    <>
      {!cart || !cart.length ? (
        <Flex justify="space-around" align="center">
          <Text>Your cart is empty, Please some product in your cart</Text>
          <Button variant="light" onClick={() => router.push("/")}>
            Shopping
          </Button>
        </Flex>
      ) : (
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
      )}
    </>
  );
}
