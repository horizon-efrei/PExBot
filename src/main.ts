import '@sapphire/plugin-logger/register';
import 'dayjs/locale/fr';
import 'dotenv/config';
import 'module-alias/register';
import 'reflect-metadata';
import 'source-map-support/register';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import mongoose from 'mongoose';
import PexClient from '@/lib/structures/PexClient';

console.log('Starting the bot...');

dayjs.locale('fr');
dayjs.extend(duration);
dayjs.extend(relativeTime);

const main = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI);

  const client = new PexClient();

  try {
    await client.login(process.env.DISCORD_TOKEN);
    client.logger.info('[Main] Logged in!');
  } catch (error: unknown) {
    client.logger.fatal(error as Error);
    client.destroy();
    throw (error as Error);
  }
};

void main();
