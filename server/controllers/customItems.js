import { pool } from '../config/database.js'

export const getCustomItems = async () => {
  const result = await pool.query(
    'SELECT * FROM custom_items ORDER BY id ASC'
  )
  return result.rows
}

export const getCustomItemById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM custom_items WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

export const createCustomItem = async (item) => {
  const { name, make, model, exterior, wheels, interior, roof, convertible, price } = item

  const result = await pool.query(
    `INSERT INTO custom_items (name, make, model, exterior, wheels, interior, roof, convertible, price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [name, make, model, exterior, wheels, interior, roof, convertible || false, price]
  )

  return result.rows[0]
}

export const updateCustomItem = async (id, item) => {
  const { name, make, model, exterior, wheels, interior, roof, convertible, price } = item

  const result = await pool.query(
    `UPDATE custom_items
     SET name = $1, make = $2, model = $3, exterior = $4, wheels = $5, interior = $6, roof = $7, convertible = $8, price = $9
     WHERE id = $10
     RETURNING *`,
    [name, make, model, exterior, wheels, interior, roof, convertible || false, price, id]
  )

  return result.rows[0]
}

export const deleteCustomItem = async (id) => {
  const result = await pool.query(
    'DELETE FROM custom_items WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}
