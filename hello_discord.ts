import { serve } from "https://cdn.deno.land/sift/versions/0.4.3/raw/mod.ts";
import { processInteraction } from "./mod.ts";

serve({
  "/": processInteraction,
});
