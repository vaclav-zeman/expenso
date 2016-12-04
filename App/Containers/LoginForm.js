import React, { PropTypes } from 'react'
import { ScrollView, Text, TextInput, Picker, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import RoundedButton from '../Components/RoundedButton'
import { throttle } from 'lodash';
import { Colors, Form } from '../Themes/';

import ApplicationStyles from '../Themes/ApplicationStyles'

class LoginForm extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.onSubmit = throttle(this.onSubmit, 4000);

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit() {
    const { email, password } = this.state;
    const {
      navigator,
      signIn,
      user
    } = this.props;
    // TODO: show better error
    if (!email || !password) return;

    this.setState({
      loading: true,
      error: ''
    });

    signIn(email, password)
      .then(() => {
        if (user.isLogged) {
          navigator.push(Routes.AppView);
        } else {
          this.setState({
            error: 'Invalid credentials.'
          })
        }

        this.setState({ loading: false })
      })
  }

  render () {
    return (
      <ScrollView style={ApplicationStyles.screen.mainContainer}>
        <Text style={{color: Colors.fire, textAlign: 'center', marginTop: 10}}>{this.state.error}</Text>

        {this.state.loading &&
          <ActivityIndicator
            animating={true}
            color={Colors.blue}
            style={[{height: 80}]}
            size="large"
          />
        }

        <TextInput
          style={Form.input}
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={email => this.setState({email})}
          value={this.state.email} />

        <TextInput
          style={Form.input}
          placeholder='Password'
          secureTextEntry
          onChangeText={password => this.setState({password})}
          value={this.state.password} />

        <RoundedButton onPress={(e) => this.onSubmit(e)}>
          Login
        </RoundedButton>
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    user: state.login,
  }), { signIn: Actions.login }
)(LoginForm)
