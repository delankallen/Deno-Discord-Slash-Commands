import { json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import { InteractionResponse, ValueData } from "../structures/index.ts";

type animalIndex = {
  [key: string]: string;
};

const animals: animalIndex = {
  // deno-lint-ignore camelcase
  animal_dog:
    "https://www.pets4homes.co.uk/images/breeds/374/large/40da9a5b9c84a7c36b2169fd870fc1f7.jpg",
  // deno-lint-ignore camelcase
  animal_cat:
    "https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2014/11/Harry-the-cat-2.jpg",
  // deno-lint-ignore camelcase
  animal_penguin:
    "http://nfs.stvfiles.com/imagebase/196/master/196570-puffling-young-puffin-st-kilda.jpg",
};

export const animalCommand = async (options: ValueData[]) => {
  let { value } = options[0];
  value = animals[value.toString()];
  const intResponse: InteractionResponse = {
    type: 4,
    data: {
      content: `${value}`,
    },
  };
  return await json(intResponse);
};

export default animalCommand;
