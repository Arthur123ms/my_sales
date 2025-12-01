import { verify } from 'jsonwebtoken';
import AppError from '../errors/appError';
import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [ , token] = authHeader.split(' ');


    if (!token) {
      throw new AppError("JWT token is missing", 401);
    }

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);

      const { sub } = decodedToken as ITokenPayload;

      request.user = {
        id: sub
      }

      return next();
    } catch (error) {
      throw new AppError('Invalid JWT Token', 401);
    }
  }
}
