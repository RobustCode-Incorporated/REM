import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../../db'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export class AuthService {

  static async login(email: string, password: string) {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    const user = userResult.rows[0]
    if (!user) throw new Error('Invalid credentials')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid credentials')

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    }
  }
}