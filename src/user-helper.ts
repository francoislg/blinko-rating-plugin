interface UserData {
  id: string;
  nickname?: string;
  avatarUrl?: string;
}

export function getUserData(userId: string): UserData {
  const userStore = (window.Blinko.store as any).userStore;
  const currentUserId = userStore?.id?.toString();

  if (userId === currentUserId) {
    return {
      id: userId,
      nickname: userStore.nickname || userStore.name,
      avatarUrl: userStore.image
    };
  }

  return { id: userId };
}
