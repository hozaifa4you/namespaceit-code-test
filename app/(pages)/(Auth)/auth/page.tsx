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
import { useSearchParams } from "next/navigation";

import { GoogleButton } from "@/app/components/Buttons/GoogleButton";
import { TwitterButton } from "@/app/components/Buttons/TwitterButton";

const SingUpPage = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const searchparams = useSearchParams();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confPass: "",
      terms: true,
    },

    validate: {
      name: (val) => (!val ? "name is required" : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confPass: (val, vals) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : type === "register" && val !== vals.password
          ? "Passwords did not match"
          : null,
    },
  });

  useEffect(() => {
    if (searchparams.get("type")) {
      if (searchparams.get("type") === "register") {
        toggle("register");
      } else {
        toggle("login");
      }
    }
  }, [searchparams.get("type")]);

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

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
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
              required
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
