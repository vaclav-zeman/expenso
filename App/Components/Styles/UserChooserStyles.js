import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  userButton: {
    backgroundColor: Colors.grey,
    width: 32,
    borderRadius: 100,
    marginHorizontal: 7,
    opacity: 0.6,
  },
  userButtonText: {
    color: Colors.red,
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 3,
  },
  userButtonActive: {
    backgroundColor: Colors.blue,
    elevation: 10,
    opacity: 1,
  },
  textActive: {
    color: 'white',
  },
});
