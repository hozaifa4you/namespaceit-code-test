import { Metadata } from "next";
import React from "react";

// FIXME: fix the metadata and send more metadata
export const metadata: Metadata = {
  title: {
    absolute: "SingUp or Login",
  },
  description:
    "This is page is going for signup. You can create there new account.",
};

const SingUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SingUpLayout;
