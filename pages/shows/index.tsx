import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import camelcase from 'camelcase-keys'
import classNames from 'classnames'
import Poster from '../../components/Poster'
import { Show } from '../../types'

export default function ShowsPage(): JSX.Element {
  // const [loading, setLoading] = useState(false)
  const [shows, setShows] = useState<Show[]>([])
  const [currentShow, setCurrentShow] = useState<Show | undefined>()
  const hist = useHistory()

  const { id }: { id: string | undefined } = useParams()

  async function fetchShows() {
    // setLoading(true)

    // TODO: refactor into a useResrouce with with axios base url config
    const res = await axios('http://localhost:3000/shows')

    // normalize JSON snake case to camel case to avoid mixing styles
    const data: Show[] = camelcase(res.data)

    if (data.length > 0) {
      setShows(data)

      // choose first show if no id is present
      const show = id ? data.find((show: Show) => show.id === id) : data[0]
      if (show) {
        setCurrentShow(show)
        hist.replace({ pathname: `/gallery/${show.id}` })
      }
    }
    // setLoading(false)
  }

  useEffect(() => {
    fetchShows()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col-reverse lg:flex-col">
      {/* TODO: turn this into a component if used more than once in future */}
      <nav className="shadow overflow-x-auto">
        {currentShow && (
          <ul className="flex items-center">
            {shows.map((show) => (
              <li key={show.id} className="py-12 px-12 flex-shrink-0">
                <Link
                  to={{ pathname: show.id }}
                  className="w-16 h-16 block relative"
                >
                  <img
                    src={show.productImageUrl}
                    className={classNames(
                      'w-16 h-16 object-cover',
                      show.id !== currentShow.id &&
                        'filter grayscale contrast-50 opacity-40'
                    )}
                  />

                  {show.id === currentShow.id && (
                    <div className="absolute -bottom-2 -right-2 py-1 px-2 h-8 w-8 text-center bg-black text-white">
                      {show.episodes}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <section className="py-32">
        {currentShow && (
          <Poster show={currentShow} className="max-w-xs mx-auto shadow-xl" />
        )}
      </section>
    </div>
  )
}
