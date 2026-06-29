import { pool } from './database.js'

export const resetDatabase = async () => {
  const client = await pool.connect()

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        exterior VARCHAR(100) NOT NULL,
        roof VARCHAR(100) DEFAULT 'Fixed Roof',
        wheels VARCHAR(100) NOT NULL,
        interior VARCHAR(100) NOT NULL,
        convertible BOOLEAN DEFAULT false,
        price INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('Database tables are ready')
    // Seed sample data if table is empty
    const { rows } = await client.query('SELECT COUNT(*) FROM custom_items')
    const count = Number(rows[0].count)
    if (count === 0) {
      const sample = [
        { name: 'Night Runner', make: 'Corvette', model: 'C8', exterior: 'Midnight Silver', roof: 'Fixed Roof', wheels: '22" Performance', interior: 'Black Leather', convertible: false, price: 65000 },
        { name: 'Sun Chaser', make: 'Porsche', model: '911', exterior: 'Pearl White', wheels: '20" Sport', interior: 'Tan Premium', price: 120000 },
        { name: 'Blue Flash', make: 'Nissan', model: 'GTR', exterior: 'Electric Blue', wheels: '22" Performance', interior: 'Carbon Sport', price: 98000 },
        { name: 'City Cruiser', make: 'Mini', model: 'Cooper S', exterior: 'Midnight Silver', wheels: '18" Aero', interior: 'Black Leather', price: 32000 },
        { name: 'Road King', make: 'Ford', model: 'Mustang GT', exterior: 'Pearl White', wheels: '20" Sport', interior: 'Tan Premium', price: 45000 },
        { name: 'Storm Shadow', make: 'Lamborghini', model: 'Huracan', exterior: 'Electric Blue', wheels: '22" Performance', interior: 'Carbon Sport', price: 240000 },
        { name: 'Silver Bolt', make: 'Tesla', model: 'Model S', exterior: 'Midnight Silver', wheels: '22" Performance', interior: 'Black Leather', price: 90000 },
        { name: 'Comet', make: 'Audi', model: 'R8', exterior: 'Pearl White', wheels: '20" Sport', interior: 'Tan Premium', price: 170000 },
        { name: 'Midnight GT', make: 'BMW', model: 'M4', exterior: 'Midnight Silver', wheels: '20" Sport', interior: 'Carbon Sport', price: 76000 },
        { name: 'Desert Rogue', make: 'Jeep', model: 'Wrangler', exterior: 'Pearl White', wheels: '18" Aero', interior: 'Black Leather', price: 38000 },
        { name: 'Red Comet', make: 'Ferrari', model: '488', exterior: 'Electric Blue', wheels: '22" Performance', interior: 'Tan Premium', price: 280000 },
        { name: 'Urban Sport', make: 'Honda', model: 'Civic Type R', exterior: 'Midnight Silver', wheels: '20" Sport', interior: 'Black Leather', price: 38000 },
        { name: 'Gran Tour', make: 'Toyota', model: 'Supra', exterior: 'Pearl White', wheels: '20" Sport', interior: 'Carbon Sport', price: 52000 },
        { name: 'Future Shock', make: 'McLaren', model: '570S', exterior: 'Electric Blue', wheels: '22" Performance', interior: 'Black Leather', price: 200000 },
        { name: 'Family Run', make: 'Subaru', model: 'Outback', exterior: 'Midnight Silver', wheels: '18" Aero', interior: 'Tan Premium', price: 36000 },
        { name: 'Track Day', make: 'Toyota', model: 'GR86', exterior: 'Electric Blue', wheels: '20" Sport', interior: 'Carbon Sport', price: 35000 },
        { name: 'Classic', make: 'Ford', model: 'GT40', exterior: 'Pearl White', wheels: '20" Sport', interior: 'Black Leather', price: 150000 },
        { name: 'Voyager', make: 'Mercedes', model: 'AMG GT', exterior: 'Midnight Silver', wheels: '22" Performance', interior: 'Tan Premium', price: 130000 },
        { name: 'Bolt Lite', make: 'Tesla', model: 'Model 3', exterior: 'Electric Blue', wheels: '18" Aero', interior: 'Black Leather', price: 48000 },
        { name: 'Pocket Rocket', make: 'Fiat', model: '500 Abarth', exterior: 'Pearl White', wheels: '18" Aero', interior: 'Black Leather', price: 26000 }
      ]

      for (const item of sample) {
        await client.query(
          `INSERT INTO custom_items (name, make, model, exterior, roof, wheels, interior, convertible, price)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [item.name, item.make, item.model, item.exterior, item.roof || 'Fixed Roof', item.wheels, item.interior, item.convertible || false, item.price]
        )
      }

      console.log('Inserted sample custom items')
    }
    // Append 20 additional sample records (unique names) to ensure more examples
    const extra = 20
    const pool = [
      { name: 'Extra Flash', make: 'Lotus', model: 'Evora', exterior: 'Midnight Silver', roof: 'Fixed Roof', wheels: '20" Sport', interior: 'Black Leather', convertible: false, price: 95000 },
      { name: 'Sunset', make: 'Alfa Romeo', model: 'Giulia', exterior: 'Pearl White', roof: 'Fixed Roof', wheels: '20" Sport', interior: 'Tan Premium', convertible: false, price: 68000 },
      { name: 'Apex', make: 'Kia', model: 'Stinger', exterior: 'Electric Blue', roof: 'Fixed Roof', wheels: '20" Sport', interior: 'Black Leather', convertible: false, price: 45000 },
      { name: 'Swift', make: 'Hyundai', model: 'Veloster', exterior: 'Midnight Silver', roof: 'Fixed Roof', wheels: '18" Aero', interior: 'Black Leather', convertible: false, price: 28000 },
      { name: 'Glide', make: 'Volkswagen', model: 'Golf R', exterior: 'Pearl White', roof: 'Fixed Roof', wheels: '20" Sport', interior: 'Tan Premium', convertible: false, price: 43000 }
    ]

    for (let i = 0; i < extra; i++) {
      const base = pool[i % pool.length]
      const uniqueName = `${base.name} ${Date.now() % 100000}-${i}`
      await client.query(
        `INSERT INTO custom_items (name, make, model, exterior, roof, wheels, interior, convertible, price)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [uniqueName, base.make, base.model, base.exterior, base.roof || 'Fixed Roof', base.wheels, base.interior, base.convertible || false, base.price]
      )
    }
    console.log(`Inserted ${extra} extra sample items`)
  } catch (error) {
    console.error('Error creating database tables:', error)
    throw error
  } finally {
    client.release()
  }
}

if (process.argv[1] && process.argv[1].endsWith('reset.js')) {
  resetDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
