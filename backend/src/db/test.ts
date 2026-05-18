import { db } from './index'

export async function testConnection() {
  const result = await db.query('SELECT NOW()')
  console.log('DB CONNECTED:', result.rows[0])
}