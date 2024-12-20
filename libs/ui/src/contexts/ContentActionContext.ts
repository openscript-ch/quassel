import { ReactElement, createContext, useContext } from "react";

type ContentActionsContextType = {
  actions: ReactElement[];
  registerActions: (actions: ReactElement[]) => void;
};

export const ContentActionsContext = createContext<ContentActionsContextType | null>(null);

export function useContentActions() {
  const context = useContext(ContentActionsContext);
  if (!context) {
    throw new Error("useContentActions must be used within ContentActionsProvider");
  }
  return context;
}
