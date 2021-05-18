import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import camelcase from 'camelcase-keys'
import classNames from 'classnames'

export default () => {
  const [loading, setLoading] = useState(false)
  const [shows, setShows] = useState([])
  const [currentShow, setCurrentShow] = useState(null)

  const { id }: { id: string | undefined } = useParams()

  // TODO: refactor to use suspense once out of beta
  useEffect(
    () => {
      (async () => {
        setLoading(true)

        // TODO: centralize axios config for base url
        const res = await axios('http://localhost:3000/shows')

        // normalize JSON snake case to camel case to avoid mixing styles
        const data = camelcase(res.data)
        console.log(data)

        setShows(data)
        setCurrentShow(data.find((show) => show.id === id))

        setLoading(false)
      })()
    },
    [id],
  )

  return (
    <div>
      {/* TODO: turn this into a component if used more than once in future */}
      <nav className="shadow overflow-x-auto">
        {currentShow &&
          <ul className="flex justify-center flex-nowrap space-x-8">
            {shows.map((show) => (
              <li key={show.id}>
                <Link
                  to={{ pathname: show.id }}
                  className={classNames(
                    'block flex-shrink-0 w-16 h-16',
                    show.id === currentShow.id ? 'bg-black' : 'bg-gray-200',
                  )}
                >
                  <span className="sr-only">
                    {show.title}
                  </span>
                </Link>

                {show.id === currentShow.id &&
                  <div className="text-center">
                    {show.episodes}
                  </div>
                }
              </li>
            ))}
          </ul>
        }
      </nav>

      <section>
        {currentShow &&
          <figure className="w-72 mx-auto">
            <img src={currentShow.productImageUrl} className="w-full" />

            <figcaption className="text-center">
              <div className="text-xs font-bold uppercase text-gray-400">
                {currentShow.episodes} Episodes
              </div>

              <h2 className="text-xl font-bold uppercase">
                {currentShow.title}
              </h2>
            </figcaption>
          </figure>
        }
      </section>
    </div>
  )
}
