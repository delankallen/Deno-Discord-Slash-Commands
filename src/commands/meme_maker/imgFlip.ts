import {
  ApiResponse,
  CaptionMemeData,
  MemeUser,
  PopMemesData,
} from "./meme_types.ts";
import CaptionParams from "./caption_meme_type.ts";
import MemeSearch from "./meme_search.ts";

async function postAsync(url = "", params = {}, data = {}) {
  url += `?${new URLSearchParams(params)}`;
  console.log(JSON.stringify(data));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

class ImgFlip {
  private _user: MemeUser;
  private readonly api_url = "https://api.imgflip.com";

  constructor(user: MemeUser) {
    this._user = user;
  }

  getMemes = async (): Promise<ApiResponse<PopMemesData>> => {
    const response = await fetch(`${this.api_url}/get_memes`);
    return response.json();
  };

  searchMemes = async (memeName: string) => {
    const popMemes = await this.getMemes();
    const searchMemes = new MemeSearch(memeName, popMemes.data);
    return await searchMemes.searchForMeme();
  };

  captionMemes = async (
    templateId: string,
    captions: string[],
  ): Promise<ApiResponse<CaptionMemeData>> => {
    const captionParam: CaptionParams = {
      // deno-lint-ignore camelcase
      template_id: templateId,
      username: this._user.username,
      password: this._user.password,
      ...Object.assign(
        {},
        ...captions.map((caption, i) => ({ [`boxes[${i}][text]`]: caption })),
      ),
    };
    const response: Promise<ApiResponse<CaptionMemeData>> = await postAsync(
      `${this.api_url}/caption_image`,
      captionParam,
    );
    return response;
  };
}

export default ImgFlip;
