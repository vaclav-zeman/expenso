import React, { PropTypes } from 'react'
import { ScrollView, Text, Switch, TextInput, Picker, DatePickerAndroid, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from 'native-base';
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Form from '../Themes/Form'
import CategoryPicker from '../Components/CategoryPicker'
import { generateUID } from '../Lib/Utilities';
import moment from 'moment';

// Styles
import styles from './Styles/AddFormStyle'
import { Colors } from '../Themes/';

class AddForm extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    const initialCategory = props.params.isExpense ? 'Food' : 'Salary';

    this.state = {
      amount: 0,
      category: initialCategory,
      note: '',
      textDate: moment().format('DD. MM. YYYY'),
      date: Date.now(),
      error: '',
    }
  }

  onSubmit() {
    const { isExpense } = this.props.params;
    const { amount, category, date, note } = this.state;
    console.log(this.state);
    if ((!amount || isNaN(amount)) || !category || (!date || date === 'Invalid date')) {
      this.setState({ error: 'Please, fill in all required fields.' });
      return;
    }

    const newAmount = isExpense ?
                      -parseFloat(this.state.amount) :
                      parseFloat(this.state.amount);
    const editedDate = moment(date).unix();

    this.props.addTransaction({
      id: generateUID(),
      amount: newAmount,
      category,
      note,
      date: editedDate,
      type: isExpense ? 'EXPENSE' : 'INCOME'
    }, this.props.user.uid)
    .then(() => this.props.navigator.push(Routes.AppView))
    .catch(err => console.error(err));
  }

  async showPicker(options) {
    try {
      let newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dateSetAction) {
        let date = new Date(year, month, day);
        newState.textDate = moment(date).format('DD. MM. YYYY');
        newState.date = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in Datepicker': `, message);
    }
  }

  render () {
    const { isExpense } = this.props.params;
    const { textDate, error, isAngie } = this.state;
    const buttonText = isExpense ? 'Add expense' : 'Add income';

    return (

      <ScrollView style={styles.container}>
        <View style={[styles.amount, { backgroundColor: Colors.blue }]}>
          <Text style={styles.labelAmount}>amount</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputAmount}
            placeholderTextColor="white"
            onChangeText={amount => this.setState({amount})}
            value={this.state.amount}
          />

          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <CategoryPicker
              isExpense={isExpense}
              selectedValue={this.state.category}
              onValueChange={category => this.setState({category})} />

            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={this.showPicker.bind(this, {date: Date.now()})}>
              <View>
                <Text style={Form.datePicker}>
                  {textDate ? textDate : 'Pick a date'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {error !== '' && <Text style={styles.warning}>{error}</Text>}

        <TextInput
          bluerOnSubmit={true}
          style={Form.input}
          placeholder='Note'
          multiline={true}
          onChangeText={note => this.setState({note})}
          value={this.state.note} />

        <Button
          success={!isExpense}
          danger={isExpense}
          block
          style={[styles.submit, { marginHorizontal: 20 }]}
          onPress={() => this.onSubmit()}
        >
          {buttonText}
        </Button>
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    user: state.login
  }),
  { addTransaction: Actions.addTransaction }
)(AddForm)
