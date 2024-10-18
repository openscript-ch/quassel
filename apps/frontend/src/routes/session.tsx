import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/session")({
  component: () => (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  ),
});
