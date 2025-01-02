import { get } from "../utils/redisClient";

export async function cacheMainChat(req, res, next) {
  const cachedChat = await get("mainChat");
  if (cachedChat) {
    return res.status(200).json(JSON.parse(cachedChat));
  }
  next();
}
