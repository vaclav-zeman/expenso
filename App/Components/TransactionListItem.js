import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/TransactionListStyle'
import moment from 'moment'
import Routes from '../Navigation/Routes'
import { formatMoney, mapCategoryToIcons } from '../Lib/Utilities'
import CategoryIcon from './CategoryIcon'
import { capitalize } from 'lodash';

export default class TransactionListItem extends React.Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    transaction: React.PropTypes.object.isRequired,
    children: React.PropTypes.string
  }

  onPress(id) {
    const route = Object.assign({}, Routes.TransactionDetail, { params: { id }})
    this.props.pushRoute(route)
  }

  render () {
    const {
      id,
      category,
      amount,
      date,
      type,
      note
    } = this.props.transaction;

    const specialStyle = type === 'EXPENSE' ? styles.amountExpense : styles.amountIncome;
    const icon = mapCategoryToIcons(category);

    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPress(id)}>
        <View style={styles.itemText}>
          <CategoryIcon icon={icon} />

          <View style={styles.categoryBlock}>
            {note ? <Text style={styles.itemCategory}>{capitalize(note)}</Text> : null}
            <Text style={[styles.itemCategory, note && styles.note]}>{category}</Text>
          </View>

          <View>
            <Text style={styles.itemDate}>
              {moment.unix(date).format('DD.MM.')}
            </Text>
            <Text style={[styles.itemAmount, specialStyle]}>
              {formatMoney(amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
