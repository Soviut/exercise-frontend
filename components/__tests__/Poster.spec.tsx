import React from 'react'
import { shallow } from 'enzyme'

import Poster from '../Poster'

describe('Poster component', () => {
  it('should display show details', () => {
    const show: Show = {
      id: '1a',
      title: 'show title',
      episodes: 5,
      productImageUrl: 'whatever.jpg',
    }

    const component = shallow(
      <Poster show={show} />
    )

    expect(component.find('[role="episodes"]').text()).toEqual('5 Episodes')
    expect(component.find('[role="title"]').text()).toEqual('show title')
  })
})
