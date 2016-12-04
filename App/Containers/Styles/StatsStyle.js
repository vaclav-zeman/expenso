import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight + 20,
    backgroundColor: Colors.background,
  },
  box: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: Fonts.size.h6,
    color: Colors.black,
    fontWeight: '300',
  },
  titleMonth: {
    color: '#444',
    textDecorationLine: 'underline',
  },
  rowCategory: {
    flexDirection: 'row',
  },
  rowCategoryItem: {
    flex: 1,
    color: Colors.black,
    marginTop: 10,
    fontWeight: 'bold',
  },
  rowCategoryTitle: {
  },
  rowCategoryValue: {
    textAlign: 'right',
    color: Colors.fire,
  },
});
