/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from "preact/compat";
import { App } from "./app";
import type { BasePlugin } from "blinko";
import type { Note } from "./types";
import { Setting } from "./RatingSettings";
import plugin from "../plugin.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import fr from "./locales/fr.json";
import { RatingPluginConfiguration } from "./rating-config";
import { RatingPluginData } from "./rating-data";
import { RatingComponent } from "./RatingContainer";

/**
 * Main plugin entry point registered with SystemJS
 * Exports the plugin class implementing BasePlugin interface
 */
System.register([], (exports) => ({
  execute: () => {
    exports(
      "default",
      class Plugin implements BasePlugin {
        constructor() {
          // Initialize plugin with metadata from plugin.json
          Object.assign(this, plugin);
        }

        // Flag indicating this plugin has a settings panel
        withSettingPanel = true;

        /**
         * Renders the settings panel UI
         * @returns {HTMLElement} Container element with rendered settings component
         */
        renderSettingPanel = () => {
          const container = document.createElement("div");
          render(<Setting />, container);
          return container;
        };

        /**
         * Initializes the plugin
         * Sets up rating injection into note cards
         */
        async init() {
          // Initialize internationalization
          this.initI18n();

          // Create and initialize rating configuration
          const config = new RatingPluginConfiguration();
          await config.init();

          window.Blinko.addCardFooterSlot({
            name: "note-rating",
            content: (note: Note) => {
              const container = document.createElement("div");

              if (!note) {
                return container;
              }

              const ratingPluginData = new RatingPluginData(config);

              const ratingsToDisplay =
                ratingPluginData.getRatingsToDisplay(note);
              if (ratingsToDisplay.length === 0) {
                return container;
              }

              const currentUserId =
                window.Blinko.store.userStore.id?.toString() || "anonymous";

              // Render all rating types in a single render call
              render(
                <>
                  {ratingsToDisplay.map((ratingType) => {
                    const ratingData = ratingPluginData.getRatingForNote(
                      note,
                      ratingType
                    );
                    return (
                      <RatingComponent
                        key={ratingType}
                        noteId={
                          note.id?.toString() || note._id?.toString() || ""
                        }
                        initialRating={ratingData.userRating}
                        averageRating={ratingData.averageRating}
                        voteCount={ratingData.voteCount}
                        allRatings={ratingData.allRatings}
                        currentUserId={currentUserId}
                        onRatingChange={(rating) =>
                          ratingPluginData.saveRating(note, ratingType, rating)
                        }
                      />
                    );
                  })}
                </>,
                container
              );

              return container;
            },
          });
        }

        /**
         * Initializes internationalization resources
         * Adds English, Chinese, and French translation bundles
         */
        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", en);
          window.Blinko.i18n.addResourceBundle("zh", "translation", zh);
          window.Blinko.i18n.addResourceBundle("fr", "translation", fr);
        }

        /**
         * Cleanup function called when plugin is disabled
         */
        destroy() {}
      }
    );
  },
}));
