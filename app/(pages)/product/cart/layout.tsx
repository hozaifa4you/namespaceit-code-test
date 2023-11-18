import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart",
  description: "You shopping cart",
};

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CartLayout;
