"use client";
import React from "react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import { Notifications } from "@mantine/notifications";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <>
      <Provider store={reduxStore}>
        <SessionProvider>
          <MantineProvider>
            <Notifications autoClose={4000} position="top-right" />
            {props.children}
          </MantineProvider>
        </SessionProvider>
      </Provider>
    </>
  );
};
