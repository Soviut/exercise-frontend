import React from 'react'

interface ShowPosterProps {
  show: Show
  className?: string
}

export default ({ show, className }: ShowPosterProps) => {
  return (
    <figure className={className}>
      <img src={show.productImageUrl} className="w-full" />

      <figcaption className="text-center">
        <div className="text-xs font-bold uppercase text-gray-400">
          {show.episodes} Episodes
        </div>

        <h2 className="text-xl font-bold uppercase">
          {show.title}
        </h2>
      </figcaption>
    </figure>
  )
}
