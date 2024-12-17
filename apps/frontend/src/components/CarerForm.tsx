import { Button, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";

type CarerFormProps = {
  carer?: FormValues;
  onSave: (carer: FormValues) => void;
  loading: boolean;
};

type FormValues = {
  name: string;
};

export function CarerForm({ carer, onSave, loading }: CarerFormProps) {
  const f = useForm<FormValues>({
    initialValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (carer) f.initialize(carer);
  }, [carer]);

  return (
    <form autoComplete="off" onSubmit={f.onSubmit(onSave)}>
      <TextInput label="Name" type="name" {...f.getInputProps("name")} />

      <Button type="submit" fullWidth mt="xl" loading={loading}>
        Change
      </Button>
    </form>
  );
}
