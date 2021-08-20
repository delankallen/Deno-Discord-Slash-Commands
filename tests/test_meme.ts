import ImgFlip from "../src/commands/meme_maker/imgFlip.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { Meme } from "../src/commands/meme_maker/meme_types.ts";

const imgflip = new ImgFlip({
  username: "memelordceo",
  password: "!:hPBI,fPUY4TklU$Pm1",
});

// const wat = await imgflip.getMemes();
const { id } = await imgflip.searchMemes("Another one");
const wat = await imgflip.captionMemes(id, ["Lambda", "Delta"]);

console.log(wat);

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
