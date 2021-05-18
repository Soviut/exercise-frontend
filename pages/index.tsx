import React, { useState, useEffect } from 'react'
import axios from 'axios'
import camelcase from 'camelcase-keys'
import classNames from 'classnames'

export default () => {
  const [loading, setLoading] = useState(false)
  const [shows, setShows] = useState([])
  const [currentShow, setCurrentShow] = useState(null)

  // TODO: refactor to use suspense once out of beta
  useEffect(
    () => {
      (async () => {
        setLoading(true)

        // TODO: centralize axios config for base url
        const res = await axios(
          'http://localhost:3000/shows'
        )

        // normalize JSON snake case to camel case to avoid mixing styles
        const data = camelcase(res.data)

        setShows(data)
        console.log(data)

        // TODO: use query param
        setCurrentShow(data[0])

        setLoading(false)
      })()
    },
    [],
  )

  return (
    <div>
      <nav className="shadow overflow-x-auto">
        {currentShow &&
          <ul className="flex justify-center flex-nowrap space-x-8">
            {shows.map((show) => (
              <li
                key={show.id}
                className={classNames(
                  'flex-shrink-0 w-16 h-16',
                  show.id === currentShow.id ? 'bg-black' : 'bg-gray-200',
                )}
              >
                <span className="sr-only">
                  {show.title}
                </span>
              </li>
            ))}
          </ul>
        }
      </nav>

      <section>
        {currentShow &&
          <figure>
            <img src={currentShow.product_image_url} />

            <figcaption>
              caption
            </figcaption>
          </figure>
        }
      </section>
    </div>
  )
}
