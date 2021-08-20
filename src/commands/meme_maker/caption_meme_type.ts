type CaptionParams = {
  // deno-lint-ignore camelcase
  template_id: string;
  username: string;
  password: string;
  font?: string;
  // deno-lint-ignore camelcase
  max_font_size?: string;
  captions: string[];
};

export default CaptionParams;
