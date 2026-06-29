import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { deleteCar, getAllCars } from '../services/CarsAPI'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')

  const loadCars = async () => {
    try {
      const data = await getAllCars()
      setCars(data)
    } catch (err) {
      setError('Unable to load saved cars.')
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)
      await loadCars()
    } catch (err) {
      setError('Unable to delete this car.')
    }
  }

  return (
    <main>
      <div className='hero'>
        <div style={{ flex: 1 }} />
        <div className='price-badge'>💰 ${cars[0] ? Number(cars[0].price).toLocaleString() : '0'}</div>
      </div>

      <section className='cards-grid'>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        {cars.length === 0 ? (
          <article className='car-card'>
            <div className='details'>
              <h3>No cars yet</h3>
              <p>Create your first custom car using the Customize button.</p>
            </div>
          </article>
        ) : (
          cars.map((car) => (
            <article className='car-card' key={car.id}>
              <div className='details'>
                <h3>{car.name}</h3>
                <p><strong>{car.make} {car.model}</strong></p>
                <p>Exterior: {car.exterior}</p>
                <p>Wheels: {car.wheels}</p>
                <p>Interior: {car.interior}</p>
              </div>

              <div className='actions'>
                <div className='price'>💰 ${Number(car.price).toLocaleString()}</div>
                <div style={{ marginTop: '10px' }}>
                  <Link to={`/customcars/${car.id}`} className='btn'>DETAILS</Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default ViewCars