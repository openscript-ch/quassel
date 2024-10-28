import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@quassel/ui";
import { createFileRoute, redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";
import { useForm } from "@mantine/form";
import { $session } from "../stores/session";
import { $api } from "../provider/ApiProvider";

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
  const l = useLocation();
  const t = useStore(messages);
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const createSessionMutation = $api.useMutation("post", "/session", {
    onSuccess: (data) => {
      $session.set({ email: data.email, role: data.role });
      n({ to: l.search.redirect || "/" });
    },
  });
  const handleSubmit = (values: FormValues) => {
    createSessionMutation.mutate({ body: values });
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
          <Button type="submit" fullWidth mt="xl" loading={createSessionMutation.isPending}>
            {t.formAction}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

type RouteSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/session")({
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    };
  },
  loader: () => {
    if ($session.get().email) {
      throw redirect({ to: "/" });
    }
  },
  component: Session,
});

export default { ...Route, messages };
