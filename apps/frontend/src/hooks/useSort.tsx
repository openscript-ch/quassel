import { Link, ValidateUseSearchResult } from "@tanstack/react-router";
import { SortToggle } from "../components/SortToggle";
import { FileRoutesById } from "../routeTree.gen";
import { components } from "../api.gen";

export function useSort<S extends ValidateUseSearchResult<FileRoutesById[keyof FileRoutesById]>>(search: S) {
  const sortBy = "sortBy" in search ? search.sortBy : undefined;
  const sortOrder = "sortOrder" in search ? search.sortOrder : undefined;

  const ToggleLink = ({
    sortKey,
  }: {
    sortKey: S extends {
      sortBy?: string;
      sortOrder?: string;
    }
      ? S["sortBy"]
      : never;
  }) => {
    return (
      <Link
        to="."
        search={(prev) => {
          let sortOrder: components["schemas"]["SortOrder"] | undefined;
          if (prev.sortBy !== sortKey) {
            sortOrder = "ASC";
          } else if (prev.sortOrder === "ASC") {
            sortOrder = "DESC";
          }

          return { ...prev, sortBy: sortOrder && (sortKey as typeof sortBy), sortOrder };
        }}
      >
        <SortToggle sortOrder={sortBy === sortKey ? sortOrder : undefined} />
      </Link>
    );
  };

  return { ToggleLink };
}
