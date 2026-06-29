import React, { useRef, useState } from 'react'
import '../App.css'

const CustomizerWizard = ({ form, setForm, exteriorOptions, wheelOptions, interiorOptions, roofOptions, wheelSvgs, interiorThumbnails, exteriorColors, roofStyles, calculatePrice, onDone }) => {
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const formRef = useRef(form)
  formRef.current = form
  const steps = ['Convertible', 'Exterior', 'Roof', 'Wheels', 'Interior', 'Summary']

  const validateStep = (currentForm) => {
    if (step === 1 && !currentForm.exterior) return 'Must pick a color.'
    if (step === 2 && !currentForm.roof) return 'Must pick a roof option.'
    if (step === 3 && !currentForm.wheels) return 'Must pick wheels.'
    if (step === 4 && !currentForm.interior) return 'Must pick an interior.'
    return ''
  }

  const next = () => {
    const nextMessage = validateStep(formRef.current)
    if (nextMessage) {
      setMessage(nextMessage)
      return
    }
    setMessage('')
    if (step < steps.length - 1) setStep(step + 1)
  }

  const back = () => {
    setMessage('')
    if (step > 0) setStep(step - 1)
  }

  const toggleConvertible = () => {
    const nextForm = { ...formRef.current, convertible: !formRef.current.convertible }
    formRef.current = nextForm
    setForm(nextForm)
  }

  const pickExterior = (label) => {
    const nextForm = { ...formRef.current, exterior: label }
    nextForm.price = calculatePrice(nextForm)
    formRef.current = nextForm
    setForm(nextForm)
    setMessage('')
  }

  const pickRoof = (label) => {
    const nextForm = { ...formRef.current, roof: label }
    nextForm.price = calculatePrice(nextForm)
    formRef.current = nextForm
    setForm(nextForm)
    setMessage('')
  }

  const pickWheels = (label) => {
    const nextForm = { ...formRef.current, wheels: label }
    nextForm.price = calculatePrice(nextForm)
    formRef.current = nextForm
    setForm(nextForm)
    setMessage('')
  }

  const pickInterior = (label) => {
    const nextForm = { ...formRef.current, interior: label }
    nextForm.price = calculatePrice(nextForm)
    formRef.current = nextForm
    setForm(nextForm)
    setMessage('')
  }

  return (
    <section className='wizard'>
      <div className='wizard-steps'>
        {steps.map((s, i) => (
          <button type='button' key={s} className={`wizard-step ${i === step ? 'active' : ''}`} onClick={() => setStep(i)}>{s}</button>
        ))}
      </div>

      <div className='wizard-panel'>
        {message && <p className='wizard-message'>{message}</p>}

        {step === 0 && (
          <div className='wizard-content'>
            <label className='convertible-label'>
              <input type='checkbox' checked={!!form.convertible} onChange={toggleConvertible} /> Convertible
            </label>
            <div className='wizard-actions'>
              <button type='button' onClick={next} className='btn primary'>Next</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className='wizard-content grid-swatches'>
            {exteriorOptions.map(o => (
              <button key={o.label} type='button' className={`swatch ${form.exterior === o.label ? 'selected' : ''}`} onClick={() => pickExterior(o.label)} style={{ background: exteriorColors[o.label] }} title={`${o.label} (+$${o.price})`}>
                <span className='swatch-label'>{o.label}</span>
                <span className='swatch-price'>{o.price === 0 ? 'Free' : `+$${o.price.toLocaleString()}`}</span>
              </button>
            ))}
            <div className='wizard-actions'>
              <button type='button' onClick={back} className='btn'>Back</button>
              <button type='button' onClick={next} className='btn primary'>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='wizard-content grid-swatches'>
            {roofOptions.map(o => (
              <button key={o.label} className={`swatch roof ${form.roof === o.label ? 'selected' : ''}`} onClick={() => pickRoof(o.label)} style={{ background: roofStyles[o.label] }} title={`${o.label} (+$${o.price})`}>
                <span className='swatch-label'>{o.label}</span>
              </button>
            ))}
            <div className='wizard-actions'>
              <button type='button' onClick={back} className='btn'>Back</button>
              <button type='button' onClick={next} className='btn primary'>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='wizard-content grid-thumbs'>
            {wheelOptions.map(o => (
              <button key={o.label} className={`thumb ${form.wheels === o.label ? 'selected' : ''}`} onClick={() => pickWheels(o.label)}>
                <img src={wheelSvgs[o.label]} alt={o.label} />
                <div className='thumb-label'>{o.label}</div>
              </button>
            ))}
            <div className='wizard-actions'>
              <button type='button' onClick={back} className='btn'>Back</button>
              <button type='button' onClick={next} className='btn primary'>Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className='wizard-content grid-thumbs'>
            {interiorOptions.map(o => (
              <button key={o.label} className={`thumb ${form.interior === o.label ? 'selected' : ''}`} onClick={() => pickInterior(o.label)}>
                <img src={interiorThumbnails[o.label]} alt={o.label} />
                <div className='thumb-label'>{o.label}</div>
              </button>
            ))}
            <div className='wizard-actions'>
              <button type='button' onClick={back} className='btn'>Back</button>
              <button type='button' onClick={next} className='btn primary'>Next</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className='wizard-content summary'>
            <h3>Summary</h3>
            <p><strong>Name:</strong> {form.name || 'Your Custom Build'}</p>
            <p><strong>Convertible:</strong> {form.convertible ? 'Yes' : 'No'}</p>
            <p><strong>Exterior:</strong> {form.exterior}</p>
            <p><strong>Roof:</strong> {form.roof}</p>
            <p><strong>Wheels:</strong> {form.wheels}</p>
            <p><strong>Interior:</strong> {form.interior}</p>
            <p><strong>Estimated Price:</strong> ${Number(form.price).toLocaleString()}</p>
            <div className='wizard-actions'>
              <button type='button' onClick={back} className='btn'>Back</button>
              <button type='button' onClick={() => onDone()} className='btn primary'>Done</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CustomizerWizard
