import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import camelcase from 'camelcase-keys'
import classNames from 'classnames'
import Poster from '../../components/Poster'
import { Show } from '../../types'

export default function ShowsPage(): JSX.Element {
  const [shows, setShows] = useState<Show[]>([])
  const [currentShow, setCurrentShow] = useState<Show | undefined>()
  const history = useHistory()

  const { search }: { search: string } = useLocation()

  useEffect(() => {
    async function fetchShows() {
      const res = await axios('http://localhost:3000/shows')

      // normalize JSON snake case to camel case to avoid mixing styles
      const data: Show[] = camelcase(res.data)
      setShows(data)
    }

    fetchShows()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(search)
    const id = params.get('id')
    const show = shows.find((show: Show) => show.id === id) || shows[0]

    if (show) {
      setCurrentShow(show)
      history.replace({ search: `?id=${show.id}` })
    }
  }, [search, history, shows])

  return (
    <div className="flex flex-col-reverse lg:flex-col">
      {/* TODO: turn this into a component if used more than once in future */}
      <nav className="my-5 bg-gray-200 overflow-x-auto">
        <ul className="whitespace-nowrap text-center space-x-2">
          {shows.map((show) => (
            <li key={show.id} className="inline-block align-top">
              <Link
                to={{ search: `?id=${show.id}` }}
                className="w-24 h-24 block relative"
              >
                <img
                  src={show.productImageUrl}
                  className={classNames(
                    'w-full h-full object-cover',
                    currentShow &&
                      show.id !== currentShow.id &&
                      'filter grayscale opacity-40'
                  )}
                />

                {currentShow && show.id === currentShow.id && (
                  <div className="absolute bottom-0 right-0 py-1 px-2 h-8 w-8 text-center bg-black text-white">
                    {show.episodes}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="py-32">
        {currentShow && (
          <Poster show={currentShow} className="max-w-xs mx-auto shadow-lg" />
        )}
      </section>
    </div>
  )
}
