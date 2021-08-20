import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

import ImgFlip from "./meme_maker/imgFlip.ts";

const memeCommand = async (options: ValueData[]) => {
  const [memeId, ...captions] = [...options.map((option) => {
    return option.value.toString();
  })];
  const imgflip = new ImgFlip({
    username: "memelordceo",
    password: "!:hPBI,fPUY4TklU$Pm1",
  });

  const { id } = await imgflip.searchMemes(memeId);
  return await imgflip.captionMemes(id, captions).then((response) => {
    const intResponse: InteractionResponse = {
      type: 4,
      data: {
        content: `${response.data.url}`,
      },
    };
    return json(intResponse);
  });
};

export default memeCommand;
