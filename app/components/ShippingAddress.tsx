"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { CartType } from "../(pages)/product/cart/page";
import { useDispatch, useSelector } from "@/redux/store";
import { selectCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";
import { orderSlice } from "@/redux/slices/orderSlice";

interface PropTypes {
  setCartType: Dispatch<SetStateAction<CartType>>;
  setStepper: Dispatch<SetStateAction<number>>;
}

const ShippingAddress = ({ setCartType, setStepper }: PropTypes) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const session = useSession();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      division: "",
      zip: "",
      country: "Bangladesh",
      phone: "",
    },
  });

  console.log(form.values);

  return (
    <Container size="xs">
      <Text size="lg" fw={700} ta="center" my={15}>
        Checkout
      </Text>

      <form>
        <Grid>
          <GridCol span={6}>
            <TextInput
              required
              label="First Name"
              placeholder="Your first name"
              value={form.values.firstName}
              onChange={(event) =>
                form.setFieldValue("firstName", event.currentTarget.value)
              }
              radius="md"
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              required
              label="Last Name"
              placeholder="Your last name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue("lastName", event.currentTarget.value)
              }
              radius="md"
            />
          </GridCol>

          <GridCol span={12}>
            <TextInput
              required
              label="Phone Number"
              placeholder="Your phone number"
              value={form.values.phone}
              onChange={(event) =>
                form.setFieldValue("phone", event.currentTarget.value)
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
              radius="md"
            />
          </GridCol>

          <GridCol span={12}>
            <Flex justify="flex-end" align="center">
              <Button
                disabled={
                  !form.values.firstName ||
                  !form.values.lastName ||
                  !form.values.addressLine1 ||
                  !form.values.city ||
                  !form.values.country ||
                  !form.values.division ||
                  !form.values.zip ||
                  !form.values.phone
                }
                onClick={() => {
                  dispatch(
                    orderSlice.actions.setShipping({
                      addressLine1: form.values.addressLine1,
                      city: form.values.city,
                      country: form.values.country,
                      division: form.values.division,
                      name: session?.data?.user?.name as string,
                      phone: form.values.phone,
                      userId: session.data?.user?.id as number,
                      zip: form.values.zip,
                      addressLine2: form.values.addressLine2,
                    })
                  );
                  setCartType("Payment"), setStepper(3);
                }}
              >
                Payment
              </Button>
            </Flex>
          </GridCol>
        </Grid>
      </form>
    </Container>
  );
};

export default ShippingAddress;
