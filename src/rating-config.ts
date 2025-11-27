import type { RatingType, RatingTypeConfig, TagFilterMode } from "./types";

export class RatingPluginConfiguration {
  private starsConfig: RatingTypeConfig = {
    enabled: true,
    mode: "blacklist",
    tags: [],
  };

  async init() {
    await this.loadConfig();

    // Listen for config updates
    window.addEventListener('blinko-rating-plugin-update', () => {
      this.loadConfig();
    });
  }

  getUserId(): string {
    const userId = window.Blinko.store.userStore.id;
    if (!userId) {
      console.warn("No user ID found, using anonymous user");
      return "anonymous";
    }
    return userId.toString();
  }

  async loadConfig() {
    try {
      const config = await window.Blinko.api.config.getPluginConfig.query({
        pluginName: "blinko-rating-plugin",
      });

      if (config?.starsConfig) {
        this.starsConfig = JSON.parse(config.starsConfig);
      }
    } catch (error) {
      console.error("Failed to load plugin config:", error);
    }
  }

  getConfig(ratingType: RatingType): RatingTypeConfig {
    if (ratingType === "stars") {
      return this.starsConfig;
    }
    return { enabled: false, mode: "blacklist", tags: [] };
  }

  setConfig(ratingType: RatingType, config: RatingTypeConfig) {
    if (ratingType === "stars") {
      this.starsConfig = config;
    }
  }
}
