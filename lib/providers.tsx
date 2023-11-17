"use client";
import React from "react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import { Notifications } from "@mantine/notifications";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <>
      <Provider store={reduxStore}>
        <MantineProvider>
          <Notifications autoClose={1500} position="top-right" />
          {props.children}
        </MantineProvider>
      </Provider>
    </>
  );
};
