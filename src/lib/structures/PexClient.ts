import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, PermissionsBitField } from 'discord.js';
import ConfigurationManager from './ConfigurationManager';

export default class PexClient extends SapphireClient {
  configManager: ConfigurationManager;

  constructor() {
    super({
      logger: {
        level: LogLevel.Debug,
      },
      loadDefaultErrorListeners: true,
      intents: [
        GatewayIntentBits.GuildMembers, // Access to GuildMemberAdd/Update/Remove events.
        GatewayIntentBits.Guilds, // Access to Guilds, Channels, Threads, Roles events.
      ],
    });

    this.configManager = new ConfigurationManager();

    this.logger.info('[Main] Client initialization finished!');
  }

  public checkValidity(): void {
    // Check permissions
    const requiredChannelPermissions = new PermissionsBitField([
      PermissionsBitField.Flags.ReadMessageHistory,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ViewChannel,
    ]);
    const requiredGuildPermissions = new PermissionsBitField([
      ...requiredChannelPermissions,
      PermissionsBitField.Flags.ManageGuild,
      PermissionsBitField.Flags.ManageRoles,
    ]);

    // Traverse each guild we are in
    for (const guild of this.guilds.cache.values()) {
      // Check guild-level permissions
      const guildMissingPerms = guild.members.me?.permissions.missing(requiredGuildPermissions);
      if (guildMissingPerms && guildMissingPerms.length > 0)
        this.logger.warn(`[Main] The bot is missing Guild-Level permissions in guild "${guild.name}". Its cumulated roles' permissions does not contain: ${guildMissingPerms.join(', ')}.`);

      // Check channel-level permissions
      for (const channel of guild.channels.cache.values()) {
        const channelMissingPerms = channel.permissionsFor(guild.members.me!)?.missing(requiredChannelPermissions);
        if (channelMissingPerms && channelMissingPerms.length > 0)
          this.logger.warn(`[Main] The bot is missing permission(s) ${channelMissingPerms.join(', ')} in channel "#${channel.name}" in guild "${guild.name}".`);
      }
    }
  }
}
