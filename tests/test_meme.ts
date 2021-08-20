import ImgFlip from "../src/commands/meme_maker/imgFlip.ts";

const imgflip = new ImgFlip({
  username: "memelordceo",
  password: "!:hPBI,fPUY4TklU$Pm1",
});

// const wat = await imgflip.getMemes();
const wat = await imgflip.captionMemes("87743020", ["work", "memes", "money"]);

console.log(wat);
