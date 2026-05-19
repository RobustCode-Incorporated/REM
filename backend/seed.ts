import { pool } from './src/db'

async function seed() {
  try {
    console.log('🌱 Seeding database...')

    // =====================
    // CUSTOMERS
    // =====================
    const customerRes = await pool.query(`
      INSERT INTO customers (name, email)
      VALUES 
      ('John Doe', 'john@test.com'),
      ('Alice Smith', 'alice@test.com')
      RETURNING *
    `)

    // =====================
    // PRODUCTS
    // =====================
    const productRes = await pool.query(`
      INSERT INTO products (name, price, stock)
      VALUES 
      ('Laptop', 1200, 10),
      ('Mouse', 25, 50),
      ('Keyboard', 45, 30)
      RETURNING *
    `)

    // =====================
    // SALES
    // =====================
    const saleRes = await pool.query(`
      INSERT INTO sales (customer_id, total)
      VALUES ($1, 1270)
      RETURNING *
    `, [customerRes.rows[0].id])

    console.log('✅ Seed completed')
    console.log({
      customers: customerRes.rows.length,
      products: productRes.rows.length,
      sales: saleRes.rows.length,
    })

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed error:', err)
    process.exit(1)
  }
}

seed()