import React from 'react'
import MemberItem from './MemberItem'
import { Typography } from '@material-ui/core'
import { shallow } from 'enzyme'

describe('<MemberItem />', () => {
  it('Should render with one member', () => {
    const props = {
      id: 1,
      name: 'Jorge',
      surname: 'Valdez'
    }
    const MemberItemComponent = shallow(<MemberItem {...props} />).find(Typography)
    expect(MemberItemComponent.children()).toBeString()
  })
})
