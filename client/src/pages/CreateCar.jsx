import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { createCar } from '../services/CarsAPI'
import { calculateCarPrice, exteriorOptions, getCarPreviewStyle, interiorOptions, wheelOptions, exteriorColors, interiorColors, wheelStyles } from '../utilities/calcPrice'
import { getAdjustedSelections, validateCarSelections } from '../utilities/validation'

const CreateCar = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    make: 'Tesla',
    model: 'Model 3',
    exterior: exteriorOptions[0].label,
    wheels: wheelOptions[0].label,
    interior: interiorOptions[0].label,
    price: calculateCarPrice({ exterior: exteriorOptions[0].label, wheels: wheelOptions[0].label, interior: interiorOptions[0].label })
  })
  const [error, setError] = useState('')

  const calculatePrice = (nextForm) => calculateCarPrice({ exterior: nextForm.exterior, wheels: nextForm.wheels, interior: nextForm.interior })

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextForm = { ...form, [name]: value }
    const [adjustedForm, compatibilityMessage] = getAdjustedSelections(nextForm)
    setForm({ ...adjustedForm, price: calculatePrice(adjustedForm) })
    setError(compatibilityMessage || '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateCarSelections(form)
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await createCar(form)
      navigate('/customcars')
    } catch (err) {
      setError('Unable to save your custom car right now.')
    }
  }

  return (
    <main className='container'>
      <article>
        <h2>Create a Custom Car</h2>
        <div style={{ ...getCarPreviewStyle({ exterior: form.exterior, interior: form.interior }), padding: '1.25rem', marginBottom: '1rem', color: 'white' }}>
          <h3 style={{ color: 'white' }}>{form.name || 'Your Custom Build'}</h3>
          <p style={{ marginBottom: '0.25rem' }}>{form.make} {form.model}</p>
          <p style={{ marginBottom: '0.25rem' }}>Exterior: {form.exterior}</p>
          <p style={{ marginBottom: '0.25rem' }}>Wheels: {form.wheels}</p>
          <p>Interior: {form.interior}</p>

          <div className='car-preview'>
            <div className='car-body' style={{ background: exteriorColors[form.exterior] || '#4b5563' }} />

            <div className='car-wheels'>
              <div className='wheel' style={{ background: wheelStyles[form.wheels] || '#111' }} />
              <div className='wheel' style={{ background: wheelStyles[form.wheels] || '#111' }} />
            </div>

            <div className='interior-panel' style={{ background: interiorColors[form.interior] || '#111' }} />
          </div>
        </div>
        {error && <p style={{ color: error.includes('not available') ? 'goldenrod' : 'crimson' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Car Name
            <input name='name' value={form.name} onChange={handleChange} placeholder='My Dream Build' />
          </label>

          <div className='grid'>
            <label>
              Make
              <input name='make' value={form.make} onChange={handleChange} />
            </label>
            <label>
              Model
              <input name='model' value={form.model} onChange={handleChange} />
            </label>
          </div>

          <label>
            Exterior Color
            <select name='exterior' value={form.exterior} onChange={handleChange}>
              {exteriorOptions.map((option) => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            Wheels
            <select name='wheels' value={form.wheels} onChange={handleChange}>
              {wheelOptions.map((option) => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            Interior
            <select name='interior' value={form.interior} onChange={handleChange}>
              {interiorOptions.map((option) => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
          </label>

          <p><strong>Estimated Price:</strong> ${form.price.toLocaleString()}</p>

          <button type='submit'>Save Car</button>
        </form>
      </article>
    </main>
  )
}

export default CreateCar