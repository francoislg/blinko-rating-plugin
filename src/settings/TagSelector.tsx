/** @jsxImportSource preact */
import type { JSXInternal } from 'preact/src/jsx';

export interface TagSelectorProps {
  availableTags: string[];
  selectedTags: string[];
  tagFilter: string;
  setTagFilter: (filter: string) => void;
  mode: 'whitelist' | 'blacklist';
  onToggleTag: (tag: string) => void;
  onRefreshTags: () => void;
  isLoadingTags: boolean;
}

export function TagSelector({
  availableTags,
  selectedTags,
  tagFilter,
  setTagFilter,
  mode,
  onToggleTag,
  onRefreshTags,
  isLoadingTags
}: TagSelectorProps): JSXInternal.Element {
  const i18n = window.Blinko.i18n;

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(tagFilter.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium">
          {mode === 'whitelist'
            ? i18n.t('ratings_settings.allowedTags')
            : i18n.t('ratings_settings.excludedTags')}
        </label>
        <button
          onClick={onRefreshTags}
          disabled={isLoadingTags}
          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:opacity-80"
        >
          {isLoadingTags ? i18n.t('ratings_settings.loading') : i18n.t('ratings_settings.refreshTags')}
        </button>
      </div>

      {/* Filter Input */}
      {availableTags.length > 0 && (
        <input
          type="text"
          placeholder={i18n.t('ratings_settings.filterTagsPlaceholder')}
          value={tagFilter}
          onChange={(e) => setTagFilter((e.target as HTMLInputElement).value)}
          className="w-full px-3 py-2 mb-3 border rounded-md text-sm"
        />
      )}

      {/* Tags List */}
      {availableTags.length > 0 ? (
        <div
          className="border rounded-md p-3"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          <div className="flex flex-col gap-2">
            {filteredTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onToggleTag(tag)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm">#{tag}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-desc p-4 border rounded-md text-center">
          {i18n.t('ratings_settings.noTagsFound')}
        </div>
      )}

      {/* Selected Tags Summary */}
      {selectedTags.length > 0 && (
        <div className="mt-3 p-3 bg-secondary/50 rounded-md">
          <p className="text-xs font-medium mb-2">
            {mode === 'whitelist'
              ? i18n.t('ratings_settings.allowed')
              : i18n.t('ratings_settings.excluded')}{' '}
            ({selectedTags.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded ${
                  mode === 'whitelist'
                    ? 'bg-blue-500/20 text-blue-500'
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
