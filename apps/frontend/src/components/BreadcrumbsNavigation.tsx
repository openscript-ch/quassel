import { isMatch, Link, useLocation, useMatches } from "@tanstack/react-router";
import { Anchor, Breadcrumbs } from "@quassel/ui";

// Inspired by https://github.com/TanStack/router/blob/main/examples/react/kitchen-sink-file-based/src/components/Breadcrumbs.tsx
export function BreadcrumbsNavigation() {
  const matches = useMatches();
  const location = useLocation();

  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithTitle = matches.filter((match) => isMatch(match, "context.title"));
  const entries = matchesWithTitle.map((match) => ({ label: match.context.title, to: match.fullPath }));
  const uniqueEntries = entries.filter((entry, index) => entries.findIndex((e) => e.label === entry.label) === index);

  // Remove the last entry if it's the current page
  if (uniqueEntries.length > 0 && uniqueEntries[uniqueEntries.length - 1].to.startsWith(location.pathname)) {
    uniqueEntries.pop();
  }

  return (
    <Breadcrumbs>
      {uniqueEntries.map((e) => (
        <Anchor key={e.label} renderRoot={(props) => <Link to={e.to} {...props} />}>
          {e.label}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
}
