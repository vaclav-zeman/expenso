import React, { PropTypes } from 'react'
import { View, Navigator, StatusBar, BackAndroid } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux';
import DebugSettings from './Config/DebugSettings'
import DrawerContent from './Components/DrawerContent'
import Notification from './Components/Notification'
import { firebaseDb } from './Lib/Firebase';
// import './Config/PushConfig'

// Styles
import styles, {drawerStyles} from './Containers/Styles/RootStyle'
import Form from './Themes/Form';

class Root extends React.Component {
  constructor (props) {
    super(props)
    this.handlePushRoute = this.handlePushRoute.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { dispatch } = this.props.store;
    dispatch(Actions.startup())
  }

  componentDidMount () {
     this.drawerContent.navigator = this.navigator;
     this.navigator.drawer = this.drawer;

     if (!this.props.user.isLogged) {
       this.navigator.push(Routes.LoginScreen);
     }

     BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
          this.navigator.pop();
          return true;
        }
        return false;
      });
   }

   handlePushRoute (route) {
      this.navigator.push(route)
      this.closeDrawer()
   }

   handleLogout = () => {
     this.props.logout();
     this.navigator.push(Routes.LoginScreen);
   }

  renderDrawerContent () {
    return (
      <DrawerContent
        ref={ref => (this.drawerContent = ref)}
        onLogout={this.handleLogout}
        onPushRoute={this.handlePushRoute}
        onClose={this.closeDrawer}
        email={this.props.user.email} />
    )
  }

  closeDrawer () {
    this.drawer.close()
  }

  renderApp () {
    console.disableYellowBox = !DebugSettings.yellowBox

    const initialRoute = this.props.user.isLogged ? Routes.AppView : Routes.LoginScreen;

    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <Notification />
          <Drawer
            ref={ref => (this.drawer = ref)}
            content={this.renderDrawerContent()}
            styles={drawerStyles}
            openDrawerOffset={0.3}
            tapToClose
          >
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={initialRoute}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              navigationBar={NavigationBar.render()}
              style={styles.container}
            />
          </Drawer>
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

export default connect(
  state => ({
    user: state.login,
    notification: state.ui.notification
  }), { logout: Actions.logout }
)(Root);
