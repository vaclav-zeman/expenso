import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    marginHorizontal: 30,
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    flex: 1,
    color: Colors.black,
    fontSize: Fonts.size.regular,
  },
  value: {
    flex: 1,
    color: Colors.black,
    textAlign: 'right',
    fontSize: Fonts.size.regular,
  },
  valueBlue: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  owner: {
    color: Colors.blue,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  type: {
    fontSize: Fonts.size.h5,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
  typeIncome: {
    color: Colors.green,
  },
  typeExpense: {
    color: Colors.fire,
  },
});
