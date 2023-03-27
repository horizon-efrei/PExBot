import type ConfigurationManager from '@/lib/structures/ConfigurationManager';

declare module '@sapphire/framework' {
  interface SapphireClient {
    configManager: ConfigurationManager;
    checkValidity(): void;
  }
}
