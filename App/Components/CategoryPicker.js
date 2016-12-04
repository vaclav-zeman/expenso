import React from 'react'
import { Picker, View } from 'react-native'
import Form from '../Themes/Form'
import Routes from '../Navigation/Routes'
import CategoryIcon from '../Components/CategoryIcon'
import { mapCategoryToIcons } from '../Lib/Utilities'

const expenseItems = ['Food', 'Clothes', 'Flat', 'Drugs', 'Traffic', 'Entertainment', 'Fees', 'Vacation', 'Pets', 'Internet', 'Others'];
const incomeItems = ['Salary', 'Savings', 'Others'];

export default class CategoryPicker extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.object,
    onValueChange: React.PropTypes.func.isRequired,
    isExpense: React.PropTypes.bool,
    selectedValue: React.PropTypes.string.isRequired
  }

  render () {
    const { isExpense, selectedValue } = this.props;
    const pickerItems = isExpense ? expenseItems : incomeItems;

    return (
      <View style={Form.categoryPickerWrapper}>
        <Picker
          style={Form.categoryPicker}
          selectedValue={this.props.selectedValue}
          mode='dropdown'
          onValueChange={this.props.onValueChange}>
            {pickerItems.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
        <View style={Form.categoryPickerIcon}>
          <CategoryIcon icon={mapCategoryToIcons(selectedValue)} />
        </View>
      </View>
    )
  }
}
