import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Message, PermissionsBitField } from 'discord.js';
import pupa from 'pupa';
import { ping as config } from '@/config/commands';

@ApplyOptions<Command.Options>(config.descriptions)
export default class PingCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry): void {
    registry.registerChatInputCommand(
      command => command
        .setName(config.descriptions.name)
        .setDescription(config.descriptions.command)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
    const defer = await interaction.deferReply({ fetchReply: true });
    if (!(defer instanceof Message))
      return;

    const botPing = (defer.editedAt ?? defer.createdAt).getTime() - interaction.createdAt.getTime();
    const apiPing = Math.round(this.container.client.ws.ping);

    await interaction.followUp(pupa(config.messages.message, { botPing, apiPing }));
  }
}
