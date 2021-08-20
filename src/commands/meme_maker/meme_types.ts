export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type PopMemesData = {
  memes: Meme[];
};

export type CaptionMemeData = {
  url: string;
  // deno-lint-ignore camelcase
  page_url: string;
};

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  // deno-lint-ignore camelcase
  box_count: number;
}

export interface MemeUser {
  username: string;
  password: string;
}
