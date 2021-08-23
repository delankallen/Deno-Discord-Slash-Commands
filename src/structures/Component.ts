import { ActionRowComponent } from "./ActionRowComponent.ts";
import { ButtonComponent } from "./ButtonComponent.ts";
import { SelectMenuComponent } from "./SelectMenuComponent.ts";

export type Component =
  | ActionRowComponent
  | ButtonComponent
  | SelectMenuComponent;
