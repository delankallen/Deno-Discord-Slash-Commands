import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

import { ApiResponse, Meme, PopMemesData } from "./meme_types.ts";

const BASE_URL = "https://imgflip.com/memesearch?q=";

class MemeSearch {
  private _memeName: string;
  private _popMemes: Meme[];

  constructor(memeName: string, popMemes: PopMemesData) {
    this._memeName = memeName;
    this._popMemes = popMemes.memes;
  }

  private searchSite = async () => {
    const response = await fetch(
      `${BASE_URL}${encodeURIComponent(this._memeName)}`,
    ).then((res) => {
      return res.text();
    });
    const doc = new DOMParser().parseFromString(response, "text/html")!;

    const wat = [...doc.querySelectorAll('h3 a[href^="/meme/"]')] as Element[];
    const hrefs = wat.map((ele, i, arr) => {
      const href = ele.getAttribute("href")?.match("[0-9]+");
      return href ? href.toString() : "194165493";
    }).slice(0, 4);

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
