import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { deleteCar, getCar } from '../services/CarsAPI'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCar = async () => {
      try {
        const data = await getCar(id)
        setCar(data)
      } catch (err) {
        setError('Unable to load this car.')
      }
    }

    loadCar()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteCar(id)
      navigate('/customcars')
    } catch (err) {
      setError('Unable to delete this car.')
    }
  }

  if (!car) {
    return (
      <main className='container'>
        <article>{error || 'Loading car details...'}</article>
      </main>
    )
  }

  return (
    <main className='container'>
      <article>
        <h2>{car.name}</h2>
        <p><strong>{car.make} {car.model}</strong></p>
        <p>Exterior: {car.exterior}</p>
        <p>Wheels: {car.wheels}</p>
        <p>Interior: {car.interior}</p>
        <p>Price: ${Number(car.price).toLocaleString()}</p>

        <div className='grid'>
          <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
          <button className='secondary' onClick={handleDelete}>Delete</button>
        </div>
      </article>
    </main>
  )
}

export default CarDetails