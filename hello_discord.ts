import { serve } from "https://deno.land/x/sift/mod.ts";
import { processInteraction } from "./mod.ts";

serve({
  "/": processInteraction,
});
