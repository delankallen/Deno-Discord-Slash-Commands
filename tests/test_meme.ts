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

import { cheerio, TagElement } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

const BASE_URL = "https://imgflip.com";

const imgflip = new ImgFlip({
  username: "memelordceo",
  password: "!:hPBI,fPUY4TklU$Pm1",
});

const buildResponse = (memeUrls: string[]): InteractionResponse => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: memeUrls.reduce((acc, memeUrl) => acc + `${memeUrl}\n`, ""),
    },
  };
};

const _memeName = "spiderman";

const html = await fetch(
  `${BASE_URL}/memesearch?q=${encodeURIComponent(_memeName)}`,
).then((res) => {
  return res.text();
});
const $ = cheerio.load(html);

const a: TagElement[] = [
  ...$('h3 a[href^="/meme/"]').toArray(),
] as TagElement[];

const links = a.map((x, _i, _arr) => x.attribs["href"]);

const popMemes = await imgflip.getMemes();

const getId = async (mName: string) => {
  if (!mName.includes("-")) {
    return mName;
  }
  const memeTempPage = await fetch(
    `${BASE_URL}/memetemplate/${mName}`,
  ).then((res) => res.text());

  const $ = cheerio.load(memeTempPage);

  const tempId = $("#mtm-info p:first-of-type").text().split(" ")[2] ?? "";

  return tempId;
};

const getHrefs = async () => {
  const watwat = a.map((x, _i, _arr) =>
    x.attribs["href"].split("/")[2] ?? "194165493"
  ).slice(0, 3);

  const memes: Promise<string>[] = watwat.map(async (mName, _i) => {
    const mRes = await getId(mName);
    return mRes;
  });

  return await Promise.all(memes);
};

console.log(await getHrefs());

const memes = await imgflip.searchMemes("yuji itadori").then((x) =>
  x.map((meme) => meme.id)
);
// const wat = await imgflip.captionMeme(id, ["Lambda", "Delta"]);
const yo = await imgflip.captionMemes(memes, ["Lambda", "Delta"]).then((res) =>
  res.map((meme) => meme.data.url)
);

// const wat = buildResponse(yo);

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
