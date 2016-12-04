import React, { PropTypes } from 'react'
import { ScrollView, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import ActionButtons from '../Components/ActionButtons'
import MonthChanger from '../Components/MonthChanger'
import TransactionList from '../Components/TransactionList'
import Colors from '../Themes/Colors';
import { formatMoney, sums } from '../Lib/Utilities';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/DashboardStyle'

class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      balance: 0,
      sumIncome: 0,
      sumExpense: 0
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { t, user, getTransactions } = this.props;

    user.uid && getTransactions(user.uid)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.t && newProps.t.lentgh !== 0) {
      const money = sums(newProps.t);

      this.setState({
        balance: money.total,
        sumIncome: money.income,
        sumExpense: money.expense
      })
    }
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  onMonthChange = (month) => {
    this.props.getTransactions(this.props.user.uid, month);
  }

  render () {
    const {
      sumIncome,
      sumExpense,
      balance
    } = this.state;

    const {
      t,
      navigator: { push },
      isLoading
    } = this.props;

    const addIncomeRoute = Object.assign({}, Routes.AddForm, { params: { isExpense: false }})
    const addExpenseRoute = Object.assign({}, Routes.AddForm, { params: { isExpense: true }})

    return (
      <View style={styles.container}>
        <View style={styles.summary}>
          <MonthChanger onMonthChange={this.onMonthChange} initialMonth={moment().format('M')} />
          <Text style={styles.heading}>{formatMoney(balance)}</Text>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryInfoItem}>{formatMoney(sumExpense)}</Text>
            <Text style={styles.summaryInfoItem}>{formatMoney(sumIncome)}</Text>
          </View>
          <ActionButtons
            onIncomePress={() => push(addIncomeRoute)}
            onExpensePress={() => push(addExpenseRoute)}
          />
        </View>
        {isLoading &&
          <ActivityIndicator
            animating={true}
            color={Colors.blue}
            style={[{height: 80}]}
            size="large"
          />
        }
        {(isLoading || t.length !== 0) && <TransactionList enableEmptySections transactions={t} pushRoute={push} />}
        {(!isLoading && t.length === 0) &&
          <ScrollView style={[styles.container, {paddingHorizontal: 20, flex: 1}]}>
            <Text style={{fontSize:23, marginBottom: 10, textAlign: 'center'}}>¯\_(ツ)_/¯</Text>
            <Text style={{fontSize:23, marginBottom: 10, textAlign: 'center'}}>Hmm... No transactions here.</Text>
            <Text style={{fontSize:18, textAlign: 'center'}}>Add a new transaction or check your network connectivity</Text>
          </ScrollView>
        }
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.login,
    t: state.transactions.data,
    isLoading: state.transactions.isLoading
  }), { getTransactions: Actions.getTransactions }
)(Dashboard)
