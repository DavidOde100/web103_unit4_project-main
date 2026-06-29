export const basePrice = 45000

export const exteriorOptions = [
  { label: 'Midnight Silver', price: 0 },
  { label: 'Pearl White', price: 800 },
  { label: 'Electric Blue', price: 1200 },
  { label: 'Raven Black', price: 500 },
  { label: 'Sunset Orange', price: 1100 },
  { label: 'Forest Green', price: 1000 },
  { label: 'Arctic Silver', price: 700 },
  { label: 'Crimson Red', price: 1300 }
]

export const wheelOptions = [
  { label: '18" Aero', price: 0 },
  { label: '19" Classic', price: 600 },
  { label: '20" Sport', price: 1500 },
  { label: '21" Turbine', price: 2200 },
  { label: '22" Performance', price: 2800 },
  { label: '22" Star', price: 3200 }
]

export const interiorOptions = [
  { label: 'Black Leather', price: 0 },
  { label: 'Tan Premium', price: 900 },
  { label: 'Carbon Sport', price: 1400 },
  { label: 'White Vegan', price: 1200 },
  { label: 'Sport Alcantara', price: 1600 },
  { label: 'Luxury Wood', price: 2000 }
]

export const exteriorColors = {
  'Midnight Silver': '#6b7280',
  'Pearl White': '#f6efe4',
  'Electric Blue': '#2563eb',
  'Raven Black': '#0f1724',
  'Sunset Orange': '#ff6a3d',
  'Forest Green': '#14532d',
  'Arctic Silver': '#c7d2da',
  'Crimson Red': '#b91c1c'
}

export const interiorColors = {
  'Black Leather': '#111827',
  'Tan Premium': '#c79c6b',
  'Carbon Sport': '#374151',
  'White Vegan': '#f8fafc',
  'Sport Alcantara': '#1f2937',
  'Luxury Wood': '#8b5e3c'
}

export const wheelStyles = {
  '18" Aero': 'linear-gradient(180deg,#111827,#374151)',
  '19" Classic': 'radial-gradient(circle at 30% 30%, #d1d5db, #6b7280)',
  '20" Sport': 'linear-gradient(180deg,#e5e7eb,#9ca3af)',
  '21" Turbine': 'repeating-linear-gradient(90deg,#111827 0 6px, #374151 6px 12px)',
  '22" Performance': 'linear-gradient(180deg,#f3f4f6,#6b7280)',
  '22" Star': 'radial-gradient(circle at 50% 40%, #fcd34d, #b45309)'
}

import wheelSport from '../assets/wheels/sport.svg'
import wheelClassic from '../assets/wheels/classic.svg'
import wheelStar from '../assets/wheels/star.svg'

import interiorAlcantara from '../assets/interiors/alcantara.svg'
import interiorWood from '../assets/interiors/wood.svg'
import interiorWhite from '../assets/interiors/white.svg'

export const wheelSvgs = {
  '18" Aero': wheelSport,
  '19" Classic': wheelClassic,
  '20" Sport': wheelSport,
  '21" Turbine': wheelStar,
  '22" Performance': wheelSport,
  '22" Star': wheelStar
}

export const interiorThumbnails = {
  'Black Leather': interiorAlcantara,
  'Tan Premium': interiorWood,
  'Carbon Sport': interiorAlcantara,
  'White Vegan': interiorWhite,
  'Sport Alcantara': interiorAlcantara,
  'Luxury Wood': interiorWood
}

export const roofOptions = [
  { label: 'Fixed Roof', price: 0 },
  { label: 'Glass Panoramic', price: 900 },
  { label: 'Removable Targa', price: 1800 }
]

export const roofStyles = {
  'Fixed Roof': 'rgba(0,0,0,0.18)',
  'Glass Panoramic': 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.12))',
  'Removable Targa': 'linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0.08))'
}

export const getOptionPrice = (options, label) => {
  const option = options.find((entry) => entry.label === label)
  return option ? option.price : 0
}

export const calculateCarPrice = ({ exterior, wheels, interior, roof }) => {
  const exteriorPrice = getOptionPrice(exteriorOptions, exterior)
  const wheelPrice = getOptionPrice(wheelOptions, wheels)
  const interiorPrice = getOptionPrice(interiorOptions, interior)

  // roof may be optional in earlier calls; include if provided
  const roofPrice = getOptionPrice(roofOptions, roof)

  return basePrice + exteriorPrice + wheelPrice + interiorPrice + roofPrice
}

export const getCarPreviewStyle = ({ exterior, interior }) => ({
  background: `linear-gradient(135deg, ${exteriorColors[exterior] || '#4b5563'} 0%, ${interiorColors[interior] || '#111827'} 100%)`,
  border: '2px solid rgba(255,255,255,0.25)',
  borderRadius: '1rem',
  minHeight: '220px',
  transition: 'all 0.2s ease'
})
