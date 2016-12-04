import React, { PropTypes } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { formatMoney } from '../Lib/Utilities';
import { Colors } from '../Themes/';
import { set, has } from 'lodash';

class CategorySum extends React.Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    isLoading: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
      categorySum: {}
    }
  }

  componentWillReceiveProps({ transactions, isLoading }) {
    let categorySum = {};

    if (!transactions.length || isLoading) {
      return;
    }

    const isExpense = item => item.type === 'EXPENSE';

    transactions
      .filter(isExpense)
      .reduce((prev, next) => {
        if (!categorySum[next.category]) {
          categorySum[next.category] = 0;
        }

        categorySum[next.category] += Number(next.amount);

        return next;
      });

    this.setState({ categorySum });
  }

  render () {
    const {
      isLoading
    } = this.props;

    const {
      categorySum
    } = this.state;

    return (
      <View style={styles.flex}>
        {isLoading &&
          <ActivityIndicator
            animating={true}
            color={Colors.blue}
            style={[{height: 80, flex: 2}]}
            size="large"
          />
        }

        {categorySum && Object.keys(categorySum).map((item) => {
          return (
            <View style={styles.rowCategory}>
              <Text style={[styles.rowCategoryItem, styles.rowCategoryTitle]}>
                {item}
              </Text>
              <Text style={[styles.rowCategoryItem, styles.rowCategoryValue]}>
                {formatMoney(Math.abs(categorySum[item]))}
              </Text>
            </View>
          )
        })}
        {Object.keys(categorySum).length === 0 && !isLoading &&
          <Text>There's nothing yet.</Text>
        }
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.login,
    isLoading: state.transactions.isLoading
  })
)(CategorySum)

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    flex: 1
  },
  rowCategory: {
    flexDirection: 'row',
    flex: 1
  },
  rowCategoryItem: {
    flex: 1,
    color: Colors.black,
    fontWeight: 'bold'
  },
  rowCategoryValue: {
    textAlign: 'right',
    color: Colors.fire
  },
  user: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingBottom: 3,
    marginBottom: 5,
    fontWeight: 'bold'
  }
});
