import { serve } from "https://deno.land/x/sift@0.4.3/mod.ts";
import { processInteraction } from "./mod.ts";

serve({
  "/": processInteraction,
});
