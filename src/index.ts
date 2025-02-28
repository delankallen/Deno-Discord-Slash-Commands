import {
  ApplicationCommand,
  PartialApplicationCommand,
  Snowflake,
} from "./structures/index.ts";

import { verifySignature as _verifySignature } from "./utils.ts";

const DISCORD_ENDPOINT = "https://discord.com/api/v8/";

const makeEndpoint = (endpoint: string) => `${DISCORD_ENDPOINT}${endpoint}`;

export * from "./structures/index.ts";
export * from "./builders.ts";

export class DiscordAppCommands {
  private publicKey: Snowflake;
  private applicationid: Snowflake;
  private authToken: string;
  private tokenPrefix: string;

  constructor(opts: {
    applicationId: Snowflake;
    publicKey: Snowflake;
    authToken: string;
    tokenPrefix?: string;
  }) {
    this.publicKey = opts.publicKey;
    this.applicationid = opts.applicationId;
    this.authToken = opts.authToken;
    this.tokenPrefix = (opts.tokenPrefix || "Bot") + " ";
  }

  verifySignature = (request: Request) => {
    return _verifySignature(request);
  };

  getApplicationCommands = async (guildId?: string) => {
    const request = await fetch(
      makeEndpoint(
        guildId
          ? `applications/${this.applicationid}/guilds/${guildId}/commands`
          : `applications/${this.applicationid}/commands`,
      ),
      {
        method: "GET",
        headers: {
          "Authorization": `${this.tokenPrefix}${this.authToken}`,
        },
      },
    );
    return (await request.json()) as ApplicationCommand[];
  };

  createApplicationCommand = async (
    command: PartialApplicationCommand,
    guildId?: string,
    commandId?: string,
  ) => {
    const suffix = commandId ? `/${commandId}` : "";
    const method = commandId ? "PATCH" : "POST";
    const request = await fetch(
      makeEndpoint(
        guildId
          ? `applications/${this.applicationid}/guilds/${guildId}/commands${suffix}`
          : `applications/${this.applicationid}/commands${suffix}`,
      ),
      {
        method: method,
        headers: {
          "Authorization": `${this.tokenPrefix}${this.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      },
    );
    return (await request.json()) as ApplicationCommand;
  };

  editApplicationCommand = async (
    commandId: string,
    command: PartialApplicationCommand,
    guildId?: string,
  ) => {
    return await this.createApplicationCommand(command, guildId, commandId);
  };

  deleteApplicationCommand = async (commandId: string, guildId?: string) => {
    const request = await fetch(
      makeEndpoint(
        guildId
          ? `applications/${this.applicationid}/guilds/${guildId}/commands/${commandId}`
          : `applications/${this.applicationid}/commands/${commandId}`,
      ),
      {
        method: "DELETE",
        headers: {
          "Authorization": `${this.tokenPrefix}${this.authToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return request.status == 204;
  };
}

export default DiscordAppCommands;
