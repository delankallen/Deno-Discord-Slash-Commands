import { json } from "https://deno.land/x/sift/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

const helloCommand = async (options: ValueData[]) => {
  const { value } = options[0];
  const interactionResp: InteractionResponse = {
    type: 4,
    data: {
      content: `Wat up, ${value}`,
    },
  };
  return await json(interactionResp);
};

export default helloCommand;
