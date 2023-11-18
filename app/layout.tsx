/* Components */
import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import { Providers } from "@/app/components/Providers";
import { ColorSchemeScript } from "@mantine/core";

/* Instruments */
import "./styles/globals.css";
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

// FIXME: fix in future;
export const metadata: Metadata = {
  title: {
    template: "%s - NameSpaceIT Shopping Cart",
    default: "NameSpaceIT Shipping Cart",
  },
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <head>
          <ColorSchemeScript />
        </head>
      </head>
      <body>
        <Providers>
          <section>
            {/* TODO: Header Here */}
            <Navbar />

            <main>{props.children}</main>

            {/* TODO: Footer here */}
          </section>
        </Providers>
      </body>
    </html>
  );
}
