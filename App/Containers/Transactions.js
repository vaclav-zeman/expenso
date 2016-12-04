import React, { Component } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { Layout } from '../Themes/';
import Box from '../Components/Box';
import TransactionList from '../Components/TransactionList';

import { Colors } from '../Themes';

class Transactions extends Component {
  render() {
    const {
      isLoading,
      transactions,
    } = this.props;

    return (
      <ScrollView style={[Layout.container]}>
        <Box title="All Transactions" last>
          {isLoading &&
            <ActivityIndicator
              animating
              color={Colors.blue}
              style={[{ height: 80 }]}
              size="large"
            />
          }
          {transactions && !isLoading &&
            <TransactionList
              transactions={transactions}
              pushRoute={this.props.navigator.push}
            />
          }
        </Box>
      </ScrollView>
    );
  }
}

export default Transactions;
