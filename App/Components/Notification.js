import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/NotificationStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import Actions from '../Actions/Creators'

class Notification extends React.Component {

  static propTypes = {
    notification: PropTypes.object
  }

  onClose = () => {
  }

  render () {
    const {
      notification: {
        theme,
        text
      }
    } = this.props;

    return (
      <View style={[styles.notification, styles[theme], text && styles.open]}>
        <Text style={styles.text}>
          {text}
        </Text>
        <TouchableOpacity onPress={this.onClose}>
          <Icon
            name='cross'
            size={18}
            color='white'
            style={styles.btn}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(
  state => ({
    notification: state.ui.notification
  }), { notification: Actions.showNotification }
)(Notification)
