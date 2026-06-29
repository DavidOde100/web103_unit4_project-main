import React, { useId } from 'react'

const CarPreview3D = ({ exteriorColor = '#4b5563', interiorColor = '#111827' }) => {
  const uid = useId().replace(/:/g, '')
  const bodyGradient = `bodyGradient-${uid}`
  const bodyHighlight = `bodyHighlight-${uid}`
  const glassGradient = `glassGradient-${uid}`
  const wheelRim = `wheelRim-${uid}`

  return (
    <div className='car-scene' aria-hidden='true'>
      <svg className='car-svg' viewBox='0 0 920 360' role='img'>
        <defs>
          <linearGradient id={bodyGradient} x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#ffffff' stopOpacity='0.28' />
            <stop offset='12%' stopColor={exteriorColor} />
            <stop offset='78%' stopColor={exteriorColor} />
            <stop offset='100%' stopColor='#0b1224' stopOpacity='0.38' />
          </linearGradient>

          <linearGradient id={bodyHighlight} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#ffffff' stopOpacity='0.45' />
            <stop offset='100%' stopColor='#ffffff' stopOpacity='0' />
          </linearGradient>

          <linearGradient id={glassGradient} x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#a8d0ff' stopOpacity='0.55' />
            <stop offset='100%' stopColor='#0c1220' stopOpacity='0.95' />
          </linearGradient>

          <radialGradient id={wheelRim} cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#f6f7fb' />
            <stop offset='55%' stopColor='#d8dce8' />
            <stop offset='100%' stopColor='#8a92a8' />
          </radialGradient>
        </defs>

        <ellipse className='car-ground-shadow' cx='460' cy='295' rx='315' ry='42' />

        <path
          className='car-body-shell'
          d='M126 246 L140 210 L194 182 L307 170 L376 112 L536 104 L655 160 L742 172 L790 204 L808 238 L794 260 L120 260 Z'
          fill={`url(#${bodyGradient})`}
        />

        <path
          className='car-body-highlight'
          d='M183 190 L305 176 L378 120 L522 113 L636 164 L268 164 Z'
          fill={`url(#${bodyHighlight})`}
          opacity='0.64'
        />

        <path
          className='car-glass'
          d='M357 126 L533 119 L616 164 L406 164 Z'
          fill={`url(#${glassGradient})`}
        />

        <path className='car-glass-split' d='M472 123 L468 165' />

        <path className='car-door-line' d='M496 164 L496 256' />

        <path className='car-hood-line' d='M675 188 L766 206' />
        <path className='car-trunk-line' d='M212 194 L136 220' />

        <path className='car-wheel-arch' d='M214 260 C235 211, 321 211, 342 260' />
        <path className='car-wheel-arch' d='M584 260 C605 211, 691 211, 712 260' />

        <g transform='translate(278 258)'>
          <g className='car-wheel-spin'>
            <circle r='45' className='car-wheel-tire' />
            <circle r='29' fill={`url(#${wheelRim})`} />
            <circle r='11' className='car-wheel-center' />
            <path className='car-wheel-spoke' d='M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18' />
          </g>
        </g>

        <g transform='translate(648 258)'>
          <g className='car-wheel-spin'>
            <circle r='45' className='car-wheel-tire' />
            <circle r='29' fill={`url(#${wheelRim})`} />
            <circle r='11' className='car-wheel-center' />
            <path className='car-wheel-spoke' d='M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18' />
          </g>
        </g>

        <ellipse cx='807' cy='216' rx='11' ry='8' className='car-headlight' />
        <ellipse cx='126' cy='219' rx='10' ry='7' className='car-taillight' />

        <path
          className='car-cabin-glow'
          d='M384 169 L635 169 L616 198 L382 198 Z'
          style={{ fill: interiorColor }}
        />
      </svg>
    </div>
  )
}

export default CarPreview3D
