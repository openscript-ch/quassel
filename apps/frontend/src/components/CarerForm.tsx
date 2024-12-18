import { Button, ColorInput, TextInput, useForm, uzhColors } from "@quassel/ui";
import { useEffect } from "react";

type CarerFormProps = {
  carer?: FormValues;
  onSave: (carer: FormValues) => void;
  loading: boolean;
};

type FormValues = {
  name: string;
  color?: string;
};

export function CarerForm({ carer, onSave, loading }: CarerFormProps) {
  const f = useForm<FormValues>({
    initialValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (carer) f.initialize({ ...carer, color: carer.color ?? "" });
  }, [carer]);

  return (
    <form autoComplete="off" onSubmit={f.onSubmit(onSave)}>
      <TextInput label="Name" type="name" {...f.getInputProps("name")} />

      <ColorInput label="Color" {...f.getInputProps("color")} swatchesPerRow={6} swatches={Object.values(uzhColors).flat()} />

      <Button type="submit" fullWidth mt="xl" loading={loading}>
        Change
      </Button>
    </form>
  );
}
