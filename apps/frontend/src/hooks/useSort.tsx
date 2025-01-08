import { Link } from "@tanstack/react-router";
import { SortToggle } from "../components/SortToggle";
import { FileRoutesById } from "../routeTree.gen";

export type SortOrder = "ASC" | "DESC";

export function useSort(route: FileRoutesById[keyof FileRoutesById]) {
  const s = route.useSearch();

  const sortBy = "sortBy" in s ? s.sortBy : undefined;
  const sortOrder = "sortOrder" in s ? s.sortOrder : undefined;

  const ToggleLink = ({ sortKey }: { sortKey: typeof sortBy }) => {
    return (
      <Link
        from={route.fullPath}
        to="."
        search={(prev) => {
          if (!("sortBy" in prev)) return;

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
  };

  return { ToggleLink };
}
