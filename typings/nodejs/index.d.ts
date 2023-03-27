declare namespace NodeJS {
  interface ProcessEnv {
    /* eslint-disable @typescript-eslint/naming-convention */
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    MONGO_URI: string;
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}
