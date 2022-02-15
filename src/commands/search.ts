import { json } from "https://deno.land/x/sift/mod.ts";
import { ActionRowComponent } from "../structures/ActionRowComponent.ts";
import { ComponentType } from "../structures/ComponentType.ts";
import {
  Embed,
  InteractionResponse,
  InteractionResponseType,
  ValueData,
} from "../structures/index.ts";

import ImgFlip from "./meme_maker/imgFlip.ts";

const buildEmbed = (memeUrls: string[]): Embed[] => {
  return memeUrls.map((url, i) => {
    return {
      title: `Meme: ${i + 1}`,
      image: {
        url: url,
      },
    };
  });
};

const buildComponent = (memeUrls: string[]): ActionRowComponent => {
  return {
    type: ComponentType.ACTION_ROW,
    components: [{
      type: ComponentType.SELECT_MENU,
      custom_id: "row_0_select_0",
      placeholder: "Select your offering for the Memelord!",
      options: memeUrls.map((url, i) => {
        return {
          label: `Meme ${i + 1}`,
          value: url,
        };
      }),
    }],
  };
};

const buildResponse = (memeUrls: string[]): InteractionResponse => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      components: [buildComponent(memeUrls)],
      content: memeUrls.reduce((acc, memeUrl) => acc + `${memeUrl}\n`, ""),
    },
  };
};

const searchCommand = async (options: ValueData[]) => {
  const [memeId, ...captions] = [...options.map((option) => {
    return option.value.toString();
  })];
  const imgflip = new ImgFlip({
    username: "memelordceo",
    password: "!:hPBI,fPUY4TklU$Pm1",
  });

  const memes = await imgflip.searchMemes(memeId);
  console.log(`memeIds: ${memes}`);
  const memeUrls = await imgflip.captionMemes(memes, captions).then((res) =>
    res.map((meme) => {
      return meme.data.url;
    })
  );

  console.log(`memeUrls: ${memeUrls}`);

  return json(buildResponse(memeUrls));
};

export default searchCommand;
