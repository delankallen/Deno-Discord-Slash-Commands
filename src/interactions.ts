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

const helloCommand = (value = {}) => {
  return json({
    // Type 4 responds with the below message retaining the user's
    // input at the top.
    type: 4,
    data: {
      content: `Hello, ${value}, this is the new slash command!`,
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Click me!",
              style: 1,
              custom_id: "click_one",
            },
          ],
        },
      ],
    },
  });
};

const animalCommand = (value: ApplicationCommandOptionValue) => {
  if (value.toString().includes("penguin")) {
    value =
      "http://nfs.stvfiles.com/imagebase/196/master/196570-puffling-young-puffin-st-kilda.jpg";
  } else if (value.toString().includes("dog")) {
    value =
      "https://www.pets4homes.co.uk/images/breeds/374/large/40da9a5b9c84a7c36b2169fd870fc1f7.jpg";
  } else if (value.toString().includes("cat")) {
    value =
      "https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2014/11/Harry-the-cat-2.jpg";
  }
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: `${value}`,
    },
  };
  return json(intResponse);
};
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
  switch (name) {
    case "name":
      return helloCommand(value);
    case "animal":
      console.log(options);
      return animalCommand(value);
    default:
      return notImplemented();
  }
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
      // console.log(interaction);
      // postData("", interaction).then((data) => console.log(data));
      return opt ? watCommand(opt) : notImplemented();
    }
    default:
      return json({ error: "bad request" }, { status: 400 });
  }
};

export default processInteraction;
