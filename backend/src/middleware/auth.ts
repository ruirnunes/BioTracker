// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

// Placeholder middleware for JWT authentication
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement JWT verification later
  next();
};