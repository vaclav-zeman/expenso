import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/ActionButtonsStyle'
import Routes from '../Navigation/Routes'

export default class ActionButtons extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.object,
    text: React.PropTypes.string,
    onIncomePress: React.PropTypes.func.isRequired,
    onExpensePress: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonExpense} onPress={this.props.onExpensePress}>
          <Text style={styles.buttonText}>EXPENSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIncome} onPress={this.props.onIncomePress}>
          <Text style={styles.buttonText}>INCOME</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
