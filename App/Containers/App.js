import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'native-base';
import ActionButton from 'react-native-action-button';
import Overview from './Overview';
import Transactions from './Transactions';
import { Icon } from 'native-base';
import routes from '../Navigation/Routes';
import Actions from '../Actions/Creators';
import { connect } from 'react-redux';

import { Layout, Colors, Theme } from '../Themes/';
import styles from './Styles/AppStyles';

class App extends React.Component {
  componentWillMount() {
    const { user, getTransactions } = this.props;

    user.uid && getTransactions(user.uid);

    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  redirectToAdd(income = true) {
    const incomeRoute = Object.assign({}, routes.AddForm, { params: { isExpense: false }});
    const expenseRoute = Object.assign({}, routes.AddForm, { params: { isExpense: true }});

    this.props.navigator.push(income ? incomeRoute : expenseRoute);
  }

  onMonthChange = (month) => {
    this.props.getTransactions(this.props.user.uid, month);
  };

  render() {
    const {
      navigator,
      transactions,
      isLoading
    } = this.props;

    return (
      <View style={[Layout.paddingHeader, Layout.flex, Layout.paddingActionButton, styles.container]}>
        <Tabs theme={Theme.tabs}>
          <Overview
            tabLabel='Overview'
            transactions={transactions}
            isLoading={isLoading}
            navigator={navigator}
            onMonthChange={this.onMonthChange}
          />
          <Transactions
            tabLabel='Transactions'
            transactions={transactions}
            isLoading={isLoading}
            navigator={navigator}
          />
        </Tabs>

        <ActionButton buttonColor={Colors.blue} offsetY={5}>
          <ActionButton.Item
            buttonColor={Colors.green}
            onPress={() => this.redirectToAdd(true)}
            title="Add Income"
          >
            <Icon name="ios-add-circle" />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.fire}
            title="Add Expense"
            onPress={() => this.redirectToAdd(false)}
          >
            <Icon name="ios-basket" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.login,
    transactions: state.transactions.data,
    isLoading: state.transactions.isLoading
  }), { getTransactions: Actions.getTransactions }
)(App)

