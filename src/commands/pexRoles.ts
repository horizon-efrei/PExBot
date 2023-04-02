import { ApplyOptions } from '@sapphire/decorators';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { filterNullAndUndefined } from '@sapphire/utilities';
import {
  channelMention,
  EmbedBuilder,
  PermissionsBitField,
  roleMention,
} from 'discord.js';
import pupa from 'pupa';
import { pexRoles as config } from '@/config/commands';
import Configuration from '@/lib/models/configuration';
import PaginatedContentMessageEmbed from '@/lib/structures/PaginatedContentMessageEmbed';
import { ConfigEntries } from '@/lib/types/database';
import type { ConfigurationDocument } from '@/lib/types/database';

const roleEntries = {
  [ConfigEntries.Bachelor]: 'Bachelor',
  [ConfigEntries.Bts]: 'BTS',
  [ConfigEntries.Master]: 'Mastère',
  [ConfigEntries.MasterOfScience]: 'Master Of Science',
  [ConfigEntries.Digital]: 'Digital',
  [ConfigEntries.Tech]: 'Tech',
  [ConfigEntries.ThreeYearDigital]: 'BTS/Bachelor - Digital',
  [ConfigEntries.ThreeYearTech]: 'BTS/Bachelor - Tech',
  [ConfigEntries.FiveYearDigital]: 'MSc/Mastère - Digital',
  [ConfigEntries.FiveYearTech]: 'MSc/Mastère - Tech',
  [ConfigEntries.Pex]: 'PEx',
  [ConfigEntries.Pge]: 'PGE',
} as const;

const roleChoices = Object.entries(roleEntries).map(([value, name]) => ({ name, value }));

enum Options {
  Name = 'nom',
  Role = 'role',
}

@ApplyOptions<Subcommand.Options>({
  ...config.descriptions,
  subcommands: [
    { name: 'set-role', chatInputRun: 'setRole' },
    { name: 'list', chatInputRun: 'list' },
    { name: 'remove', chatInputRun: 'remove' },
    { name: 'see', chatInputRun: 'see' },
  ],
})
export default class PexRolesCommand extends Subcommand {
  public override registerApplicationCommands(registry: Subcommand.Registry): void {
    registry.registerChatInputCommand(
      command => command
        .setName(config.descriptions.name)
        .setDescription(config.descriptions.command)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
        .addSubcommand(
          subcommand => subcommand
            .setName('set-role')
            .setDescription(config.descriptions.subcommands.setRole)
            .addStringOption(
              option => option
                .setName(Options.Name)
                .setDescription(config.descriptions.subcommandOptions.name)
                .setRequired(true)
                .setChoices(...roleChoices),
            )
            .addRoleOption(
              option => option
                .setName(Options.Role)
                .setDescription(config.descriptions.subcommandOptions.role)
                .setRequired(true),
            ),
        )
        .addSubcommand(
          subcommand => subcommand
            .setName('list')
            .setDescription(config.descriptions.subcommands.list),
        )
        .addSubcommand(
          subcommand => subcommand
            .setName('see')
            .setDescription(config.descriptions.subcommands.see)
            .addStringOption(
              option => option
                .setName(Options.Name)
                .setDescription(config.descriptions.subcommandOptions.name)
                .setChoices(...roleChoices),
            )
            .addRoleOption(
              option => option
                .setName(Options.Role)
                .setDescription(config.descriptions.subcommandOptions.role),
            ),
        )
        .addSubcommand(
          subcommand => subcommand
            .setName('remove')
            .setDescription(config.descriptions.subcommands.remove)
            .addStringOption(
              option => option
                .setName(Options.Name)
                .setDescription(config.descriptions.subcommandOptions.name)
                .setRequired(true)
                .setChoices(...roleChoices),
            ),
        ),
    );
  }

  public async setRole(interaction: Subcommand.ChatInputCommandInteraction<'cached'>): Promise<void> {
    const query = interaction.options.getString(Options.Name, true) as ConfigEntries;
    const role = interaction.options.getRole(Options.Role, true);

    await this.container.client.configManager.set(query, role);

    await interaction.reply(config.messages.successfullyDefined);
  }

  public async remove(interaction: Subcommand.ChatInputCommandInteraction<'cached'>): Promise<void> {
    const query = interaction.options.getString(Options.Name, true) as ConfigEntries;

    await this.container.client.configManager.remove(query, interaction.guild);

    await interaction.reply(config.messages.successfullyUndefined);
  }

  public async see(interaction: Subcommand.ChatInputCommandInteraction<'cached'>): Promise<void> {
    const query = interaction.options.getString(Options.Name) as ConfigEntries | null;
    const role = interaction.options.getRole(Options.Role);

    if ([query, role].filter(filterNullAndUndefined).length !== 1) {
      await interaction.reply({ content: config.messages.chooseOne, ephemeral: true });
      return;
    }

    if (role) {
      const entries = await Configuration.find({ guildId: interaction.guild.id, value: role.id });
      await interaction.reply(entries.length > 0
        ? pupa(config.messages.associatedKeys, { keys: entries.map(e => roleEntries[e.name]).join(' `, `') })
        : config.messages.noAssociatedKey);
      return;
    }

    const entry = await Configuration.findOne({ guildId: interaction.guild.id, name: query });
    await interaction.reply(entry
      ? {
          embeds: [new EmbedBuilder()
            .setColor('#2f3136')
            .setDescription(
              pupa(config.messages.associatedValue, { value: this._getMention(entry.name, entry.value) }),
            )],
        }
      : config.messages.noAssociatedValue);
  }

  public async list(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
    const definedEntries = await Configuration.find({ guildId: interaction.guildId });

    const allEntriesFilled = new Map<ConfigEntries, { name: string; document: ConfigurationDocument | undefined }>();
    for (const [entry, name] of Object.entries(roleEntries))
      allEntriesFilled.set(entry as ConfigEntries, { name, document: definedEntries.find(e => e.name === entry) });

    await new PaginatedContentMessageEmbed()
      .setTemplate(new EmbedBuilder().setTitle(config.messages.listTitle).setColor('#439bf2'))
      .setItems(
        [...allEntriesFilled.entries()]
          .map(([entry, { name, document }]) => pupa(
            document ? config.messages.lineWithValue : config.messages.lineWithoutValue,
            { name, value: document ? this._getMention(entry, document.value) : null },
          )),
      )
      .setItemsPerPage(15)
      .make()
      .run(interaction);
  }

  private _getMention(entry: ConfigEntries, value: string): string {
    return entry.startsWith('channel') ? channelMention(value) : roleMention(value);
  }
}
