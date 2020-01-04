import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'
import App from './Park/Navigation'
import {name as appName} from './app.json'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Park/Reducers'

// Disable orange
console.ignoredYellowBox = ['Warning', '-','`'];
console.disableYellowBox = true

const Root = () => (
	<Provider store={store}>
	    <PersistGate persistor={persistor}>
	        <App />
	    </PersistGate>
	</Provider>
)

AppRegistry.registerComponent(appName, () => Root)
