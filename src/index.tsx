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
import { StarRatingContainer } from "./ratings/stars/StarRatingContainer";
import { UpvoteContainer } from "./ratings/upvotes/UpvoteContainer";

System.register([], (exports) => (({
  execute: () => {
    exports(
      "default",
      class Plugin implements BasePlugin {
        constructor() {
          Object.assign(this, plugin);
        }

        withSettingPanel = true;

        renderSettingPanel = () => {
          const container = document.createElement("div");
          render(<Setting />, container);
          return container;
        };

        async init() {
          this.initI18n();

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

              render(
                <>
                  {ratingsToDisplay.map((guid) => {
                    const ratingConfig = config.getConfig(guid);
                    if (!ratingConfig) return null;

                    const ratingData = ratingPluginData.getRatingForNote(
                      note,
                      guid
                    );
                    const componentMap = {
                      'stars': StarRatingContainer,
                      'upvotes': UpvoteContainer
                    };
                    const Component = componentMap[ratingConfig.type];
                    if (!Component) return null;

                    return (
                      <Component
                        key={guid}
                        noteId={
                          note.id?.toString() || note._id?.toString() || ""
                        }
                        initialRating={ratingData.userRating}
                        averageRating={ratingData.averageRating}
                        voteCount={ratingData.voteCount}
                        allRatings={ratingData.allRatings}
                        currentUserId={currentUserId}
                        onRatingChange={(rating) =>
                          ratingPluginData.saveRating(note, guid, rating)
                        }
                        label={ratingConfig.label}
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

        initI18n() {
          window.Blinko.i18n.addResourceBundle("en", "translation", en);
          window.Blinko.i18n.addResourceBundle("zh", "translation", zh);
          window.Blinko.i18n.addResourceBundle("fr", "translation", fr);
        }

        destroy() {}
      }
    );
  },
})));
