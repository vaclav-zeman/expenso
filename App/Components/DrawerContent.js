import React, { PropTypes } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import DrawerButton from '../Components/DrawerButton';
import styles from './Styles/DrawerContentStyle';
import Routes from '../Navigation/Routes';

const avatar = require('../Images/doggy.jpg');

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressAdd = props.onPushRoute.bind(this, Routes.AddForm);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={avatar} style={{ height: 60, width: 60, borderRadius: 60 }} />
        <Text style={{ color: 'white', marginTop: 15, marginBottom: 30 }}>{this.props.email}</Text>
        <DrawerButton text="Add transaction" onPress={this.handlePressAdd} />
        <DrawerButton text="Sign out" onPress={this.props.onLogout} />
      </ScrollView>
    );
  }
}

DrawerContent.propTypes = {
  onPushRoute: PropTypes.func.isRequired,
  email: PropTypes.string,
};

export default DrawerContent;
