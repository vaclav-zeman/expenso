import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes/';

// For some reason this doesn't want to be a stylesheet
export const drawerStyles = {
  drawer: {
    backgroundColor: Colors.drawer,
  },
};

const RootStyle = StyleSheet.create({
  applicationView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});

export default RootStyle;
