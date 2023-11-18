import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// FIXME: fix the metadata and send more metadata
export const metadata: Metadata = {
  title: {
    absolute: "Register or Login",
  },
  description:
    "This is page is going for signup. You can create there new account.",
};

const SingUpLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return <>{children}</>;
};

export default SingUpLayout;
