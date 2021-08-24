import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import { ComponentType } from "../structures/ComponentType.ts";
import {
  Embed,
  InteractionApplicationCommandCallbackData,
  InteractionResponse,
  InteractionResponseType,
  MessageFlags,
  ValueData,
} from "../structures/index.ts";
import { SelectMenuComponent } from "../structures/SelectMenuComponent.ts";

import ImgFlip from "./meme_maker/imgFlip.ts";
import { ApiResponse, CaptionMemeData } from "./meme_maker/meme_types.ts";

const buildEmbed = (memeUrls: string[]): Embed => {
  return {
    title: "Select your meme",
    description: "Select your meme for the Memelord",
    color: 0xdd00ff,
    fields: memeUrls.map((url, i) => {
      return { name: `Meme: ${i + 1}`, value: url };
    }),
  };
};

const buildComponent = (memeUrls: string[]): SelectMenuComponent => {
  return {
    type: ComponentType.SELECT_MENU,
    custom_id: "row_0_select_0",
    placeholder: "Select your offering for the Memelord!",
    options: memeUrls.map((url, i) => {
      return {
        label: `Meme ${i + 1}`,
        value: url,
      };
    }),
  };
};

const buildData = (
  memeUrls: string[],
): InteractionApplicationCommandCallbackData => {
  return {
    content: "For the Memelord",
    embeds: [buildEmbed(memeUrls)],
  };
};

const buildResponse = (memeUrls: string[]): InteractionResponse => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: buildData(memeUrls),
  };
};

// const buildResponse = (memeUrls: string[]) => {
//   const reducer = (acc: string, currentValue: string, i: number) =>
//     acc + `Meme: ${i}\n${currentValue}\n\n`;
//   const intResponse: InteractionResponse = {
//     type: 4,
//     data: {
//       content: memeUrls.reduce(reducer, ""),
//     },
//   };
//   return intResponse;
// };

const searchCommand = async (options: ValueData[]) => {
  const [memeId, ...captions] = [...options.map((option) => {
    return option.value.toString();
  })];
  const imgflip = new ImgFlip({
    username: "memelordceo",
    password: "!:hPBI,fPUY4TklU$Pm1",
  });

  const memes = await imgflip.searchMemes(memeId).then((meme) =>
    meme.map((x) => x.id)
  );
  const memeUrls = await imgflip.captionMemes(memes, captions).then((res) =>
    res.map((meme) => meme.data.url)
  );

  const res = buildResponse(memeUrls);
  console.log(res);

  return json(buildResponse(memeUrls));
};

export default searchCommand;
