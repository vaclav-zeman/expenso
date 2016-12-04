import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/MonthChangerStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export default class MonthChanger extends React.Component {

  static propTypes = {
    initialMonth: React.PropTypes.string,
    onMonthChange: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: 0
    }
  }

  componentDidMount() {
    this.setState({
      currentMonth: Number(this.props.initialMonth)
    })
  }

  handlePrev = () => {
    const { currentMonth } = this.state;

    if (currentMonth > 1) {
      this.setState({
        currentMonth: this.state.currentMonth - 1
      }, () => this.props.onMonthChange(this.state.currentMonth))
    }
  }

  handleNext = () => {
    const { currentMonth } = this.state;

    if (currentMonth != 12) {
      this.setState({
        currentMonth: this.state.currentMonth + 1
      }, () => this.props.onMonthChange(this.state.currentMonth))
    }
  }

  render () {
    const {
      currentMonth
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handlePrev}>
          <Icon name='angle-left'
            size={18}
            color='white'
            style={styles.buttonText}
          />
        </TouchableOpacity>
        <Text style={styles.month}>{months[currentMonth]}</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleNext}>
          <Icon name='angle-right'
            size={18}
            color='black'
            style={styles.buttonText}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
