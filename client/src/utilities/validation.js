import { interiorOptions, wheelOptions } from './calcPrice'

export const validateCarSelections = ({ name, model, exterior, wheels, interior }) => {
  if (!name?.trim() || !model?.trim()) {
    return 'Please provide a name and model for your custom car.'
  }

  if (exterior === 'Electric Blue' && wheels === '22" Performance') {
    return 'This exterior and wheel combination is not available.'
  }

  if (interior === 'Carbon Sport' && exterior === 'Pearl White') {
    return 'This interior and exterior combination is not available.'
  }

  return ''
}

export const getAdjustedSelections = (form) => {
  const nextForm = { ...form }
  let message = ''

  if (nextForm.exterior === 'Electric Blue' && nextForm.wheels === '22" Performance') {
    nextForm.wheels = wheelOptions.find((option) => option.label !== '22" Performance')?.label || nextForm.wheels
    message = '22" Performance wheels are not available with the Electric Blue exterior. We switched to the 18" Aero wheels.'
  }

  if (nextForm.exterior === 'Pearl White' && nextForm.interior === 'Carbon Sport') {
    nextForm.interior = interiorOptions.find((option) => option.label !== 'Carbon Sport')?.label || nextForm.interior
    message = 'Carbon Sport interior is unavailable with the Pearl White exterior. We switched to the Black Leather interior.'
  }

  return [nextForm, message]
}
