import {serve} from "https://deno.land/x/sift@0.3.5/mod.ts";
import {processInteraction} from "./mod.ts";

serve({
    "/": processInteraction
})

