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

interface PropTypes {
  setCartType: Dispatch<SetStateAction<"Cart" | "Shipping" | "Payment">>;
  setStepper: Dispatch<SetStateAction<number>>;
}

const PaymentInfo = ({ setCartType, setStepper }: PropTypes) => {
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

  return (
    <Container size="xs">
      <Text size="lg" fw={700} ta="center" my={15}>
        Payment
      </Text>

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
                  setStepper(4);
                }}
              >
                Order Now
              </Button>
            </Flex>
          </GridCol>
        </Grid>
      </form>
    </Container>
  );
};

export default PaymentInfo;
