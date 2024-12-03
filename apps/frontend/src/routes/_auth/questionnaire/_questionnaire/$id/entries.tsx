import { Button, formatDate, Group, Stack } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
});

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <FullCalendar
          plugins={[timeGridPlugin]}
          allDaySlot={false}
          headerToolbar={false}
          slotMinTime={{ hour: 5 }}
          slotMaxTime={{ hour: 23 }}
          slotDuration={{ hour: 1 }}
          firstDay={1}
          dayHeaderContent={({ date }) => formatDate(date, "dddd")}
          locale={"de"}
          expandRows
        />

        <Group>
          <Link to="/questionnaire/$id/period" params={p}>
            <Button variant="light">{t.backAction}</Button>
          </Link>
          <Button type="submit">{t.formAction}</Button>
        </Group>
      </Stack>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/entries")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: QuestionnaireEntries,
});
