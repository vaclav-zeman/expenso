import React, {Component} from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Icon } from 'native-base';
import { Layout, Colors } from '../Themes/';
import styles from './Styles/OverviewStyles';
import Box from '../Components/Box';
import MonthChanger from '../Components/MonthChanger';
import TransactionList from '../Components/TransactionList';
import CategorySum from '../Components/CategorySum';
import { formatMoney, sums } from '../Lib/Utilities';
import moment from 'moment';

class Overview extends Component {
  static propTypes = {
    transactions: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    navigator: React.PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      balance: 0,
      sumExpense: 0,
      sumIncome: 0,
      slicedTransactions: undefined
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.transactions && newProps.transactions.length && !newProps.isLoading) {
      const money = sums(newProps.transactions);
      const slicedTransactions = newProps.transactions.slice(-5);

      this.setState({
        balance: money.total,
        sumIncome: money.income,
        sumExpense: money.expense,
        slicedTransactions
      });
    }
  }

  render() {
    const {
      isLoading,
      onMonthChange,
      transactions
    } = this.props;

    const {
      sumIncome,
      sumExpense,
      balance,
      slicedTransactions
    } = this.state;

    return (
      <ScrollView style={[Layout.container]}>
        <MonthChanger onMonthChange={onMonthChange} initialMonth={moment().format('M')} />

        <Box>
          <Text style={styles.balance}>{formatMoney(balance)}</Text>
          <View style={styles.overview}>
            <View style={styles.overviewCol}>
              <Text>Expenses</Text>
              <Text style={[styles.overviewAmount, { color: Colors.fire }]}>
                <Icon name="md-arrow-down" /> {formatMoney(sumExpense)}
              </Text>
            </View>
            <View style={styles.overviewCol}>
              <Text style={styles.alignRight}>Income</Text>
              <Text style={[styles.overviewAmount, { color: Colors.green }, styles.alignRight]}>
                <Icon name="md-arrow-up" /> {formatMoney(sumIncome)}
              </Text>
            </View>
          </View>
        </Box>

        <Box title="Last 5 Transactions">
          {isLoading &&
            <ActivityIndicator
              animating={true}
              color={Colors.blue}
              style={[{height: 80}]}
              size="large"
            />
          }
          {slicedTransactions && !isLoading &&
            <TransactionList
              transactions={slicedTransactions}
              pushRoute={this.props.navigator.push}
            />
          }
        </Box>

        <Box title="Most Paying For" last>
          <CategorySum
            transactions={transactions}
            isLoading={isLoading}
          />
        </Box>
      </ScrollView>
    );
  }
}

export default Overview;
