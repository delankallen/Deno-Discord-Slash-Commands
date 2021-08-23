import { cheerio,TagElement } from "https://deno.land/x/cheerio@1.0.4/mod.ts"

import { Meme, PopMemesData } from "./meme_types.ts";

const BASE_URL = "https://imgflip.com/memesearch?q=";

class MemeSearch {
  private _memeName: string;
  private _popMemes: Meme[];

  constructor(memeName: string, popMemes: PopMemesData) {
    this._memeName = memeName;
    this._popMemes = popMemes.memes;
  }

  private searchSite = async () => {
    const html = await fetch(
      `${BASE_URL}${encodeURIComponent(this._memeName)}`,
    ).then((res) => {
      return res.text();
    });
    const $ = cheerio.load(html);

    const wat : TagElement[] = [...$('h3 a[href^="/meme/"]').toArray()] as TagElement[]
    const hrefs = wat.map((x, _i, _arr) => x.attribs['href'].match("[0-9]+")?.toString() ?? '194165493').slice(0,4)

    return { id: hrefs[0] };
  };

  searchForMeme = async () => {
    const memes = this._popMemes.filter((meme) =>
      meme.name.toLocaleLowerCase().includes(`${this._memeName.toLowerCase()}`)
    );
    if (memes.length > 0) {
      return memes[0];
    } else {
      return await this.searchSite();
    }
  };
}

export default MemeSearch;
