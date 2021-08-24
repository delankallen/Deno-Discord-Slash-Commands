import ImgFlip from "../src/commands/meme_maker/imgFlip.ts";
import { ActionRowComponent } from "../src/structures/ActionRowComponent.ts";
import { ComponentType } from "../src/structures/ComponentType.ts";
import {
  Embed,
  InteractionApplicationCommandCallbackData,
  InteractionResponse,
  InteractionResponseType,
  MessageFlags,
} from "../src/structures/index.ts";
import { SelectMenuComponent } from "../src/structures/SelectMenuComponent.ts";

const imgflip = new ImgFlip({
  username: "memelordceo",
  password: "!:hPBI,fPUY4TklU$Pm1",
});

const buildEmbed = (memeUrls: string[]): Embed[] => {
  return memeUrls.map((url, i) => {
    return {
      title: `Meme: ${i + 1}`,
      color: 0xdd00ff,
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

const buildData = (
  memeUrls: string[],
): InteractionApplicationCommandCallbackData => {
  return {
    content: "For the Memelord",
    components: [buildComponent(memeUrls)],
    embeds: buildEmbed(memeUrls),
  };
};

const buildResponse = (memeUrls: string[]): InteractionResponse => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: buildData(memeUrls),
  };
};
// const wat = await imgflip.getMemes();
// const { id } = await imgflip.searchMemes("Another one").then((res) => res[0]);
const memes = await imgflip.searchMemes("yuji itadori").then((x) =>
  x.map((meme) => meme.id)
);
// const wat = await imgflip.captionMeme(id, ["Lambda", "Delta"]);
const yo = await imgflip.captionMemes(memes, ["Lambda", "Delta"]).then((res) =>
  res.map((meme) => meme.data.url)
);

const wat = buildResponse(yo);
console.log(wat);

console.log(JSON.stringify(wat));

// const BASE_URL = "https://imgflip.com/memesearch?q=";

// const response = await fetch(BASE_URL + "another+one").then((res) => {
//   return res.text();
// });

// const $ = cheerio.load(response.toString());

// let wat = $('h3 a[href^="/meme/"]');

// const doc = new DOMParser().parseFromString(response, "text/html")!;

// const wat = [...doc.querySelectorAll('h3 a[href^="/meme/"]')] as Element[];
// const hrefs = wat.map((ele, i, arr) => {
//   return ele.getAttribute("href")?.match('[0-9]+');
// }).slice(0,4);

// console.log(`${BASE_URL}${encodeURIComponent("another one")}`);

// import { cheerio, TagElement } from "https://deno.land/x/cheerio@1.0.4/mod.ts"

// const BASE_URL = "https://imgflip.com/memesearch?q=";

// const html = await fetch(
//   `${BASE_URL}${encodeURIComponent("Spiderman")}`,
// ).then((res) => {
//   return res.text();
// });
// const $ = cheerio.load(html);

// const wat : TagElement[] = [...$('h3 a[href^="/meme/"]').toArray()] as TagElement[]
// const hrefs = wat.map((x, _i, _arr) => x.attribs['href'].match("[0-9]+")?.toString() ?? '194165493').slice(0,4)

// console.log(hrefs)
