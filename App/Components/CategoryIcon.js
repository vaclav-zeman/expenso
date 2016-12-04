import React from 'react'
import { View, Image } from 'react-native'
import styles from './Styles/CategoryIconStyles'
import { icons } from '../Images/Categories';

export default class CategoryIcon extends React.Component {

  static propTypes = {
    icon: React.PropTypes.string
  }

  static defaultProps = {
    icon: 'dollar'
  }

  constructor(props) {
    super(props)
  }

  render () {
    const { icon } = this.props

    return (
      <Image
        style={styles.icon}
        source={icons[icon]}
      />
    )
  }
}
