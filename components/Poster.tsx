import React from 'react'

import { Show } from '../types'

interface ShowPosterProps {
  show: Show
  className?: string
}

export default ({ show, className }: ShowPosterProps) => {
  return (
    <figure className={className}>
      <img src={show.productImageUrl} className="w-full" />

      <figcaption className="text-center">
        <div role="episodes" className="text-xs font-bold uppercase text-gray-400">
          {show.episodes} Episodes
        </div>

        <h2 role="title" className="text-xl font-bold uppercase">
          {show.title}
        </h2>
      </figcaption>
    </figure>
  )
}
