import { cheerio, TagElement } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

import { Meme, PopMemesData } from "./meme_types.ts";

const BASE_URL = "https://imgflip.com";

class MemeSearch {
  private _memeName: string;
  private _popMemes: Meme[];

  constructor(memeName: string, popMemes: PopMemesData) {
    this._memeName = memeName;
    this._popMemes = popMemes.memes;
  }

  private getId = async (mName: string) => {
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

  private searchSite = async () => {
    const html = await fetch(
      `${BASE_URL}/memesearch?q=${encodeURIComponent(this._memeName)}`,
    ).then((res) => {
      return res.text();
    });
    const $ = cheerio.load(html);

    const wat: TagElement[] = [
      ...$('a[href^="/memegenerator/"]').toArray(),
    ] as TagElement[];
    const watwat = wat.map((x, _i, _arr) =>
      x.attribs["href"].split("/")[2] ?? "194165493"
    ).slice(0, 3);

    const memes: Promise<string>[] = watwat.map(async (mName, _i) => {
      const mRes = await this.getId(mName);
      return mRes;
    });

    return await Promise.all(memes);
  };

  searchForMeme = async () => {
    const memes = this._popMemes.filter((meme) =>
      meme.name.toLocaleLowerCase().includes(`${this._memeName.toLowerCase()}`)
    );
    if (memes.length > 0) {
      return memes.map((x) => x.id);
    } else {
      const watwat = await this.searchSite();
      return watwat;
    }
  };
}

export default MemeSearch;
