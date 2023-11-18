import React from "react";
import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Badge,
  useMantineTheme,
  rem,
} from "@mantine/core";
import {
  IconHeart,
  IconShoppingCartPlus,
  IconShoppingBag,
} from "@tabler/icons-react";

import classes from "./styles/Card.module.css";
import { useDispatch } from "@/redux/store";
import { setCartReducer } from "@/redux/slices/cartSlice";

interface PropTypes {
  name: string;
  category: string;
  id: number;
  image: string;
}

export default function ProductCard({ category, id, name, image }: PropTypes) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={image}
          alt="Top 50 underrated plants for house decoration"
          height={180}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        {category}
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {name}
      </Text>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            3.5k time sold
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShoppingBag
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => dispatch(setCartReducer(id, 1))}
            >
              <IconShoppingCartPlus
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
