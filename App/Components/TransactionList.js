import React from 'react'
import R from 'ramda'
import { ListView, ScrollView, View, Text } from 'react-native'
import styles from './Styles/TransactionListStyle'
import TransactionListItem from './TransactionListItem'
import { isEmpty } from 'lodash';

const sort = R.compose(R.reverse(), R.sortBy(R.prop('date')));

export default class TransactionList extends React.Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    transactions: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    const sorted = sort(props.transactions.asMutable());
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(sorted || [])
    }
  }

  componentWillReceiveProps (newProps) {
    const sorted = sort(newProps.transactions.asMutable());

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sorted)
    })
  }

  _renderRow = rowData => {
    return <TransactionListItem
              transaction={rowData}
              pushRoute={this.props.pushRoute} />
  }

  render () {
    const {
      transactions
    } = this.props;

    const noTransactions = isEmpty(transactions);

    return (
      <View>
        {!noTransactions &&
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        }

        {noTransactions &&
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
