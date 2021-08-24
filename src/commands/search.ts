import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

import ImgFlip from "./meme_maker/imgFlip.ts";
import { ApiResponse, CaptionMemeData } from "./meme_maker/meme_types.ts";

const buildResponse = (memeUrls: string[]) => {
  const reducer = (acc: string, currentValue: string, i: number) =>
    acc + `Meme: ${i}\n${currentValue}\n\n`;
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: memeUrls.reduce(reducer, ""),
    },
  };
  return intResponse;
};

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

  return json(buildResponse(memeUrls));
};

export default searchCommand;
