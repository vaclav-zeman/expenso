import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyle'

export default class RoundedButton extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.object,
    text: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
    theme: React.PropTypes.string
  }

  getText () {
    const buttonText = this.props.text || this.props.children.toString()
    return buttonText.toUpperCase()
  }

  render () {
    let btnTheme;

    switch (this.props.theme) {
      case 'green': btnTheme = styles.buttonGreen; break;
      default: btnTheme = styles.buttonRed;
    }

    return (
      <TouchableOpacity style={[styles.button, btnTheme]} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
