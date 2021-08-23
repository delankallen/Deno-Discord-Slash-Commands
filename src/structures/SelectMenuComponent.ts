import { ComponentType } from "./ComponentType.ts";
import { SelectOptions } from "./SelectOptions.ts";

export type SelectMenuComponent = {
  type: ComponentType.SELECT_MENU;
  // deno-lint-ignore camelcase
  custom_id: string;
  options: SelectOptions[];
  placeholder?: string;
  // deno-lint-ignore camelcase
  min_values?: number;
  // deno-lint-ignore camelcase
  max_values?: number;
  disabled?: boolean;
};
