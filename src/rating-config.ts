import type { RatingConfig, PluginConfig } from "./types";

export class RatingPluginConfiguration {
  private config: PluginConfig = {
    ratings: []
  };

  async init() {
    await this.loadConfig();

    window.addEventListener('blinko-rating-plugin-update', () => {
      this.loadConfig();
    });
  }

  getUserId(): string {
    const userId = window.Blinko.store.userStore.id;
    if (!userId) {
      return "anonymous";
    }
    return userId.toString();
  }

  async loadConfig() {
    try {
      const config = await window.Blinko.api.config.getPluginConfig.query({
        pluginName: "blinko-rating-plugin",
      });

      if (config?.ratings) {
        const parsed = JSON.parse(config.ratings);
        this.config = {
          ratings: Array.isArray(parsed.ratings) ? parsed.ratings : []
        };
      } else {
        this.config = { ratings: [] };
      }
    } catch (error) {
      this.config = { ratings: [] };
    }
  }

  getAllConfigs(): RatingConfig[] {
    return this.config?.ratings || [];
  }

  getConfig(guid: string): RatingConfig | undefined {
    return this.config?.ratings?.find(r => r.guid === guid);
  }

  addConfig(config: RatingConfig) {
    this.config.ratings.push(config);
  }

  updateConfig(guid: string, updates: Partial<RatingConfig>) {
    const index = this.config.ratings.findIndex(r => r.guid === guid);
    if (index !== -1) {
      this.config.ratings[index] = {
        ...this.config.ratings[index],
        ...updates
      };
    }
  }

  deleteConfig(guid: string) {
    this.config.ratings = this.config.ratings.filter(r => r.guid !== guid);
  }

  async saveConfig() {
    try {
      await window.Blinko.api.config.setPluginConfig.mutate({
        pluginName: "blinko-rating-plugin",
        key: "ratings",
        value: JSON.stringify(this.config)
      });

      window.dispatchEvent(new CustomEvent('blinko-rating-plugin-update'));
    } catch (error) {
      throw error;
    }
  }

  generateGuid(name: string): string {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .substring(0, 20);
    const randomNum = Math.floor(Math.random() * 100000000);
    return `${slug}_${randomNum}`;
  }
}
