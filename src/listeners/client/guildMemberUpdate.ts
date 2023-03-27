import { Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';
import { ConfigEntries } from '@/app/lib/types/database';

export default class GuildMemberUpdateListener extends Listener {
  // eslint-disable-next-line complexity
  public async run(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
    if (oldMember.roles.cache.equals(newMember.roles.cache))
      return;

    const guildId = newMember.guild.id;

    const roleBachelor = await this.container.client.configManager.get(ConfigEntries.Bachelor, guildId);
    const roleBts = await this.container.client.configManager.get(ConfigEntries.Bts, guildId);
    const roleMaster = await this.container.client.configManager.get(ConfigEntries.Master, guildId);
    const roleMasterOfScience = await this.container.client.configManager.get(ConfigEntries.MasterOfScience, guildId);

    const roleDigital = await this.container.client.configManager.get(ConfigEntries.Digital, guildId);
    const roleTech = await this.container.client.configManager.get(ConfigEntries.Tech, guildId);

    const roleThreeYearDigital = await this.container.client.configManager.get(ConfigEntries.ThreeYearDigital, guildId);
    const roleThreeYearTech = await this.container.client.configManager.get(ConfigEntries.ThreeYearTech, guildId);
    const roleFiveYearDigital = await this.container.client.configManager.get(ConfigEntries.FiveYearDigital, guildId);
    const roleFiveYearTech = await this.container.client.configManager.get(ConfigEntries.FiveYearTech, guildId);

    // eslint-disable-next-line max-len
    if (!roleBachelor || !roleBts || !roleMaster || !roleMasterOfScience || !roleDigital || !roleTech || !roleThreeYearDigital || !roleThreeYearTech || !roleFiveYearDigital || !roleFiveYearTech) {
      this.container.logger.warn(`[GuildMemberUpdateListener] Missing roles for guild ${guildId}`);
      return;
    }

    const isThreeYear = newMember.roles.cache.has(roleBachelor.id) || newMember.roles.cache.has(roleBts.id);
    const isFiveYear = newMember.roles.cache.has(roleMaster.id) || newMember.roles.cache.has(roleMasterOfScience.id);

    const isDigital = newMember.roles.cache.has(roleDigital.id);
    const isTech = newMember.roles.cache.has(roleTech.id);

    if (isThreeYear && isDigital && !newMember.roles.cache.has(roleThreeYearDigital.id))
      await newMember.roles.add(roleThreeYearDigital);
    else if (isThreeYear && isTech && !newMember.roles.cache.has(roleThreeYearTech.id))
      await newMember.roles.add(roleThreeYearTech);
    else if (isFiveYear && isDigital && !newMember.roles.cache.has(roleFiveYearDigital.id))
      await newMember.roles.add(roleFiveYearDigital);
    else if (isFiveYear && isTech && !newMember.roles.cache.has(roleFiveYearTech.id))
      await newMember.roles.add(roleFiveYearTech);
  }
}
