

import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonExpense: {
    height: 34,
    flex: 1,
    borderRadius: 3,
    marginLeft: Metrics.section,
    justifyContent: 'center',
    backgroundColor: Colors.fire,
  },
  buttonIncome: {
    height: 34,
    flex: 1,
    borderRadius: 3,
    marginHorizontal: Metrics.section,
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -3,
  },
});
