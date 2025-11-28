/** @jsxImportSource preact */
import type { JSXInternal } from 'preact/src/jsx';

export interface RatingSettingsActionsProps {
  isSyncing: boolean;
  syncOnSave: boolean;
  onSave: () => void;
  onCancel: () => void;
  onToggleSyncOnSave: () => void;
}

export function RatingSettingsActions({
  isSyncing,
  syncOnSave,
  onSave,
  onCancel,
  onToggleSyncOnSave
}: RatingSettingsActionsProps): JSXInternal.Element {
  const i18n = window.Blinko.i18n;

  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={isSyncing}
          className={`flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium transition-all ${
            isSyncing ? 'opacity-50 cursor-wait' : 'hover:opacity-90 cursor-pointer'
          }`}
        >
          {isSyncing
            ? i18n.t('ratings_settings.syncing')
            : syncOnSave
            ? i18n.t('ratings_settings.saveAndSync')
            : i18n.t('ratings_settings.saveSettings')}
        </button>
        <button
          onClick={onCancel}
          disabled={isSyncing}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer"
        >
          {i18n.t('ratings_settings.cancel')}
        </button>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={!syncOnSave}
          onChange={onToggleSyncOnSave}
          className="w-4 h-4 cursor-pointer"
        />
        <span className="text-sm">
          {i18n.t('ratings_settings.doNotSyncOnSave')}
        </span>
      </label>
    </div>
  );
}
