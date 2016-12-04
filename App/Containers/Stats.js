import React, { PropTypes } from 'react'
import { ScrollView, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Colors from '../Themes/Colors';
import { formatMoney, sums } from '../Lib/Utilities';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/StatsStyle'

class Stats extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      categorySum: {}
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentDidMount() {
    let categorySum = {};
    let monthlyBalance = {};

    if (!this.props.t.length) {
      return;
    }

    this.props.t
    .filter(item => item.type === 'EXPENSE')
    .reduce((prev, next) => {
      if (!categorySum[prev.category]) {
        categorySum[prev.category] = 0;
      }
      categorySum[prev.category] += Number(next.amount);

      return next;
    });

    setTimeout(() => this.setState({ categorySum }), 0);
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  changeMonth = () => {
    return 'zurba zurba';
  }

  render () {
    const {
      t,
      navigator: { push },
    } = this.props;

    const {
      categorySum
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Expenses <Text onPress={this.changeMonth}>this month</Text></Text>
          {categorySum && Object.keys(categorySum).map(item => (
            <View style={styles.rowCategory}>
              <Text style={[styles.rowCategoryItem, styles.rowCategoryTitle]}>
                {item}
              </Text>
              <Text style={[styles.rowCategoryItem, styles.rowCategoryValue]}>
                {formatMoney(Math.abs(categorySum[item]))}
              </Text>
            </View>
          ))}
          {!categorySum && <Text>There's nothing yet.</Text>}
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Monthly balances</Text>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.login,
    t: state.transactions.data,
    isLoading: state.transactions.isLoading
  })
)(Stats)
