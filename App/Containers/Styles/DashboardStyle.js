import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background,
  },
  heading: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: Fonts.size.h4,
    marginVertical: 15,
    textAlign: 'center',
  },
  transaction: {
    fontSize: 18,
    color: Colors.black,
    marginHorizontal: 30,
  },
  summary: {
    backgroundColor: '#403b3b',
  },
  summaryInfo: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  summaryInfoItem: {
    flex: 1,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
});
