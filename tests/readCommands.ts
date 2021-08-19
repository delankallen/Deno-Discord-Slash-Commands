import DiscordAppCommands from "../mod.ts";

const appCommand = new DiscordAppCommands({
  applicationId: "",
  authToken: "",
  publicKey: "",
});

await appCommand.createApplicationCommand({
  name: "avatar",
  description: "get a users avatar",
  options: [
    {
      name: "big",
      description: "should the image be big",
      type: 5,
    },
  ],
}, "").then(console.log).catch(console.log);
