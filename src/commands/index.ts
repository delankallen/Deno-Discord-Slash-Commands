import { ApplicationCommandOptionValue } from "../structures/index.ts";
import animalCommand from "./animal.ts";
import helloCommand from "./hello.ts";

type commandIndex = {
  [key: string]: (value: ApplicationCommandOptionValue) => Response;
};

const commandArr: commandIndex = {
  hello: helloCommand,
  animal: animalCommand,
};

export const executeCommand = (
  commandName: string,
  value: ApplicationCommandOptionValue,
) => {
  const wat = commandArr[commandName];
  return wat(value);
};

export default executeCommand;
