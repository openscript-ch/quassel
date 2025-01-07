import { Link } from "@tanstack/react-router";
import { SortToggle } from "../components/SortToggle";
import { FileRoutesById } from "../routeTree.gen";

export type SortOrder = "ASC" | "DESC";

type RoutesWithSorting = "/_auth/administration/questionnaires/";

export function useSort(route: FileRoutesById[RoutesWithSorting]) {
  const s = route.useSearch();
  const { sortBy, sortOrder } = s;

  const ToggleLink = ({ sortKey }: { sortKey: typeof sortBy }) => (
    <Link
      to="."
      search={(prev) => {
        let sortOrder: SortOrder | undefined;
        if (prev.sortBy !== sortKey) {
          sortOrder = "ASC";
        } else if (prev.sortOrder === "ASC") {
          sortOrder = "DESC";
        }

        return { ...prev, sortBy: sortOrder && sortKey, sortOrder };
      }}
    >
      <SortToggle sortOrder={sortBy === sortKey ? sortOrder : undefined} />
    </Link>
  );

  return { ToggleLink };
}
