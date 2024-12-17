import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { useQueryClient } from "@tanstack/react-query";
import { CarerForm } from "../../../../components/CarerForm";
import { components } from "../../../../api.gen";

function AdministrationCarersEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const { data } = $api.useSuspenseQuery("get", "/carers/{id}", { params: { path: { id: p.id } } });
  const n = useNavigate();
  const editCarerMutation = $api.useMutation("patch", "/carers/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/carers/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/carers" });
    },
  });

  const handleSubmit = (values: components["schemas"]["CarerMutationDto"]) => {
    editCarerMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  return <CarerForm carer={data} onSave={handleSubmit} loading={editCarerMutation.isPending} />;
}

export const Route = createFileRoute("/_auth/administration/carers/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/carers/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationCarersEdit,
});
