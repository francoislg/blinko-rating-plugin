/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { RatingConfig, RatingDisplayType } from './types';
import { RatingPluginConfiguration } from './rating-config';

export function Setting(): JSXInternal.Element {
  const [configs, setConfigs] = useState<RatingConfig[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagFilter, setTagFilter] = useState('');
  const [expandedConfig, setExpandedConfig] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRatingName, setNewRatingName] = useState('');
  const [newRatingType, setNewRatingType] = useState<RatingDisplayType>('stars');
  const [newRatingLabel, setNewRatingLabel] = useState('');
  const i18n = window.Blinko.i18n;

  const ratingConfigManager = new RatingPluginConfiguration();

  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const result = await window.Blinko.api.tags.list.query();

      if (result && Array.isArray(result)) {
        const tags = result.map((t: any) => t.name);
        setAvailableTags(tags);
      }
    } catch (error) {
    }
    setIsLoadingTags(false);
  };

  useEffect(() => {
    fetchTags();

    window.Blinko.api.config.getPluginConfig
      .query({
        pluginName: 'blinko-rating-plugin',
      })
      .then((res) => {
        if (res?.ratings) {
          try {
            const pluginConfig = JSON.parse(res.ratings);
            setConfigs(pluginConfig.ratings || []);
          } catch (e) {
          }
        }
      });
  }, []);

  const handleSave = async () => {
    try {
      const pluginConfig = { ratings: configs };
      await window.Blinko.api.config.setPluginConfig.mutate({
        pluginName: 'blinko-rating-plugin',
        key: 'ratings',
        value: JSON.stringify(pluginConfig)
      });

      // Emit event to trigger config reload
      window.dispatchEvent(new CustomEvent('blinko-rating-plugin-update'));

      window.Blinko.toast.success(i18n.t('settings.settingsSaved'));
      window.Blinko.closeDialog();
    } catch (error) {
      window.Blinko.toast.error(i18n.t('settings.failedToSave'));
    }
  };

  const handleAddRating = () => {
    if (!newRatingName.trim()) {
      window.Blinko.toast.error(i18n.t('settings.nameRequired'));
      return;
    }

    const guid = ratingConfigManager.generateGuid(newRatingName);
    const newConfig: RatingConfig = {
      guid,
      name: newRatingName.trim(),
      type: newRatingType,
      enabled: true,
      mode: 'blacklist',
      tags: [],
      label: newRatingLabel.trim() || undefined
    };

    setConfigs([...configs, newConfig]);
    setNewRatingName('');
    setNewRatingType('stars');
    setNewRatingLabel('');
    setShowAddDialog(false);
    window.Blinko.toast.success(i18n.t('settings.ratingAdded'));
  };

  const handleDeleteRating = (guid: string) => {
    setConfigs(configs.filter(c => c.guid !== guid));
  };

  const handleUpdateConfig = (guid: string, updates: Partial<RatingConfig>) => {
    setConfigs(configs.map(c => c.guid === guid ? { ...c, ...updates } : c));
  };

  const toggleTag = (guid: string, tag: string) => {
    const config = configs.find(c => c.guid === guid);
    if (!config) return;

    const newTags = config.tags.includes(tag)
      ? config.tags.filter(t => t !== tag)
      : [...config.tags, tag];

    handleUpdateConfig(guid, { tags: newTags });
  };

  const getRatingTypeLabel = (type: RatingDisplayType): string => {
    return type === 'stars' ? i18n.t('settings.typeStars') : i18n.t('settings.typeUpvotes');
  };

  const getRatingIcon = (type: RatingDisplayType): string => {
    return type === 'stars' ? '⭐' : '👍';
  };

  return (
    <div
      className="max-w-2xl mx-auto p-4 rounded-lg"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-4">{i18n.t('settings.pluginTitle')}</h2>

      {/* List of Ratings */}
      {configs.length === 0 ? (
        <div className="text-center p-8 border rounded-md text-desc">
          {i18n.t('settings.noRatings')}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {configs.map((config) => (
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
                      {config.enabled ? i18n.t('settings.enabled') : i18n.t('settings.disabled')}
                    </span>
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) =>
                        handleUpdateConfig(config.guid, {
                          enabled: (e.target as HTMLInputElement).checked
                        })
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                  </label>
                  <button
                    onClick={() => handleDeleteRating(config.guid)}
                    className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    {i18n.t('settings.delete')}
                  </button>
                </div>
              </div>

              {/* Expandable Config */}
              {config.enabled && (
                <>
                  <button
                    onClick={() =>
                      setExpandedConfig(expandedConfig === config.guid ? null : config.guid)
                    }
                    className="text-sm text-blue-500 hover:underline mb-2 cursor-pointer"
                  >
                    {expandedConfig === config.guid
                      ? i18n.t('settings.hideConfig')
                      : i18n.t('settings.showConfig')}
                  </button>

                  {expandedConfig === config.guid && (
                    <div className="mt-3 p-3 bg-secondary/30 rounded-md">
                      {/* Label Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          {i18n.t('settings.ratingLabel')}
                        </label>
                        <input
                          type="text"
                          value={config.label || ''}
                          onChange={(e) => handleUpdateConfig(config.guid, { label: (e.target as HTMLInputElement).value || undefined })}
                          placeholder={i18n.t('settings.ratingLabelPlaceholder')}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                        />
                      </div>

                      {/* Mode Toggle */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          {i18n.t('settings.filterMode')}
                        </label>
                        <div className="flex gap-0 border rounded-md overflow-hidden">
                          <button
                            onClick={() => handleUpdateConfig(config.guid, { mode: 'whitelist' })}
                            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                              config.mode === 'whitelist'
                                ? 'bg-blue-500 text-white'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {i18n.t('settings.whitelist')}
                          </button>
                          <button
                            onClick={() => handleUpdateConfig(config.guid, { mode: 'blacklist' })}
                            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                              config.mode === 'blacklist'
                                ? 'bg-red-500 text-white'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {i18n.t('settings.blacklist')}
                          </button>
                        </div>
                        <p className="text-xs text-desc mt-2">
                          <strong>
                            {config.mode === 'whitelist'
                              ? i18n.t('settings.whitelistLabel')
                              : i18n.t('settings.blacklistLabel')}
                          </strong>{' '}
                          {config.mode === 'whitelist'
                            ? i18n.t('settings.whitelistText')
                            : i18n.t('settings.blacklistText')}
                        </p>
                      </div>

                      {/* Tags */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium">
                            {config.mode === 'whitelist'
                              ? i18n.t('settings.allowedTags')
                              : i18n.t('settings.excludedTags')}
                          </label>
                          <button
                            onClick={fetchTags}
                            disabled={isLoadingTags}
                            className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:opacity-80"
                          >
                            {isLoadingTags ? i18n.t('settings.loading') : i18n.t('settings.refreshTags')}
                          </button>
                        </div>

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

                        {/* Tags List */}
                        {availableTags.length > 0 ? (
                          <div
                            className="border rounded-md p-3"
                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                          >
                            <div className="flex flex-col gap-2">
                              {availableTags
                                .filter((tag) =>
                                  tag.toLowerCase().includes(tagFilter.toLowerCase())
                                )
                                .map((tag) => (
                                  <label
                                    key={tag}
                                    className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={config.tags.includes(tag)}
                                      onChange={() => toggleTag(config.guid, tag)}
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
                        {config.tags.length > 0 && (
                          <div className="mt-3 p-3 bg-secondary/50 rounded-md">
                            <p className="text-xs font-medium mb-2">
                              {config.mode === 'whitelist'
                                ? i18n.t('settings.allowed')
                                : i18n.t('settings.excluded')}{' '}
                              ({config.tags.length}):
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {config.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-2 py-1 rounded ${
                                    config.mode === 'whitelist'
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
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Rating Button */}
      {!showAddDialog ? (
        <button
          onClick={() => setShowAddDialog(true)}
          className="w-full py-3 border-2 border-dashed rounded-md text-sm font-medium text-desc hover:bg-secondary/50 transition-colors cursor-pointer"
        >
          + {i18n.t('settings.addNewRating')}
        </button>
      ) : (
        <div className="border-2 border-blue-500 rounded-md p-4">
          <h3 className="font-semibold mb-3">{i18n.t('settings.addNewRating')}</h3>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              {i18n.t('settings.ratingName')}
            </label>
            <input
              type="text"
              value={newRatingName}
              onChange={(e) => setNewRatingName((e.target as HTMLInputElement).value)}
              placeholder={i18n.t('settings.ratingNamePlaceholder')}
              className="w-full px-3 py-2 border rounded-md text-sm"
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              {i18n.t('settings.ratingLabel')}
            </label>
            <input
              type="text"
              value={newRatingLabel}
              onChange={(e) => setNewRatingLabel((e.target as HTMLInputElement).value)}
              placeholder={i18n.t('settings.ratingLabelPlaceholder')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {i18n.t('settings.ratingType')}
            </label>
            <select
              value={newRatingType}
              onChange={(e) => setNewRatingType((e.target as HTMLSelectElement).value as RatingDisplayType)}
              className="w-full px-3 py-2 border rounded-md text-sm cursor-pointer"
            >
              <option value="stars">⭐ {i18n.t('settings.typeStars')}</option>
              <option value="upvotes">👍 {i18n.t('settings.typeUpvotes')}</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddRating}
              className="flex-1 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 cursor-pointer"
            >
              {i18n.t('settings.add')}
            </button>
            <button
              onClick={() => {
                setShowAddDialog(false);
                setNewRatingName('');
                setNewRatingType('stars');
                setNewRatingLabel('');
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer"
            >
              {i18n.t('settings.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex gap-2 mt-6">
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
