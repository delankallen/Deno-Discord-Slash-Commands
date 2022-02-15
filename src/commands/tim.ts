import { json } from "https://deno.land/x/sift/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

const timCommand = async (options: ValueData[]) => {
  const { value } = options[0] ?? "The world";
  const interactionResp: InteractionResponse = {
    type: 4,
    data: {
      content: `${value} has disappointed Tim. https://i.imgflip.com/5lo3yw.jpg`,
    },
  };
  return await json(interactionResp);
};

export default timCommand;