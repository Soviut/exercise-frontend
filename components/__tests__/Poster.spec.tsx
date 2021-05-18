import React from 'react'
import { shallow } from 'enzyme'
import { Show } from '../../types'

import Poster from '../Poster'

describe('Poster component', () => {
  const show: Show = {
    id: '1a',
    title: 'show title',
    episodes: 5,
    productImageUrl: 'whatever.jpg',
  }

  it('should display show details', () => {
    const component = shallow(<Poster show={show} />)

    expect(component.find('[role="episodes"]').text()).toEqual('5 Episodes')
    expect(component.find('[role="title"]').text()).toEqual('show title')
  })

  it('should pass classes', () => {
    const component = shallow(<Poster show={show} className="ding" />)

    expect(component.hasClass('ding')).toEqual(true)
  })
})
