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
      {/* TODO: turn this into a component if used more than once in future */}
      <nav className="shadow overflow-x-auto">
        {currentShow &&
          <ul className="flex justify-center flex-nowrap space-x-8">
            {shows.map((show, i) => (
              <li key={show.id}>
                <a
                  href="#"
                  className={classNames(
                    'block flex-shrink-0 w-16 h-16',
                    show.id === currentShow.id ? 'bg-black' : 'bg-gray-200',
                  )}
                >
                  <span className="sr-only">
                    {show.title}
                  </span>
                </a>

                {show.id === currentShow.id &&
                  <div className="text-center">
                    {i + 1}
                  </div>
                }
              </li>
            ))}
          </ul>
        }
      </nav>

      <section>
        {currentShow &&
          <figure>
            {currentShow.productImageUrl}
            <img src={currentShow.productImageUrl} />

            <figcaption>
              <h2 className="text-md font-bold">
                {currentShow.title}
              </h2>
            </figcaption>
          </figure>
        }
      </section>
    </div>
  )
}
