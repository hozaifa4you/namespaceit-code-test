import { Text } from "@mantine/core";
import React from "react";

const Logo = () => {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: "blue", to: "cyan", deg: 90 }}
    >
      {/* FIXME: fix the dynamic */}
      NameSpace | Shop
    </Text>
  );
};

export default Logo;
