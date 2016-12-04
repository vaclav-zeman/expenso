

import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
  },
  buttonGreen: {
    backgroundColor: Colors.green,
  },
  buttonRed: {
    backgroundColor: Colors.fire,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
});
