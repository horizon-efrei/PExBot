import type { Document, Model } from 'mongoose';

/** Enum for the "Configuration"'s mongoose schema */
export enum ConfigEntries {
  Bachelor = 'role-bachelor',
  Bts = 'role-bts',
  Master = 'role-master',
  MasterOfScience = 'role-master-of-science',
  Digital = 'role-digital',
  Tech = 'role-tech',
  ThreeYearDigital = 'role-three-year-digital',
  ThreeYearTech = 'role-three-year-tech',
  FiveYearDigital = 'role-five-year-digital',
  FiveYearTech = 'role-five-year-tech',
}

/** Interface for the "Configuration"'s mongoose schema */
export interface ConfigurationBase {
  name: ConfigEntries;
  guildId: string;
  value: string;
}

/** Interface for the "Configuration"'s mongoose document */
export interface ConfigurationDocument extends ConfigurationBase, Document {}

/** Interface for the "Configuration"'s mongoose model */
export type ConfigurationModel = Model<ConfigurationDocument>;
