/** @jsxImportSource preact */
import type { JSXInternal } from 'preact/src/jsx';

export interface ModeToggleProps {
  mode: 'whitelist' | 'blacklist';
  onModeChange: (mode: 'whitelist' | 'blacklist') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps): JSXInternal.Element {
  const i18n = window.Blinko.i18n;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        {i18n.t('ratings_settings.filterMode')}
      </label>
      <div className="flex gap-0 border rounded-md overflow-hidden">
        <button
          onClick={() => onModeChange('whitelist')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            mode === 'whitelist'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {i18n.t('ratings_settings.whitelist')}
        </button>
        <button
          onClick={() => onModeChange('blacklist')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            mode === 'blacklist'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {i18n.t('ratings_settings.blacklist')}
        </button>
      </div>
      <p className="text-xs text-desc mt-2">
        <strong>
          {mode === 'whitelist'
            ? i18n.t('ratings_settings.whitelistLabel')
            : i18n.t('ratings_settings.blacklistLabel')}
        </strong>{' '}
        {mode === 'whitelist'
          ? i18n.t('ratings_settings.whitelistText')
          : i18n.t('ratings_settings.blacklistText')}
      </p>
    </div>
  );
}
