export interface UserData {
  id: string;
  nickname?: string;
  avatarUrl?: string;
}

interface BlinkoUser {
  id: number;
  name?: string;
  nickname?: string;
  image?: string;
}

// Internal cache (singleton)
let cachedUsers: Map<string, UserData> | null = null;
let loadPromise: Promise<Map<string, UserData>> | null = null;

/**
 * Gets all public users from Blinko (cached singleton)
 */
export async function getAllUsers(): Promise<Map<string, UserData>> {
  // Return cached data if available
  if (cachedUsers) return Promise.resolve(cachedUsers);

  // Return existing promise if already loading
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const users = new Map<string, UserData>();

    try {
      const api = (window.Blinko.api as any);
      if (!api.users?.publicUserList?.query) {
        console.warn('users.publicUserList API not available');
        return users;
      }

      const userList: BlinkoUser[] = await api.users.publicUserList.query();

      if (Array.isArray(userList)) {
        userList.forEach((user) => {
          const userId = user.id.toString();
          users.set(userId, {
            id: userId,
            nickname: user.nickname || user.name,
            avatarUrl: user.image
          });
        });
      }
    } catch (error) {
      console.error('Failed to load user cache:', error);
    }

    cachedUsers = users;
    return users;
  })();

  return loadPromise;
}
