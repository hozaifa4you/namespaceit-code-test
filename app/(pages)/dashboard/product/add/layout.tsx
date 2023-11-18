import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Product Add",
  description: "Add some product",
};

const ProductAddLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProductAddLayout;
