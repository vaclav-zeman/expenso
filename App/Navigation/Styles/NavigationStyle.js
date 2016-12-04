import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes/';

const NavigationStyle = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: -10,
  },
  navSubtitle: {
    flex: 1,
    color: Colors.black,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.base,
    alignSelf: 'center',
  },
  navButtonText: {
    color: Colors.black,
    marginTop: 8,
    marginLeft: 8,
    fontFamily: Fonts.bold,
    padding: Metrics.baseMargin,
  },
  navButtonLeft: {
    margin: Metrics.baseMargin,
    marginTop: 17,
  },
  navigationBar: {
    backgroundColor: Colors.blue,
    height: Metrics.navBarHeight,
  },
});

export default NavigationStyle;
