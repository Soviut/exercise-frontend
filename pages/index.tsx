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
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {show.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
