import { useForm } from "@mantine/form";
import { Button, Select, Stack, TimeInput } from "@quassel/ui";

type FormValues = {
  carerId?: number;
  startedAt: string;
  endedAt: string;
};

type EntityFormProps = {
  onSave: (entity: FormValues) => void;
  actionLabel: string;
};

export function EntityForm({ onSave, actionLabel }: EntityFormProps) {
  const f = useForm<FormValues>({
    initialValues: {
      startedAt: "",
      endedAt: "",
    },
  });

  return (
    <form onSubmit={f.onSubmit(onSave)}>
      <Stack>
        <Select {...f.getInputProps("carerId")} />
        <TimeInput {...f.getInputProps("startedAt")} />
        <TimeInput {...f.getInputProps("endedAt")} />

        <Button>{actionLabel}</Button>
      </Stack>
    </form>
  );
}
