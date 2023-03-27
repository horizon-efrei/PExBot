import { container } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import { Collection, Role } from 'discord.js';
import Configuration from '@/lib/models/configuration';
import type { ConfigEntries } from '@/lib/types/database';

export default class ConfigurationManager {
  private readonly _entries = new Collection<
    string,
    { guildId: string; name: ConfigEntries; value: Role }
  >();

  public async set(name: ConfigEntries, value: Role): Promise<void> {
    const guildId = value.guild.id;
    await Configuration.findOneAndUpdate(
      { guildId, name },
      { guildId, value: value.id },
      { upsert: true },
    );

    this._entries.set(this._getKey(name, value.guild.id), { guildId, name, value });
  }

  public async remove(name: ConfigEntries, guild: Guild): Promise<void> {
    await Configuration.findOneAndDelete({ guildId: guild.id, name });
    this._entries.delete(this._getKey(name, guild.id));
  }

  public getFromCache(name: ConfigEntries, guildId: string): Role | undefined {
    const key = this._getKey(name, guildId);
    if (this._entries.has(key))
      return this._entries.get(key)!.value;
  }

  public async get(name: ConfigEntries, guildId: string): Promise<Role | undefined> {
    const key = this._getKey(name, guildId);
    if (this._entries.has(key))
      return this._entries.get(key)!.value;

    const result = await Configuration.findOne({ guildId, name }).catch(() => null);
    if (result?.value) {
      const resolved = this._resolve(result.value, guildId);
      if (resolved) {
        this._entries.set(key, { guildId, name, value: resolved });
        return resolved;
      }
    }
  }

  public async loadAll(): Promise<void> {
    const documents = await Configuration.find().catch(() => null);
    if (!documents)
      return;

    for (const document of documents) {
      const value = this._resolve(document.value, document.guildId);
      if (value) {
        this._entries.set(
          this._getKey(document.name, document.guildId),
          { guildId: document.guildId, name: document.name, value },
        );
      }
    }
  }

  private _getKey(name: ConfigEntries, guildId: string): `${string}` {
    return `${guildId}-${name}`;
  }

  private _resolve(value: string, guildId: string): Role | undefined {
    const guild = container.client.guilds.cache.get(guildId);
    if (!guild)
      return;

    const resolved = guild.roles.resolve(value);
    if (resolved instanceof Role)
      return resolved;
  }
}
