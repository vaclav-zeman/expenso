

import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  item: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
  },
  itemText: {
    flexDirection: 'row',
  },
  categoryBlock: {
    flex: 2.5,
  },
  itemAmount: {
    color: Colors.black,
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  amountExpense: {
    color: Colors.fire,
  },
  itemCategory: {
    color: Colors.black,
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
  },
  itemDate: {
    flex: 0.8,
    textAlign: 'right',
    fontSize: 11,
  },
  note: {
    fontWeight: 'normal',
    fontSize: 13,
  },
});
