"use client";
import React, { useState } from "react";
import {
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconPlayerPause,
  IconTrash,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import cx from "clsx";
import { signOut, useSession } from "next-auth/react";

import classes from "./Navbar.module.css";

const UserProfile = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const session = useSession();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.userUser, {
            [classes.userActiveUser]: userMenuOpened,
          })}
        >
          <Group gap={7}>
            <Avatar
              src={session.data?.user?.avatar}
              alt={session.data?.user?.name}
              radius="xl"
              size={20}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {session.data?.user?.name}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconStar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSwitchHorizontal
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          onClick={async () => await signOut()}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconPlayerPause
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Pause subscription
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserProfile;
