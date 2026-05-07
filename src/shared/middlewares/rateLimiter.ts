import AppError from '../errors/appError';
import { createClient } from 'redis';
import { NextFunction, Response, Request } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

let limiter: RateLimiterRedis | null = null;

if (process.env.NODE_ENV !== 'test') {
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    ...(process.env.REDIS_PASS && { password: process.env.REDIS_PASS }),
  });

  redisClient.connect().catch(console.error);

  limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 5,
  });
}

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    await limiter!.consume(request.ip as string);
    return next();
  } catch {
    return next(new AppError('Too many requests.', 429));
  }
}
