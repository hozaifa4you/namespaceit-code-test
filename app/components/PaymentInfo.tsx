"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CartType } from "../(pages)/product/cart/page";
import { useDispatch, useSelector } from "@/redux/store";
import { cartSlice, selectCart } from "@/redux/slices/cartSlice";
import {
  PaymentMethod,
  createOrderReducer,
  orderSlice,
  selectOrder,
} from "@/redux/slices/orderSlice";

interface PropTypes {
  setCartType: Dispatch<SetStateAction<CartType>>;
  setStepper: Dispatch<SetStateAction<number>>;
}

const PaymentInfo = ({ setCartType, setStepper }: PropTypes) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const { order } = useSelector(selectOrder);
  const [paymentType, setPaymentType] = useState<PaymentMethod>("Card");

  const form = useForm({
    initialValues: {
      cardHolder: "",
      cardNumber: "",
      expireDate: "",
      cvc: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      division: "",
      zip: "",
      country: "",
    },
  });

  const total = cart?.reduce(
    (acc, cur) => acc + Number(cur.item.price) * cur.qty,
    0
  );
  const grandTotal = total! + 100;

  return (
    <Container size="xs">
      <Text size="lg" fw={700} ta="center" my={15}>
        Payment
      </Text>

      <Radio.Group
        name="favoriteFramework"
        label="Select Your payment type"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            value="card"
            label="Card Payment"
            name="paymentType"
            defaultChecked
            onClick={() => setPaymentType("Card")}
            checked={paymentType === "Card"}
          />
          <Radio
            value="cashOnDelivery"
            label="Cash On Delivery"
            name="paymentType"
            checked={paymentType === "CashOnDelivery"}
            onClick={() => setPaymentType("CashOnDelivery")}
          />
        </Group>
      </Radio.Group>

      {paymentType === "Card" ? (
        <form>
          <Grid>
            <GridCol span={12}>
              <TextInput
                required
                label="Card Number"
                placeholder="Your card number"
                value={form.values.cardNumber}
                onChange={(event) =>
                  form.setFieldValue("cardNumber", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={12}>
              <TextInput
                required
                label="Card Holder"
                placeholder="Card Holder name"
                value={form.values.cardHolder}
                onChange={(event) =>
                  form.setFieldValue("cardHolder", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                required
                label="Expire Date"
                placeholder="MM/YY"
                value={form.values.expireDate}
                onChange={(event) =>
                  form.setFieldValue("expireDate", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                required
                label="CVC/CVV"
                placeholder="You CVC or CVV"
                value={form.values.cvc}
                onChange={(event) =>
                  form.setFieldValue("cvc", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={12}>
              <TextInput
                required
                label="Address Line 1"
                placeholder="Your address line 1"
                value={form.values.addressLine1}
                onChange={(event) =>
                  form.setFieldValue("addressLine1", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={12}>
              <TextInput
                label="Address Line 2"
                placeholder="Your address line 2"
                value={form.values.addressLine2}
                onChange={(event) =>
                  form.setFieldValue("addressLine2", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                required
                label="City"
                placeholder="Your city"
                value={form.values.city}
                onChange={(event) =>
                  form.setFieldValue("city", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                required
                label="Division"
                placeholder="Your division"
                value={form.values.division}
                onChange={(event) =>
                  form.setFieldValue("division", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                required
                label="Zip Code"
                placeholder="Your zip code"
                value={form.values.zip}
                onChange={(event) =>
                  form.setFieldValue("zip", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                disabled
                required
                label="Country"
                placeholder="Your country"
                value={form.values.country}
                onChange={(event) =>
                  form.setFieldValue("country", event.currentTarget.value)
                }
                radius="md"
              />
            </GridCol>

            <GridCol span={12}>
              <Flex justify="flex-end" align="center">
                <Button
                  onClick={() => {
                    setCartType("Complete"), setStepper(4);
                  }}
                >
                  Order Now
                </Button>
              </Flex>
            </GridCol>
          </Grid>
        </form>
      ) : (
        <>
          <Text ta="center" size="xl" fw={500} my={25}>
            Please place the order
          </Text>
          <Flex justify="flex-end" align="center">
            <Button
              onClick={async () => {
                await dispatch(
                  createOrderReducer(
                    order?.orderId as string,
                    order?.orderProducts as object,
                    grandTotal,
                    order?.totalProduct as number,
                    order?.deliveryCharge as number,
                    order?.shippingInfo?.address as any,
                    paymentType,
                    paymentType === "CashOnDelivery" ? false : true
                  )
                );

                setCartType("Complete"), setStepper(4);
                dispatch(orderSlice.actions.removeOrder());
                dispatch(cartSlice.actions.removeCarts());
              }}
            >
              Order Now
            </Button>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default PaymentInfo;
