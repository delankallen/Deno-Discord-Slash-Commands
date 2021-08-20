import { ValueData } from "../structures/index.ts";
import animalCommand from "./animal.ts";
import helloCommand from "./hello.ts";
import memeCommand from "./meme.ts";

type commandIndex = {
  [key: string]: (value: ValueData[]) => Promise<Response>;
};

const commandArr: commandIndex = {
  hello: helloCommand,
  blep: animalCommand,
  meme: memeCommand,
};

export const executeCommand = async (
  commandName: string,
  value: ValueData[],
) => {
  const wat = commandArr[commandName];
  return await wat(value);
};

export default executeCommand;
