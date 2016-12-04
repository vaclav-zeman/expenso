import React from 'react'
import { AppRegistry } from 'react-native'
import LoadWrapper from './App/LoadWrapper'
import './App/Config/ReactotronConfig'
import configureStore from './App/Store/Store'

// Handling store here to avoid hot-reloading issues
const store = configureStore()
class RNBase extends React.Component {
  render () {
    return <LoadWrapper {...this.props} store={store} />
  }
}

AppRegistry.registerComponent('Expenso', () => RNBase)
