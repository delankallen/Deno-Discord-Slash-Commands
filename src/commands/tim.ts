import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

const timCommand = async (options: ValueData[]) => {
  const { value } = options[0];
  const interactionResp: InteractionResponse = {
    type: 4,
    data: {
      content: `${value ?? "The world"} has disappointed Tim. https://i.imgflip.com/5lo3yw.jpg`,
    },
  };
  return await json(interactionResp);
};

export default timCommand;