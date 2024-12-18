import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";
import { CarerForm } from "../../../../components/CarerForm";

function AdministrationCarersNew() {
  const n = useNavigate();
  const createCarerMutation = $api.useMutation("post", "/carers", {
    onSuccess: () => {
      n({ to: "/administration/carers" });
    },
  });

  const handleSubmit = (values: components["schemas"]["CarerCreationDto"]) => {
    createCarerMutation.mutate({ body: values });
  };

  return <CarerForm onSave={handleSubmit} loading={createCarerMutation.isPending} />;
}

export const Route = createFileRoute("/_auth/administration/carers/new")({
  component: AdministrationCarersNew,
});
