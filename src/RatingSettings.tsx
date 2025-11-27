/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { Tag, Note, TagFilterMode, RatingTypeConfig } from './types';

export function Setting(): JSXInternal.Element {
  const [starsConfig, setStarsConfig] = useState<RatingTypeConfig>({
    enabled: true,
    mode: 'blacklist',
    tags: []
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagFilter, setTagFilter] = useState('');
  const i18n = window.Blinko.i18n;

  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const result = await window.Blinko.api.tags.list.query();

      if (result && Array.isArray(result)) {
        const tags = result.map((t: any) => t.name);
        setAvailableTags(tags);
      }
    } catch (error) {
      console.error(i18n.t('settings.failedToFetchTags'), error);
    }
    setIsLoadingTags(false);
  };

  useEffect(() => {
    fetchTags();

    window.Blinko.api.config.getPluginConfig.query({
      pluginName: 'blinko-rating-plugin'
    }).then((res) => {
      if (res?.starsConfig) {
        try {
          setStarsConfig(JSON.parse(res.starsConfig));
        } catch (e) {
          console.error(i18n.t('settings.failedToParseConfig'), e);
        }
      }
    });
  }, []);

  const handleSave = async () => {
    try {
      await window.Blinko.api.config.setPluginConfig.mutate({
        pluginName: 'blinko-rating-plugin',
        key: 'starsConfig',
        value: JSON.stringify(starsConfig)
      });

      // Emit event to trigger config reload
      window.dispatchEvent(new CustomEvent('blinko-rating-plugin-update'));

      window.Blinko.toast.success(i18n.t('settings.settingsSaved'));
      window.Blinko.closeDialog();
    } catch (error) {
      console.error(i18n.t('settings.failedToSave'), error);
      window.Blinko.toast.error(i18n.t('settings.failedToSave'));
    }
  };

  const toggleTag = (tag: string) => {
    if (starsConfig.tags.includes(tag)) {
      setStarsConfig({
        ...starsConfig,
        tags: starsConfig.tags.filter(t => t !== tag)
      });
    } else {
      setStarsConfig({
        ...starsConfig,
        tags: [...starsConfig.tags, tag]
      });
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto p-4 rounded-lg"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* Stars Settings Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-lg font-semibold">⭐ {i18n.t('settings.title')}</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium">{starsConfig.enabled ? i18n.t('settings.enabled') : i18n.t('settings.disabled')}</span>
          <input
            type="checkbox"
            checked={starsConfig.enabled}
            onChange={(e) => setStarsConfig({ ...starsConfig, enabled: (e.target as HTMLInputElement).checked })}
            className="w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* Stars Configuration */}
      <div className="mb-6">

        {starsConfig.enabled && (
          <>
            {/* Mode Toggle */}
            <div className="mb-4 p-4 bg-secondary/30 rounded-md">
              <div className="mb-3">
                <label className="text-sm font-medium">{i18n.t('settings.filterMode')}</label>
              </div>
              <div className="flex gap-0 border rounded-md overflow-hidden mb-3">
                <button
                  onClick={() => setStarsConfig({ ...starsConfig, mode: 'whitelist' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    starsConfig.mode === 'whitelist'
                      ? 'bg-blue-500 text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {i18n.t('settings.whitelist')}
                </button>
                <button
                  onClick={() => setStarsConfig({ ...starsConfig, mode: 'blacklist' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    starsConfig.mode === 'blacklist'
                      ? 'bg-red-500 text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {i18n.t('settings.blacklist')}
                </button>
              </div>
              <p className="text-xs text-desc" dangerouslySetInnerHTML={{
                __html: starsConfig.mode === 'whitelist'
                  ? i18n.t('settings.whitelistDesc')
                  : i18n.t('settings.blacklistDesc')
              }} />
            </div>

            {/* Tags Multi-Select */}
            <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              {starsConfig.mode === 'whitelist' ? i18n.t('settings.allowedTags') : i18n.t('settings.excludedTags')}
            </label>
            <button
              onClick={fetchTags}
              disabled={isLoadingTags}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:opacity-80"
            >
              {isLoadingTags ? i18n.t('settings.loading') : i18n.t('settings.refreshTags')}
            </button>
          </div>
          <p className="text-xs text-desc mb-3">
            {starsConfig.mode === 'whitelist'
              ? i18n.t('settings.selectTagsWhitelist')
              : i18n.t('settings.selectTagsBlacklist')}
          </p>

          {/* Filter Input */}
          {availableTags.length > 0 && (
            <input
              type="text"
              placeholder={i18n.t('settings.filterTagsPlaceholder')}
              value={tagFilter}
              onChange={(e) => setTagFilter((e.target as HTMLInputElement).value)}
              className="w-full px-3 py-2 mb-3 border rounded-md text-sm"
            />
          )}

          {/* Tags Grid with Checkboxes */}
          {availableTags.length > 0 ? (
            <div
              className="border rounded-md p-3"
              style={{ maxHeight: '256px', overflowY: 'auto' }}
            >
              <div className="flex flex-col gap-2">
                {availableTags
                  .filter(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
                  .map(tag => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={starsConfig.tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">#{tag}</span>
                    </label>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-desc p-4 border rounded-md text-center">
              {i18n.t('settings.noTagsFound')}
            </div>
          )}

          {/* Selected Tags Summary */}
          {starsConfig.tags.length > 0 && (
            <div className="mt-3 p-3 bg-secondary/50 rounded-md">
              <p className="text-xs font-medium mb-2">
                {starsConfig.mode === 'whitelist' ? i18n.t('settings.allowed') : i18n.t('settings.excluded')} ({starsConfig.tags.length}):
              </p>
              <div className="flex flex-wrap gap-1">
                {starsConfig.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded ${
                      starsConfig.mode === 'whitelist'
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
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 cursor-pointer"
        >
          {i18n.t('settings.saveSettings')}
        </button>
        <button
          onClick={() => window.Blinko.closeDialog()}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer"
        >
          {i18n.t('settings.cancel')}
        </button>
      </div>
    </div>
  );
}
