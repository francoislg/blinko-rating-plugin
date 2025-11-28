/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { useUserData } from '../hooks/useUserData';

interface UserAvatarProps {
  userId: string;
  size?: number;
  isCurrentUser?: boolean;
}

export function UserAvatar({ userId, size = 24, isCurrentUser = false }: UserAvatarProps): JSXInternal.Element {
  const userData = useUserData(userId);
  const [imageError, setImageError] = useState(false);

  const initials = userId.substring(0, 2).toUpperCase();

  if (userData.avatarUrl && !imageError) {
    return (
      <div
        className="rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size * 0.4}px`
        }}
      >
        <img
          src={userData.avatarUrl}
          alt={userData.nickname || `User ${userId}`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`
      }}
    >
      {initials}
    </div>
  );
}
