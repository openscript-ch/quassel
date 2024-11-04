import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useForm } from "@mantine/form";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, TextInput } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["LanguageMutationDto"];

function AdministrationLanguagesEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const carer = useSuspenseQuery(
    $api.queryOptions("get", "/languages/{id}", {
      params: { path: { id: p.id } },
    })
  );
  const n = useNavigate();
  const editCarerMutation = $api.useMutation("patch", "/languages/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/languages/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/languages" });
    },
  });
  const f = useForm<FormValues>({
    initialValues: {
      name: "",
      ietfBcp47: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    editCarerMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.setValues(carer.data ?? {});
    f.resetDirty();
  }, [carer.isSuccess, carer.data]);

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Name" type="name" {...f.getInputProps("name")} />
        <TextInput label="IETF BCP 47" type="text" {...f.getInputProps("ietfBcp47")} />

        <Button type="submit" fullWidth mt="xl" loading={editCarerMutation.isPending}>
          Change
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/languages/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/languages/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationLanguagesEdit,
});
