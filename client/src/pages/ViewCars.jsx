import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { deleteCar, getAllCars } from '../services/CarsAPI'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')

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
    const shouldDelete = window.confirm('Delete this custom car? This action cannot be undone.')
    if (!shouldDelete) return

    try {
      await deleteCar(id)
      await loadCars()
    } catch (err) {
      setError('Unable to delete this car.')
    }
  }

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const visibleCars = normalizedQuery
      ? cars.filter((car) => {
          const blob = [car.name, car.make, car.model, car.exterior, car.wheels, car.interior].join(' ').toLowerCase()
          return blob.includes(normalizedQuery)
        })
      : [...cars]

    return visibleCars.sort((a, b) => {
      if (sortBy === 'price-high') return Number(b.price) - Number(a.price)
      if (sortBy === 'price-low') return Number(a.price) - Number(b.price)
      if (sortBy === 'name') return String(a.name).localeCompare(String(b.name))
      return Number(b.id) - Number(a.id)
    })
  }, [cars, query, sortBy])

  const averagePrice = useMemo(() => {
    if (!cars.length) return 0
    const total = cars.reduce((sum, car) => sum + Number(car.price || 0), 0)
    return total / cars.length
  }, [cars])

  const highestPrice = useMemo(() => {
    if (!cars.length) return 0
    return Math.max(...cars.map((car) => Number(car.price || 0)))
  }, [cars])

  return (
    <main className='garage-page'>
      <section className='garage-hero'>
        <div>
          <p className='garage-eyebrow'>Saved Builds</p>
          <h2>Your Custom Garage</h2>
          <p className='garage-subtitle'>Browse, compare, and manage every build in one place.</p>
        </div>
        <div className='garage-stats'>
          <article className='garage-stat'>
            <span>Total Builds</span>
            <strong>{cars.length}</strong>
          </article>
          <article className='garage-stat'>
            <span>Average Price</span>
            <strong>${Math.round(averagePrice).toLocaleString()}</strong>
          </article>
          <article className='garage-stat'>
            <span>Highest Price</span>
            <strong>${highestPrice.toLocaleString()}</strong>
          </article>
        </div>
      </section>

      <section className='garage-toolbar'>
        <input
          className='garage-search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search by name, model, color, or interior'
          aria-label='Search saved cars'
        />
        <select className='garage-sort' value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label='Sort saved cars'>
          <option value='latest'>Latest</option>
          <option value='price-high'>Price: High to Low</option>
          <option value='price-low'>Price: Low to High</option>
          <option value='name'>Name: A to Z</option>
        </select>
      </section>

      <section className='garage-grid'>
        {error && <p className='garage-error'>{error}</p>}

        {cars.length === 0 ? (
          <article className='garage-empty'>
            <h3>No cars saved yet</h3>
            <p>Create your first custom car from the Customize page.</p>
            <Link to='/' className='btn'>Start Customizing</Link>
          </article>
        ) : filteredCars.length === 0 ? (
          <article className='garage-empty'>
            <h3>No matching results</h3>
            <p>Try a different search term or reset filters.</p>
            <button type='button' className='btn secondary' onClick={() => setQuery('')}>Clear Search</button>
          </article>
        ) : (
          filteredCars.map((car) => (
            <article className='garage-card' key={car.id}>
              <header className='garage-card-head'>
                <div>
                  <h3>{car.name}</h3>
                  <p>{car.make} {car.model}</p>
                </div>
                <div className='garage-price'>${Number(car.price).toLocaleString()}</div>
              </header>

              <div className='garage-specs'>
                <span><strong>Exterior</strong> {car.exterior}</span>
                <span><strong>Wheels</strong> {car.wheels}</span>
                <span><strong>Interior</strong> {car.interior}</span>
                <span><strong>Roof</strong> {car.roof || 'Fixed Roof'}</span>
              </div>

              <footer className='garage-actions'>
                <Link to={`/customcars/${car.id}`} className='btn'>Details</Link>
                <Link to={`/edit/${car.id}`} className='btn secondary'>Edit</Link>
                <button type='button' className='btn danger' onClick={() => handleDelete(car.id)}>Delete</button>
              </footer>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default ViewCars