/** @jsxImportSource preact */
import type { JSXInternal } from 'preact/src/jsx';
import type { RatingConfig, RatingDisplayType } from '../types';
import { ModeToggle } from './ModeToggle';
import { TagSelector } from './TagSelector';

export interface RatingSettingProps {
  config: RatingConfig;
  availableTags: string[];
  tagFilter: string;
  setTagFilter: (filter: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<RatingConfig>) => void;
  onDelete: () => void;
  onToggleTag: (tag: string) => void;
  onRefreshTags: () => void;
  isLoadingTags: boolean;
}

export function RatingSetting({
  config,
  availableTags,
  tagFilter,
  setTagFilter,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onDelete,
  onToggleTag,
  onRefreshTags,
  isLoadingTags
}: RatingSettingProps): JSXInternal.Element {
  const i18n = window.Blinko.i18n;

  const getRatingTypeLabel = (type: RatingDisplayType): string => {
    return type === 'stars' ? i18n.t('ratings_settings.typeStars') : i18n.t('ratings_settings.typeUpvotes');
  };

  const getRatingIcon = (type: RatingDisplayType): string => {
    return type === 'stars' ? '⭐' : '👍';
  };

  return (
    <div key={config.guid} className="border rounded-md p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getRatingIcon(config.type)}</span>
          <div>
            <div className="font-semibold">{config.name}</div>
            <div className="text-xs text-desc">{getRatingTypeLabel(config.type)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium">
              {config.enabled ? i18n.t('ratings_settings.enabled') : i18n.t('ratings_settings.disabled')}
            </span>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) =>
                onUpdate({
                  enabled: (e.target as HTMLInputElement).checked
                })
              }
              className="w-4 h-4 cursor-pointer"
            />
          </label>
          <button
            onClick={onDelete}
            className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            {i18n.t('ratings_settings.delete')}
          </button>
        </div>
      </div>

      {/* Expandable Config */}
      {config.enabled && (
        <>
          <button
            onClick={onToggleExpand}
            className="text-sm text-blue-500 hover:underline mb-2 cursor-pointer"
          >
            {isExpanded
              ? i18n.t('ratings_settings.hideConfig')
              : i18n.t('ratings_settings.showConfig')}
          </button>

          {isExpanded && (
            <div className="mt-3 p-3 bg-secondary/30 rounded-md">
              {/* Label Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {i18n.t('ratings_settings.ratingLabel')}
                </label>
                <input
                  type="text"
                  value={config.label || ''}
                  onChange={(e) => onUpdate({ label: (e.target as HTMLInputElement).value || undefined })}
                  placeholder={i18n.t('ratings_settings.ratingLabelPlaceholder')}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>

              {/* Mode Toggle */}
              <ModeToggle
                mode={config.mode}
                onModeChange={(mode) => onUpdate({ mode })}
              />

              {/* Tags */}
              <TagSelector
                availableTags={availableTags}
                selectedTags={config.tags}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
                mode={config.mode}
                onToggleTag={onToggleTag}
                onRefreshTags={onRefreshTags}
                isLoadingTags={isLoadingTags}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
