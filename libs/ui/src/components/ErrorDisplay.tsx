import { Container, Alert, Stack, Spoiler, Code, Title } from "@mantine/core";
import Error from "../assets/error.png";

type ErrorDisplayProps = {
  error: Error;
};

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Container pt={100}>
      <Stack align="center">
        <img width={300} src={Error} />
        <Title>Something went wrong!</Title>
        <Alert title={error.name} color="uzhBerry">
          <Stack>
            <Code>{error.message}</Code>
            <Spoiler hideLabel="Hide" showLabel="Show stack trace" maxHeight={0}>
              <code>{error.stack}</code>
            </Spoiler>
          </Stack>
        </Alert>
      </Stack>
    </Container>
  );
}
