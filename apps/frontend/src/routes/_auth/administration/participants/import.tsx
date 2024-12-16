import { Button, ColumnType, DSVImport, ImportInput, ImportPreview, useForm } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type ImportType = { id: string; birthday: string };
type FormValues = components["schemas"]["ParticipantCreationDto"][];

const columns: ColumnType<ImportType>[] = [
  { key: "id", label: "Child ID" },
  { key: "birthday", label: "Birthday" },
];

function AdministrationParticipantsImport() {
  const n = useNavigate();
  const createParticipantMutation = $api.useMutation("post", "/participants", {
    onSuccess: () => {
      n({ to: "/administration/participants" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: [],
  });
  const handleSubmit = (values: FormValues) => {
    createParticipantMutation.mutate({ body: Object.values(values) });
  };
  const mapValues = (values: ImportType[]): FormValues => {
    return values.map((value) => ({
      id: parseInt(value.id),
      birthday: value.birthday,
    }));
  };

  return (
    <form onSubmit={f.onSubmit(handleSubmit)}>
      <DSVImport<ImportType> columns={columns} onChange={(values) => f.setValues(mapValues(values))}>
        <ImportInput />
        <ImportPreview />
      </DSVImport>

      <Button type="submit" fullWidth mt="xl" loading={createParticipantMutation.isPending}>
        Create
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/import")({
  component: AdministrationParticipantsImport,
});
