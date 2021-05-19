import React from 'react'
import classNames from 'classnames'

import { Show } from '../types'

interface ShowPosterProps {
  show: Show
  className?: string
}

export default function Poster({
  show,
  className,
}: ShowPosterProps): JSX.Element {
  return (
    <figure className={classNames(className, 'relative')}>
      <img src={show.productImageUrl} className="w-full" />

      <figcaption className="absolute bottom-0 w-full p-3 text-center bg-black bg-opacity-60 backdrop-blur-xl">
        <div
          role="episodes"
          className="text-xs font-bold uppercase text-gray-400"
        >
          {show.episodes} Episodes
        </div>

        <h2 role="title" className="text-xl font-bold uppercase text-white">
          {show.title}
        </h2>
      </figcaption>
    </figure>
  )
}
