import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import dayjs from 'dayjs';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import pupa from 'pupa';
import { statistics as config } from '@/config/commands';
import pkg from '@/root/package.json';

@ApplyOptions<Command.Options>(config.descriptions)
export default class StatisticsCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry): void {
    registry.registerChatInputCommand(
      command => command
        .setName(config.descriptions.name)
        .setDescription(config.descriptions.command)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
    const embedMessages = config.messages.embed;
    const embed = new EmbedBuilder()
      .setColor('#439bf2')
      .setDescription(config.messages.embed.description)
      .addFields([
        {
          name: embedMessages.version,
          value: pupa(embedMessages.versionContent, { version: pkg.version }),
          inline: true,
        },
        { name: embedMessages.memory, value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} Mo`, inline: true },
        { name: embedMessages.uptime, value: dayjs.duration(this.container.client.uptime!).humanize(), inline: true },
      ])
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}
