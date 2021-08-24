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

  private captionParam = (id: string, captions: string[]): CaptionParams => ({
    template_id: id,
    username: this._user.username,
    password: this._user.password,
    ...Object.assign(
      {},
      ...captions.map((caption, i) => ({ [`boxes[${i}][text]`]: caption })),
    ),
  });

  getMemes = async (): Promise<ApiResponse<PopMemesData>> => {
    const response = await fetch(`${this.api_url}/get_memes`);
    return response.json();
  };

  searchMemes = async (memeName: string) => {
    const popMemes = await this.getMemes();
    const searchMemes = new MemeSearch(memeName, popMemes.data);
    return await searchMemes.searchForMeme();
  };

  captionMeme = async (
    templateId: string,
    captions: string[],
  ): Promise<ApiResponse<CaptionMemeData>> => {
    const response: Promise<ApiResponse<CaptionMemeData>> = await postAsync(
      `${this.api_url}/caption_image`,
      this.captionParam(templateId, captions),
    );
    return response;
  };

  captionMemes = async (
    memeIds: string[],
    captions: string[],
  ) => {
    const postMemes: Promise<ApiResponse<CaptionMemeData>>[] = memeIds.map(
      async (id, i) => {
        const memeRespone: Promise<ApiResponse<CaptionMemeData>> =
          await postAsync(
            `${this.api_url}/caption_image`,
            this.captionParam(id, [`Meme: ${i + 1}`]),
          );
        return memeRespone;
      },
    );

    return await Promise.all(postMemes);
  };
}

export default ImgFlip;
