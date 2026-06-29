import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { getCar, updateCar } from '../services/CarsAPI'
import { calculateCarPrice, exteriorOptions, getCarPreviewStyle, interiorOptions, wheelOptions, exteriorColors, interiorColors, wheelStyles, wheelSvgs, interiorThumbnails, roofOptions, roofStyles } from '../utilities/calcPrice'
import CustomizerWizard from '../components/CustomizerWizard'
import CarPreview3D from '../components/CarPreview3D'
import { getAdjustedSelections, validateCarSelections } from '../utilities/validation'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [previewTilt, setPreviewTilt] = useState({ x: 0, y: 0 })
  const [form, setForm] = useState(() => {
    try {
      const defaultRoof = roofOptions ? roofOptions[0].label : 'Fixed Roof'
      const defaultWheels = wheelOptions[0]?.label || ''
      const defaultInterior = interiorOptions[0]?.label || ''
      const price = calculateCarPrice({ exterior: '', wheels: defaultWheels, interior: defaultInterior, roof: defaultRoof })
      return {
        name: '',
        make: '',
        model: '',
        convertible: false,
        roof: defaultRoof,
        exterior: '',
        wheels: defaultWheels,
        interior: defaultInterior,
        price
      }
    } catch (e) {
      console.error('Error initializing EditCar form:', e)
      return { name: '', make: '', model: '', convertible: false, roof: 'Fixed Roof', exterior: '', wheels: '', interior: '', price: 0 }
    }
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCar = async () => {
      try {
        const car = await getCar(id)
        const normalized = { ...car }
        if (normalized.roof === undefined) normalized.roof = roofOptions ? roofOptions[0].label : 'Fixed Roof'
        if (normalized.convertible === undefined) normalized.convertible = false
        setForm({ ...normalized, price: Number(car.price) })
      } catch (err) {
        setError('Unable to load car details.')
      }
    }

    loadCar()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextForm = { ...form, [name]: value }
    const [adjustedForm, compatibilityMessage] = getAdjustedSelections(nextForm)
    setForm({ ...adjustedForm, price: calculateCarPrice(adjustedForm) })
    setError(compatibilityMessage || '')
  }

  const handleSubmit = async (event) => {
    if (event && typeof event.preventDefault === 'function') event.preventDefault()

    const validationError = validateCarSelections(form)
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await updateCar(id, form)
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError('Unable to update this car right now.')
    }
  }

  const handlePreviewMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 14
    const rotateX = (0.5 - py) * 12
    setPreviewTilt({ x: rotateX, y: rotateY })
  }

  const resetPreviewTilt = () => {
    setPreviewTilt({ x: 0, y: 0 })
  }

  return (
    <main className='container'>
      <article>
        <h2>Edit Custom Car</h2>
        <div style={{ ...getCarPreviewStyle({ exterior: form.exterior, interior: form.interior }), padding: '1.25rem', marginBottom: '1rem', color: 'white' }}>
          <h3 style={{ color: 'white' }}>{form.name || 'Your Custom Build'}</h3>
          <p style={{ marginBottom: '0.25rem' }}>{form.make} {form.model}</p>
          <p style={{ marginBottom: '0.25rem' }}>Exterior: {form.exterior}</p>
          <p style={{ marginBottom: '0.25rem' }}>Wheels: {form.wheels}</p>
          <p>Interior: {form.interior}</p>

          <div className='car-preview-shell' onMouseMove={handlePreviewMove} onMouseLeave={resetPreviewTilt}>
            <div
              className='car-preview'
              style={{
                transform: `rotateX(${previewTilt.x}deg) rotateY(${previewTilt.y}deg) translateZ(0)`,
                '--tilt-x': `${previewTilt.x}deg`,
                '--tilt-y': `${previewTilt.y}deg`
              }}
            >
              <CarPreview3D
                exteriorColor={exteriorColors[form.exterior] || '#4b5563'}
                interiorColor={interiorColors[form.interior] || '#111827'}
              />
            </div>
          </div>
        </div>
        {error && <p style={{ color: error.includes('not available') ? 'goldenrod' : 'crimson' }}>{error}</p>}
        <label>
          Car Name
          <input name='name' value={form.name} onChange={handleChange} />
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

        <CustomizerWizard
          form={form}
          setForm={setForm}
          exteriorOptions={exteriorOptions}
          wheelOptions={wheelOptions}
          interiorOptions={interiorOptions}
          roofOptions={roofOptions}
          wheelSvgs={wheelSvgs}
          interiorThumbnails={interiorThumbnails}
          exteriorColors={exteriorColors}
          roofStyles={roofStyles}
          calculatePrice={(nextForm) => calculateCarPrice(nextForm)}
          onDone={handleSubmit}
        />
      </article>
    </main>
  )
}

export default EditCar