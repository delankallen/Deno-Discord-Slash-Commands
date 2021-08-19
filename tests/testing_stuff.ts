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
