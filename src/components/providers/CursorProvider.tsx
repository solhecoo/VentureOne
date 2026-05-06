"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CursorState = {
  variant: "default" | "hover" | "drag" | "view" | "hidden";
  label?: string;
};

type CursorContextValue = {
  state: CursorState;
  setCursor: (next: Partial<CursorState>) => void;
  reset: () => void;
};

const defaultState: CursorState = { variant: "default", label: undefined };

const CursorContext = createContext<CursorContextValue>({
  state: defaultState,
  setCursor: () => {},
  reset: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(defaultState);

  const setCursor = useCallback((next: Partial<CursorState>) => {
    setState((prev) => ({ ...prev, ...next }));
  }, []);

  const reset = useCallback(() => setState(defaultState), []);

  const value = useMemo(
    () => ({ state, setCursor, reset }),
    [state, setCursor, reset],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  return useContext(CursorContext);
}

export function useCursorHover(label?: string) {
  const { setCursor, reset } = useCursor();
  return {
    onMouseEnter: () => setCursor({ variant: label ? "view" : "hover", label }),
    onMouseLeave: () => reset(),
  };
}
