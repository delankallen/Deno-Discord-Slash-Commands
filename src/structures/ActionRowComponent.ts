import { Component } from "./Component.ts";
import { ComponentType } from "./ComponentType.ts";

export type ActionRowComponent = {
  type: ComponentType.ACTION_ROW;
  components: Exclude<Component, ActionRowComponent>;
};
