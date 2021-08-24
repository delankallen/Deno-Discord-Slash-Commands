import { ComponentType } from "../src/structures/ComponentType.ts";
import { Embed } from "../src/structures/Embed.ts";
import { InteractionApplicationCommandCallbackData } from "../src/structures/InteractionApplicationCommandCallbackData.ts";
import { MessageFlags } from "../src/structures/MessageFlags.ts";
import { SelectMenuComponent } from "../src/structures/SelectMenuComponent.ts";

const writeString = (value: string) => {
  console.log(value);
  return `Is this the string you are looking for? ${value}`;
};

const animalString = (value: string) => {
  console.log(value);
  return `Is this an animal? ${value}`;
};

type commandIndex = {
  [key: string]: (value: string) => string;
};

const commandArr: commandIndex = {
  hello: writeString,
  animal: animalString,
};

const executeCommand = (commandName: string, value: string) => {
  const wat = commandArr[commandName];
  console.log(`executed string: ${wat(value)}`);
  return wat(value);
};

executeCommand("hello", "I am testing hello!");
executeCommand("animal", "Dog");

const selectMenu: SelectMenuComponent = {
  type: ComponentType.SELECT_MENU,
  // deno-lint-ignore camelcase
  custom_id: "row_0_select_0",
  placeholder: "Select your offering for the Memelord!",
  options: [
    {
      label: "meme1",
      value: "https: //i.imgflip.com/5k4wae.jpg",
      default: false,
    },
    {
      label: "meme2",
      value: "https: //i.imgflip.com/5k4x2t.jpg",
      default: false,
    },
  ],
};

const embeded: Embed = {
  title: "Selectyourmeme",
  description: "Memesreturnedfromsearch",
  color: 0xdd00ff,
  fields: [
    {
      name: "meme1",
      value: "https: //i.imgflip.com/5k4wae.jpg",
    },
    {
      name: "meme2",
      value: "https: //i.imgflip.com/5k4x2t.jpg",
    },
  ],
};

const memeEmb: InteractionApplicationCommandCallbackData = {
  content: "For the Memelord",
  flags: MessageFlags.EPHEMERAL,
  components: [selectMenu],
  embeds: [embeded],
};

const _memeEmbed = {
  content: "FortheMemelord",
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          custom_id: "row_0_select_0",
          placeholder: "Select your offering for the Memelord!",
          options: [
            {
              label: "meme1",
              value: "https: //i.imgflip.com/5k4wae.jpg",
              default: false,
            },
            {
              label: "meme2",
              value: "https: //i.imgflip.com/5k4x2t.jpg",
              default: false,
            },
          ],
          min_values: 1,
          max_values: 1,
          type: 3,
        },
      ],
    },
  ],
  embeds: [
    {
      type: "rich",
      title: "Selectyourmeme",
      description: "Memesreturnedfromsearch",
      color: "0xdd00ff",
      fields: [
        {
          name: "meme1",
          value: "https: //i.imgflip.com/5k4wae.jpg",
        },
        {
          name: "meme2",
          value: "https: //i.imgflip.com/5k4x2t.jpg",
        },
      ],
      image: {
        url: "https: //i.imgflip.com/5k4x2t.jpg",
        height: 0,
        width: 0,
      },
    },
  ],
};
