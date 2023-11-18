"use client";
import React from "react";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export default function IndexPage() {
  return (
    <Button component="a" onClick={() => signOut()}>
      Signout
    </Button>
  );
}
