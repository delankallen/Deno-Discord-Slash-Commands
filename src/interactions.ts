import {
  json,
  validateRequest as _validateRequest,
} from "https://deno.land/x/sift@0.3.5/mod.ts";
import { verifySignature as _verifySignature } from "./utils.ts";
import {
  ApplicationCommandOptionValue,
  Interaction,
  InteractionResponse,
  InteractionType,
  ValueData,
} from "./structures/index.ts";

const helloCommand = (value: ApplicationCommandOptionValue) => {
  return json({
    // Type 4 responds with the below message retaining the user's
    // input at the top.
    type: 4,
    data: {
      content: `Hello, ${value}, this is the new slash command!`,
    },
  });
};

const animalCommand = (value: ApplicationCommandOptionValue) => {
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: "I am an animal"
    }
  }
  return json(intResponse);
}

export const processInteraction = async (request: Request) => {
    const { error } = await _validateRequest(request, {
      POST: {
        headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
      },
    });
    if (error) {
      return json({ error: error.message }, { status: error.status });
    }

    const { valid, body } = await _verifySignature(request);
    if (!valid) {
      return json(
        { error: "Invalid request" },
        {
          status: 401,
        },
      );
    }

    const interaction: Interaction = JSON.parse(body);
    switch (interaction.type) {
      case InteractionType.PING:
        return json({
          type: 1, // Type 1 in a response is a Pong interaction response type.
        });
      case InteractionType.APPLICATION_COMMAND: {
        const opt =
          interaction.data.options?.find((option) => option.name === "name") ??
            { value: "I can't let you do that. (Command registered but not implemented.)" };
        return helloCommand(opt.value);
      }
      default:
        return json({ error: "bad request" }, { status: 400 });
    }
  };

  export default processInteraction;