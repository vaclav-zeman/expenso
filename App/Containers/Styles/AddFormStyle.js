import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  amount: {
    height: 180,
    paddingHorizontal: 15,
  },
  inputAmount: {
    borderColor: 'white',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
    marginTop: 30,
  },
  labelAmount: {
    fontSize: 14,
    paddingLeft: 5,
    color: 'white',
    position: 'absolute',
    top: 35,
  },
  inputControl: {
    marginTop: 10,
  },
  label: {
    marginBottom: -15,
    fontSize: 14,
    paddingLeft: 5,
  },
  input: {
    fontSize: 16,
  },
  submit: {
    marginTop: 15,
  },
  warning: {
    color: Colors.fire,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    paddingTop: 45,
  },
});
