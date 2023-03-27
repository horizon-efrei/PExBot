import { model, Schema } from 'mongoose';
import { ConfigEntries } from '@/lib/types/database';
import type { ConfigurationDocument, ConfigurationModel } from '@/lib/types/database';

const ConfigurationSchema = new Schema<ConfigurationDocument, ConfigurationModel, null>({
  name: {
    type: String,
    required: true,
    enum: [Object.values(ConfigEntries)].flat(),
  },
  guildId: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default model<ConfigurationDocument, ConfigurationModel>('Configuration', ConfigurationSchema);
