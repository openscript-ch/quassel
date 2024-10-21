import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@quassel/ui";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";
import { useForm } from "@mantine/form";
import { $session } from "../stores/session";

const messages = i18n("sessionRoute", {
  title: "Sign in",
  emailLabel: "Email",
  emailPlaceholder: "janine.harmon@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Your secure password",
  formAction: "Sign in",
});

type FormValues = {
  email: string;
  password: string;
};

function Session() {
  const n = useNavigate();
  const t = useStore(messages);
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    $session.set({ email: values.email, token: values.password });
    n({ to: "/" });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">{t.title}</Title>

      <form onSubmit={f.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={t.emailLabel}
            placeholder={t.emailPlaceholder}
            type="email"
            required
            key={f.key("email")}
            {...f.getInputProps("email")}
          />
          <PasswordInput
            label={t.passwordLabel}
            placeholder={t.passwordPlaceholder}
            required
            mt="md"
            key={f.key("password")}
            {...f.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl">
            {t.formAction}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export const Route = createFileRoute("/session")({
  loader: () => {
    if ($session.get().token) {
      throw redirect({ to: "/" });
    }
  },
  component: Session,
});

export default { ...Route, messages };
