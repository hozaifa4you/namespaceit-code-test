import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your Order List",
  description: "User can find there orders",
};

const UserOrdersListLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default UserOrdersListLayout;
