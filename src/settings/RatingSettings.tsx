/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { RatingConfig, RatingDisplayType } from '../types';
import { RatingPluginConfiguration } from '../rating-config';
import { syncRatingConfigsToAllNotes } from '../rating-card-sync';
import { RatingSetting } from './RatingSetting';
import { AddRatingDialog } from './AddRatingDialog';
import { RatingSettingsActions } from './RatingSettingsActions';

export function Setting(): JSXInternal.Element {
  const [configs, setConfigs] = useState<RatingConfig[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isSyncingCards, setIsSyncingCards] = useState(false);
  const [tagFilter, setTagFilter] = useState('');
  const [expandedConfig, setExpandedConfig] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [syncOnSave, setSyncOnSave] = useState(true);
  const i18n = window.Blinko.i18n;

  const ratingConfigManager = new RatingPluginConfiguration();

  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const result = await window.Blinko.api.tags.list.query();

      if (result && Array.isArray(result)) {
        const tags = result.map((t: { name: string }) => t.name);
        setAvailableTags(tags);
      }
    } catch (error) {
      // Silently fail
    }
    setIsLoadingTags(false);
  };

  useEffect(() => {
    fetchTags();

    window.Blinko.api.config.getPluginConfig
      .query({
        pluginName: 'blinko-rating-plugin',
      })
      .then((res: Record<string, string> | null | undefined) => {
        if (res?.ratings) {
          try {
            const pluginConfig = JSON.parse(res.ratings);
            setConfigs(pluginConfig.ratings || []);
          } catch (e) {
            // Silently fail
          }
        }
      });
  }, []);

  const handleSave = async () => {
    setIsSyncingCards(true);
    try {
      // Save plugin configuration
      const pluginConfig = { ratings: configs };
      await window.Blinko.api.config.setPluginConfig.mutate({
        pluginName: 'blinko-rating-plugin',
        key: 'ratings',
        value: JSON.stringify(pluginConfig)
      });

      window.dispatchEvent(new CustomEvent('blinko-rating-plugin-update'));

      // Sync cards if enabled
      if (syncOnSave) {
        await syncRatingConfigsToAllNotes(configs);
        window.Blinko.toast.success(i18n.t('ratings_settings.savedAndSynced'));
      } else {
        window.Blinko.toast.success(i18n.t('ratings_settings.settingsSaved'));
      }

      window.Blinko.closeDialog();
    } catch (error) {
      console.error('Save/sync error:', error);
      window.Blinko.toast.error(i18n.t('ratings_settings.failedToSave'));
    } finally {
      setIsSyncingCards(false);
    }
  };

  const handleAddRating = (name: string, type: RatingDisplayType, label?: string) => {
    const guid = ratingConfigManager.generateGuid(name);
    const newConfig: RatingConfig = {
      guid,
      name,
      type,
      enabled: true,
      mode: 'whitelist',
      tags: [],
      label
    };

    setConfigs([...configs, newConfig]);
    setShowAddDialog(false);
    window.Blinko.toast.success(i18n.t('ratings_settings.ratingAdded'));
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

  return (
    <div
      className="max-w-2xl mx-auto p-4 rounded-lg"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* List of Ratings */}
      {configs.length > 0 && (
        <div className="space-y-4 mb-6">
          {configs.map((config) => (
            <RatingSetting
              key={config.guid}
              config={config}
              availableTags={availableTags}
              tagFilter={tagFilter}
              setTagFilter={setTagFilter}
              isExpanded={expandedConfig === config.guid}
              onToggleExpand={() =>
                setExpandedConfig(expandedConfig === config.guid ? null : config.guid)
              }
              onUpdate={(updates) => handleUpdateConfig(config.guid, updates)}
              onDelete={() => handleDeleteRating(config.guid)}
              onToggleTag={(tag) => toggleTag(config.guid, tag)}
              onRefreshTags={fetchTags}
              isLoadingTags={isLoadingTags}
            />
          ))}
        </div>
      )}

      {/* Add New Rating Button/Dialog */}
      <AddRatingDialog
        show={showAddDialog}
        onAdd={handleAddRating}
        onCancel={() => setShowAddDialog(!showAddDialog)}
      />

      {/* Action Buttons */}
      <RatingSettingsActions
        isSyncing={isSyncingCards}
        syncOnSave={syncOnSave}
        onSave={handleSave}
        onCancel={() => window.Blinko.closeDialog()}
        onToggleSyncOnSave={() => setSyncOnSave(!syncOnSave)}
      />
    </div>
  );
}
