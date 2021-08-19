import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import {
  ApplicationCommandOptionValue,
  InteractionResponse,
} from "../index.ts";

export const animalCommand = (value: ApplicationCommandOptionValue) => {
  if (value.toString().includes("penguin")) {
    value =
      "http://nfs.stvfiles.com/imagebase/196/master/196570-puffling-young-puffin-st-kilda.jpg";
  } else if (value.toString().includes("dog")) {
    value =
      "https://www.pets4homes.co.uk/images/breeds/374/large/40da9a5b9c84a7c36b2169fd870fc1f7.jpg";
  } else if (value.toString().includes("cat")) {
    value =
      "https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2014/11/Harry-the-cat-2.jpg";
  }
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: `${value}`,
    },
  };
  return json(intResponse);
};

export default animalCommand;
