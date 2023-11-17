import { Button } from "@mantine/core";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop - NameSpaceIT Shopping Cart",
};

export default function IndexPage() {
  return <Button component="a">Next link button</Button>;
}
