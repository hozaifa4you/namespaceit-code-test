"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import { MantineProvider } from "@mantine/core";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <>
      <Provider store={reduxStore}>
        <MantineProvider>{props.children}</MantineProvider>
      </Provider>
    </>
  );
};
