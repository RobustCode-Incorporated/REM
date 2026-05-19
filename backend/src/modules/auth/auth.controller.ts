import { Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthController {

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const result = await AuthService.login(email, password)

      return res.json(result)

    } catch (err: any) {
      return res.status(401).json({
        error: err.message || 'Authentication failed',
      })
    }
  }
}