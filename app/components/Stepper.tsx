import { Stepper } from "@mantine/core";
import React from "react";

const CustomStepper = ({ active }: { active: number }) => {
  return (
    <Stepper active={active}>
      <Stepper.Step label="First step" description="Add to Cart"></Stepper.Step>
      <Stepper.Step
        label="Second step"
        description="Your Cart Preview"
      ></Stepper.Step>
      <Stepper.Step
        label="Third step"
        description="Shipping Address"
      ></Stepper.Step>
      <Stepper.Step
        label="Final Step"
        description="Payment Complete"
      ></Stepper.Step>
      <Stepper.Completed>You Order Success Fully completed</Stepper.Completed>
    </Stepper>
  );
};

export default CustomStepper;
