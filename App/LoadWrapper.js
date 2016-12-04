import React, { PropTypes } from 'react'
import { Text, ActivityIndicator, View } from 'react-native';
import Root from './Root';
import { connect } from 'react-redux';
import Colors from './Themes/Colors';

class LoadWrapper extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    if (!this.props.isReady) {
      return (
        <View>
          <Text style={{
            fontSize: 35,
            textAlign: 'center',
            marginVertical: 50
          }}>Expenso</Text>
          <ActivityIndicator
            animating={true}
            color={Colors.blue}
            style={[{height: 80}]}
            size="large"
          />
        </View>
      );
    }

    return <Root {...this.props} store={this.props.store} />;
  }
}

export default connect(
  state => ({
    isReady: state.ui.storeLoaded,
  })
)(LoadWrapper);
