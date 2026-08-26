"use client";

import { createContext, useContext } from "react";
import type { FormEnv } from "./types";

const FormEnvContext = createContext<FormEnv | null>(null);

export const FormEnvProvider = FormEnvContext.Provider;

/**
 * Widgets read the shared form environment from here — including the
 * recursive field renderer, which is handed down rather than imported so the
 * nesting containers never import their own parent.
 */
export function useFormEnv(): FormEnv {
  const env = useContext(FormEnvContext);
  if (!env) {
    throw new Error("Admin form fields must be rendered inside <DocumentForm>.");
  }
  return env;
}
