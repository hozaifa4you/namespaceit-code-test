/* eslint-disable indent */
"use client";
import React, { useEffect } from "react";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";

import { GoogleButton } from "@/app/components/Buttons/GoogleButton";
import { TwitterButton } from "@/app/components/Buttons/TwitterButton";
import { register } from "@/lib/auth";

export interface FormValueType {
  email: string;
  name?: string;
  username?: string;
  password: string;
  confPass?: string;
  terms?: boolean;
}

const SingUpPage = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const router = useRouter();
  const searchparams = useSearchParams();

  const form = useForm<FormValueType>({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      confPass: "",
      terms: false,
    },

    validate: {
      name: (val) => (!val && type === "register" ? "name is required" : null),
      username: (val) =>
        !val && type === "register" ? "username is required" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 5
          ? "Password should include at least 6 characters"
          : null,
      confPass: (val, vals) =>
        val && val.length <= 5 && type === "register"
          ? "Password should include at least 6 characters"
          : type === "register" && val !== vals.password
          ? "Passwords did not match"
          : null,
    },
  });

  // NOTE: submit handler
  const submitHandler = async (values: FormValueType) => {
    if (type === "register") {
      // TODO: register
      const res = await register(values);
      if (res) {
        notifications.show({
          title: "New User Creation",
          message: res?.msg,
          color: "green",
        });
        router.push("/auth?type=login");
      }
    } else if (type === "login") {
      // TODO: login
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(res);
      if (res && !res?.ok) {
        notifications.show({
          message: res?.error,
          title: "Login Failed",
          color: "red",
        });
      } else {
        router.push(searchparams.get("callbackUrl") || "/");
      }
    }
  };

  useEffect(() => {
    if (searchparams.get("type")) {
      if (searchparams.get("type") === "register") {
        toggle("register");
      } else {
        toggle("login");
      }
    }
  }, [searchparams, toggle]);

  return (
    <Container p="xl" size="xs" mt={100}>
      <Text size="lg" fw={500}>
        Welcome to NameSpaceIT, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
        <Stack>
          {type === "register" && (
            <TextInput
              required={type === "register"}
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          {type === "register" && (
            <TextInput
              required={type === "register"}
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />

          {type === "register" && (
            <PasswordInput
              required={type === "register"}
              label="Password Again"
              placeholder="Confirm password"
              value={form.values.confPass}
              onChange={(event) =>
                form.setFieldValue("confPass", event.currentTarget.value)
              }
              error={form.errors.confPass}
              radius="md"
            />
          )}

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            type="submit"
            radius="xl"
            disabled={type === "register" && !form.values.terms}
          >
            {type}
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default SingUpPage;
