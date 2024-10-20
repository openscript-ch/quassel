import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";

const messages = i18n("sessionRoute", {
  title: "Sign in",
  emailLabel: "Email",
  emailPlaceholder: "janine.harmon@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Your secure password",
  formAction: "Sign in",
});

function Session() {
  const t = useStore(messages);
  return (
    <Container size={420} my={40}>
      <Title ta="center">{t.title}</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label={t.emailLabel} placeholder={t.emailPlaceholder} required />
        <PasswordInput label={t.passwordLabel} placeholder={t.passwordPlaceholder} required mt="md" />
        <Button fullWidth mt="xl">
          {t.formAction}
        </Button>
      </Paper>
    </Container>
  );
}

export const Route = createFileRoute("/session")({
  component: Session,
});

export default { ...Route, messages };
