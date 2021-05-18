import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default () => {
  const [loading, setLoading] = useState(false)
  const [shows, setShows] = useState([])

  // TODO: refactor to use suspense once out of beta
  useEffect(
    () => {
      (async () => {
        setLoading(true)

        // TODO: centralize axios config for base url
        const res = await axios(
          'http://localhost:3000/shows'
        )

        setShows(res.data)

        setLoading(false)
      })()
    },
    [],
  )

  return (
    <div>
      <nav className="border-b overflow-x-auto">
        <ul className="flex justify-center flex-nowrap space-x-8">
          {shows.map((show) => (
            <li key={show.id} className="flex-shrink-0 w-10 h-10 bg-gray-200">
              <span className="sr-only">
                {show.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
