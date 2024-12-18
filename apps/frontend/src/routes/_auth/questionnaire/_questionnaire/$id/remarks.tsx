import { Button, Group, isSameOrAfter, Stack, Textarea, useForm } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import { useEffect } from "react";
import { components } from "../../../../../api.gen";
import { useQueryClient } from "@tanstack/react-query";

export const messages = i18n("questionnaireRemarks", {
  title: "Add remarks",
  remarkDescription: "Use this field to point out any exceptions to the language exposure like vacations etc...",
  backAction: "Back",
  saveAction: "Save",
  formAction: "Save and complete",
});

type FormValues = {
  remark: string;
};

function QuestionnaireRemarks() {
  const n = useNavigate();
  const p = Route.useParams();

  const c = useQueryClient();

  const t = useStore(messages);

  const f = useForm<FormValues>({
    initialValues: {
      remark: "",
    },
  });

  const { data: questionnaire } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: { id: p.id } } });
  const updateMutation = $api.useMutation("patch", "/questionnaires/{id}");

  useEffect(() => {
    if (questionnaire) {
      f.setValues(questionnaire);
      f.resetDirty();
    }
  }, [questionnaire]);

  const onSave = (values: components["schemas"]["QuestionnaireMutationDto"]) =>
    updateMutation.mutateAsync({ params: { path: p }, body: values });

  const handleSubmit = async (values: FormValues) => {
    await onSave({ ...values, completedAt: new Date().toISOString() });

    if (isSameOrAfter(new Date(Date.parse(questionnaire.endedAt)), new Date(), "month")) {
      n({ to: "/questionnaire/$id/overview", params: p });
    } else {
      await c.invalidateQueries(
        $api.queryOptions("get", "/participants/{id}", { params: { path: { id: questionnaire.participant.id.toString() } } })
      );
      n({ to: "/questionnaire/new" });
    }
  };

  return (
    <form onSubmit={f.onSubmit(handleSubmit)}>
      <Stack>
        <h3>{t.title}</h3>

        <Textarea {...f.getInputProps("remark")} description={t.remarkDescription} rows={8} />

        <Group>
          <Link to="/questionnaire/$id/entries" params={p}>
            <Button variant="light">{t.backAction}</Button>
          </Link>
          <Button variant="outline" onClick={() => onSave(f.getValues())} loading={updateMutation.isPending}>
            {t.saveAction}
          </Button>
          <Button type="submit" loading={updateMutation.isPending}>
            {t.formAction}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/remarks")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: QuestionnaireRemarks,
});
