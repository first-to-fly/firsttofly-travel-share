export function genEntityAuthRedisCacheKey(oid: string): string {
  return `auth:entity:${oid}`;
}

export function genCollaborationAuthRedisCacheKey(userId: string, oid: string): string {
  return `auth:collaboration:${userId}:${oid}`;
}
