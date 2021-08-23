import { ButtonStyles } from "./ButtonStyles.ts";
import { ComponentType } from "./ComponentType.ts";
import { Emoji } from "./Emoji.ts";

export type ButtonComponent = {
  type: ComponentType.BUTTON;
  style: ButtonStyles;
  label?: string;
  emoji?: Emoji;
  // deno-lint-ignore camelcase
  custom_id?: string;
  url?: string;
  disabled?: boolean;
};
