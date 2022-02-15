import { serve } from "https://raw.githubusercontent.com/satyarohith/sift/0.4.3/mod.ts";
import { processInteraction } from "./mod.ts";

serve({
  "/": processInteraction,
});
