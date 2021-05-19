import React, { useState, useEffect, useMemo } from 'react'
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

  const showIndex = useMemo<number>(() => {
    return shows.findIndex((show) => show.id === currentShow?.id)
  }, [shows, currentShow])

  const prevShow = useMemo<Show | undefined>(() => {
    return showIndex > 0 ? shows[showIndex - 1] : undefined
  }, [shows, showIndex])

  const nextShow = useMemo<Show | undefined>(() => {
    return showIndex < shows.length - 1 ? shows[showIndex + 1] : undefined
  }, [shows, showIndex])

  return (
    <div className="flex flex-col-reverse lg:flex-col h-screen">
      {/* TODO: turn this into a component if used more than once in future */}
      <nav className="bg-gray-700 overflow-x-auto flex-shrink-0">
        <ul className="whitespace-nowrap text-center space-x-2">
          {shows.map((show) => (
            <li key={show.id} className="inline-block align-top">
              <Link
                to={{ search: `?id=${show.id}` }}
                className="group w-24 h-24 block relative overflow-hidden"
              >
                <img
                  src={show.productImageUrl}
                  className={classNames(
                    'w-full h-full object-cover transform group-hover:scale-110 group-focus:scale-110 transition-transform duration-300',
                    currentShow &&
                      show.id !== currentShow.id &&
                      'opacity-40 mix-blend-luminosity'
                  )}
                />

                {currentShow && show.id === currentShow.id && (
                  <div className="absolute bottom-0 right-0 flex items-center justify-center py-1 px-2 h-8 w-8 text-sm font-bold text-center bg-black text-white">
                    {show.episodes}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="relative py-8 flex-grow flex items-center justify-center">
        {prevShow && (
          <Link
            to={{ search: `?id=${prevShow.id}` }}
            className="group absolute left-0 z-10 overflow-hidden"
          >
            <div className="p-3 pl-5 bg-black bg-opacity-60 text-white uppercase font-thin transform -translate-x-2 group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-100">
              Prev
            </div>
          </Link>
        )}

        {nextShow && (
          <Link
            to={{ search: `?id=${nextShow.id}` }}
            className="group absolute right-0 z-10 overflow-hidden"
          >
            <div className="p-3 pr-5 bg-black bg-opacity-60 text-white uppercase font-thin transform translate-x-2 group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-100">
              Next
            </div>
          </Link>
        )}

        {currentShow && <Poster show={currentShow} className="max-w-xs" />}
      </section>
    </div>
  )
}
