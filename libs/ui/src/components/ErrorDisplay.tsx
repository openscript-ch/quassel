import { Container, Alert, Stack, Spoiler, Code, Title, Button } from "@mantine/core";
import Error from "../assets/error.png";

type ErrorDisplayProps = {
  error?: Error;
  title?: string;
};

export function ErrorDisplay({ error, title = "Something went wrong!" }: ErrorDisplayProps) {
  return (
    <Container pt={100}>
      <Stack align="center">
        <img width={300} src={Error} />
        <Title>{title}</Title>
        {error && (
          <Alert title={error.name} color="uzhBerry">
            <Stack>
              <Code>{error.message}</Code>
              <Spoiler hideLabel="Hide" showLabel="Show stack trace" maxHeight={0}>
                <code>{error.stack}</code>
              </Spoiler>
            </Stack>
          </Alert>
        )}
        <Button mt="md" component="a" href="/">
          Back to home
        </Button>
      </Stack>
    </Container>
  );
}
