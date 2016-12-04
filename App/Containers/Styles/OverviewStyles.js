import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  balance: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    paddingBottom: 10,
  },
  overview: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewCol: {
    paddingHorizontal: 20,
    flex: 1,
  },
  overviewAmount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  alignRight: {
    textAlign: 'right',
  },
});
