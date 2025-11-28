/** @jsxImportSource preact */
import { useState, useEffect, useMemo } from 'preact/hooks';
import { getAllUsers, type UserData } from '../helpers/getAllUsers';

/**
 * Hook to get user data with automatic cache loading
 * Returns user data and triggers re-render when cache loads
 */
export function useUserData(userId: string): UserData {
  const [allUsers, setAllUsers] = useState<Map<string, UserData>>(new Map());

  // Load all users
  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(new Map(users));
    });
  }, [userId]);

  // Memoize the user data lookup
  const userData = useMemo(() => {
    // Try to get from cache
    const cachedUser = allUsers.get(userId);
    if (cachedUser) {
      return cachedUser;
    }

    // Check if it's the current user
    const userStore = (window.Blinko.store as any).userStore;
    const currentUserId = userStore?.id?.toString();

    if (userId === currentUserId) {
      return {
        id: userId,
        nickname: userStore.nickname || userStore.name,
        avatarUrl: userStore.image
      };
    }

    // Return fallback
    return { id: userId };
  }, [userId, allUsers]);

  return userData;
}
