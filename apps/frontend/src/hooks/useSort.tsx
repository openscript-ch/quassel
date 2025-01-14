import { Link } from "@tanstack/react-router";
import { SortToggle } from "../components/SortToggle";
import { FileRoutesById } from "../routeTree.gen";
import { components } from "../api.gen";

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
          const prevSearch = prev as { sortBy: typeof sortBy; sortOrder: typeof sortOrder };

          let sortOrder: components["schemas"]["SortOrder"] | undefined;
          if (prevSearch.sortBy !== sortKey) {
            sortOrder = "ASC";
          } else if (prevSearch.sortOrder === "ASC") {
            sortOrder = "DESC";
          }

          return { ...prevSearch, sortBy: sortOrder && sortKey, sortOrder };
        }}
      >
        <SortToggle sortOrder={sortBy === sortKey ? sortOrder : undefined} />
      </Link>
    );
  };

  return { ToggleLink };
}
