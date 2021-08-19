import {serve} from "sift";
import {processInteraction} from "./mod.ts";

serve({
    "/": processInteraction
})

