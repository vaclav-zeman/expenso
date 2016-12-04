import React, { PropTypes } from 'react'
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Form from '../Themes/Form'
import Fonts from '../Themes/Fonts'
import RoundedButton from '../Components/RoundedButton'
import { formatDate, formatMoney } from '../Lib/Utilities';

import styles from './Styles/DetailStyle.js'

class TransactionDetail extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    deleteTransaction: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      transaction: {}
    }
  }

  componentDidMount() {
    const transaction = this.props.transactions.filter(
      item => item.id === this.props.params.id
    )[0];

    this.setState({ transaction })
    this.props.notification('Hiiii')
  }

  onDelete = () => {
    const { deleteTransaction, params, user } = this.props;
    deleteTransaction(params.id, user.uid)
      .then(() => this.props.navigator.push(Routes.AppView));
  }

  render () {
    const { id } = this.props.params;
    const {
      amount,
      category,
      type,
      note,
      date,
      owner
    } = this.state.transaction;

    const stylesType = type === 'INCOME' ? styles.typeIncome : styles.typeExpense;

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.type, stylesType]}>{type}</Text>
        <Text style={styles.valueBlue}>added by <Text style={styles.owner}>{owner}</Text></Text>
        <View style={styles.row}>
          <Text style={styles.key}>Category</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Amount</Text>
          <Text style={styles.value}>{formatMoney(amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Date</Text>
          <Text style={styles.value}>{formatDate(date, true)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Note</Text>
          <Text style={styles.value}>{note ? note : '- - -'}</Text>
        </View>
        <RoundedButton onPress={this.onDelete}>Delete</RoundedButton>
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    transactions: state.transactions.data,
    user: state.login
  }), { deleteTransaction: Actions.deleteTransaction, notification: Actions.showNotification }
)(TransactionDetail)
