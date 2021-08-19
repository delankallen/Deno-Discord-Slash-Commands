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
import executeCommand from "./commands/index.ts";

const notImplemented = () => {
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: "I can't let you do that!",
    },
  };
  return json(intResponse);
};

const watCommand = (options: ValueData[]) => {
  const { name, value } = options[0];
  return executeCommand(name, value);
};

async function postData(url = "", interaction: Interaction) {
  const response = await fetch(
    `https://discord.com/api/webhooks/877294899140100136/${interaction.token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "content": "wat up, this is a followup",
      }),
    },
  );

  return response.json();
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
      const opt = interaction.data.options;
      return opt ? watCommand(opt) : notImplemented();
    }
    default:
      return json({ error: "bad request" }, { status: 400 });
  }
};

export default processInteraction;
