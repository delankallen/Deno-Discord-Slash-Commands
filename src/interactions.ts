import {
  json,
  validateRequest as _validateRequest,
} from "https://deno.land/x/sift@0.3.5/mod.ts";

import { verifySignature as _verifySignature } from "./utils.ts";
import {
  ApplicationCommandInteractionData,
  IntApplicationCommand,
  Interaction,
  InteractionResponse,
  InteractionType,
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

const watCommand = async (intData: ApplicationCommandInteractionData) => {
  const name = intData.name;
  if (intData.options) {
    return await executeCommand(name, intData.options);
  } else {
    return await notImplemented();
  }
};

async function patchAsync(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const BASE_URL = "https://discord.com/api/v8/webhooks";

const updateMessage = async (
  appId: string,
  intToken: string,
  memeUrl: string,
) => {
  console.log("Yo, wat up, I'm in the update.");
  const intResponse = {
    content: memeUrl,
  };
  console.log(`intResponse: ${JSON.stringify(intResponse)}`);
  console.log(`${BASE_URL}/${appId}/${intToken}/messages/@original`);
  return await patchAsync(
    `${BASE_URL}/${appId}/${intToken}/messages/@original`,
    json(intResponse),
  );
};

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

  let token = "";

  const interaction: Interaction = JSON.parse(body);
  if (interaction.message) {
    // const noMess: IntApplicationCommand = JSON.parse(body);
    // console.log(`message: ${JSON.stringify(interaction.message)}`);
    // console.log(`int: ${JSON.stringify(noMess)}`);

    console.log(`token1: ${token}`)
    console.log(`token2: ${interaction.token}`)

    if (interaction.data?.values) {
      const url = interaction.data.values[0];
      console.log(url);
      return await updateMessage(
        interaction.message.application_id,
        token,
        url,
      );
    }
  }
  // console.log(`Message: ${JSON.stringify(message)}`);
  switch (interaction.type) {
    case InteractionType.PING:
      return json({
        type: 1, // Type 1 in a response is a Pong interaction response type.
      });
    case InteractionType.APPLICATION_COMMAND: {
      const opt = interaction.data;
      token = interaction.token;
      console.log(`token inside: ${token}`)
      if (opt) {
        return await watCommand(opt);
      } else {
        return notImplemented();
      }
    }
    default:
      return json({ error: "bad request" }, { status: 400 });
  }
};

export default processInteraction;
