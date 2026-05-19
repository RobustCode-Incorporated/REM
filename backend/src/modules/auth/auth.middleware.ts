import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in environment variables')
}

/**
 * Types utilisateur injecté dans req
 */
export interface AuthUser {
  userId: string
  role: 'admin' | 'user'
  iat?: number
  exp?: number
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

/**
 * Middleware JWT strict
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string)

    req.user = decoded as AuthUser

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}