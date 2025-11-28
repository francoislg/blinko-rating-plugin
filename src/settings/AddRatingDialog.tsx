/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import type { RatingDisplayType } from '../types';

export interface AddRatingDialogProps {
  show: boolean;
  onAdd: (name: string, type: RatingDisplayType, label?: string) => void;
  onCancel: () => void;
}

export function AddRatingDialog({ show, onAdd, onCancel }: AddRatingDialogProps): JSXInternal.Element | null {
  const [name, setName] = useState('');
  const [type, setType] = useState<RatingDisplayType>('stars');
  const [label, setLabel] = useState('');
  const i18n = window.Blinko.i18n;

  const handleAdd = () => {
    if (!name.trim()) {
      window.Blinko.toast.error(i18n.t('ratings_settings.nameRequired'));
      return;
    }

    onAdd(name.trim(), type, label.trim() || undefined);

    // Reset form
    setName('');
    setType('stars');
    setLabel('');
  };

  const handleCancel = () => {
    setName('');
    setType('stars');
    setLabel('');
    onCancel();
  };

  if (!show) {
    return (
      <button
        onClick={() => onCancel()}
        className="w-full py-3 border-2 border-dashed rounded-md text-sm font-medium text-desc hover:bg-secondary/50 transition-colors cursor-pointer"
      >
        + {i18n.t('ratings_settings.addNewRating')}
      </button>
    );
  }

  return (
    <div className="border-2 border-blue-500 rounded-md p-4">
      <h3 className="font-semibold mb-3">{i18n.t('ratings_settings.addNewRating')}</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          {i18n.t('ratings_settings.ratingName')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder={i18n.t('ratings_settings.ratingNamePlaceholder')}
          className="w-full px-3 py-2 border rounded-md text-sm"
          autoFocus
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          {i18n.t('ratings_settings.ratingLabel')}
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel((e.target as HTMLInputElement).value)}
          placeholder={i18n.t('ratings_settings.ratingLabelPlaceholder')}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {i18n.t('ratings_settings.ratingType')}
        </label>
        <select
          value={type}
          onChange={(e) => setType((e.target as HTMLSelectElement).value as RatingDisplayType)}
          className="w-full px-3 py-2 border rounded-md text-sm cursor-pointer"
        >
          <option value="stars">⭐ {i18n.t('ratings_settings.typeStars')}</option>
          <option value="upvotes">👍 {i18n.t('ratings_settings.typeUpvotes')}</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 cursor-pointer"
        >
          {i18n.t('ratings_settings.add')}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer"
        >
          {i18n.t('ratings_settings.cancel')}
        </button>
      </div>
    </div>
  );
}
