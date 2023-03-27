import { ApplyOptions } from '@sapphire/decorators';
import type { ListenerOptions } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({ once: true })
export default class ReadyListener extends Listener {
  public async run(): Promise<void> {
    this.container.client.checkValidity();

    this.container.logger.info('[ConfigurationManager] Caching configured channels and roles...');
    await this.container.client.configManager.loadAll();

    this.container.logger.info('All caching done!');
  }
}
