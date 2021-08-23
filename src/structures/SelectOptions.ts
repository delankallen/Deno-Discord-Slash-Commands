import { Emoji } from "./Emoji.ts";

export type SelectOptions = {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
};
