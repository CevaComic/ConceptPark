import React, { Component } from 'react'
import { setNavigator, navigate } from './Service'
import { Text, View, StatusBar } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Colors } from '../Utils'
import {CurrentParked,CheckINOUT,Parking,Settings} from '../Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Navigation.styles'
enableScreens()

const homeNav = createStackNavigator({
	'home': {
		screen: CheckINOUT,
		navigationOptions: ({ navigation }) => ({
			headerMode: 'screen',
			headerBackTitle: null,
			headerLeft: () => <Text style={styles.titleLeft}>CONCEPT PARKING</Text>,
			headerRight: () => <Text style={styles.titleRight}>{navigation.getParam('message')}</Text>,
			headerStyle: {
				backgroundColor: '#ff4646',
			},
			headerBackTitleStyle: {
				color: 'white,'
			},
			headerLeftContainerStyle: {
				color: 'white,'
			}
		})
	},
	'parked': {
		screen: CurrentParked,
		navigationOptions: {
			headerMode: 'screen',
			headerBackTitle: null,
			title: "CURENTLY PARKED CARS",
			headerStyle: {
				backgroundColor: '#ff4646',
			},
			headerTintColor: 'white',
			headerTitleStyle: {
				width: '100%',
				...styles.titleLeft
			}
		}
	},
	'history': {
		screen: CurrentParked,
		params: {
			history: true,
		},
		navigationOptions: {
			headerMode: 'screen',
			headerBackTitle: null,
			title: "PARKED CARS HISTORY",
			headerStyle: {
				backgroundColor: '#ff4646',
			},
			headerTintColor: 'white',
			headerTitleStyle: {
				width: '100%',
				...styles.titleLeft
			}
		}
	},
},{
	index: 0,
	initialRouteName: 'home',
	headerMode: 'float',
	headerTransitionPreset: 'uikit',
})

const settingsNav = createStackNavigator({
	'settings': {
		screen: Settings,
		navigationOptions: {
			headerMode: 'screen',
			headerBackTitle: null,
			title: "SETTINGS",
			headerStyle: {
				backgroundColor: '#ff4646',
			},
			headerTitleStyle: {
				...styles.titleLeft
			}
		}
	}
},{
	animationEnabled: false,
})

const parkNav = createStackNavigator({
	'parking': {
		screen: Parking,
		navigationOptions: {
			headerMode: 'screen',
			headerBackTitle: null,
			title: "PARKING",
			headerStyle: {
				backgroundColor: '#ff4646',
			},
			headerTitleStyle: {
				...styles.titleLeft
			}
		}
	}
},{
	animationEnabled: false,
})

const NavigationSystem = createMaterialBottomTabNavigator({
	'home': {
		screen: homeNav,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
		}
	},
	'parking': {
		screen: parkNav,
		navigationOptions:  {
			tabBarIcon: ({ tintColor }) => <Icon name="parking" size={25} color={tintColor} />,
		}
	},
	'settings': {
		screen: settingsNav,
		navigationOptions:  {
			tabBarIcon: ({ tintColor }) => <Icon name="cogs" size={25} color={tintColor} />,
		}
	},
},{
	initialRouteName: "home",
	shifting: true,
    activeColor: '#ff4646',
    inactiveColor: 'black',
    barStyle: {
		backgroundColor: '#f2f2f2',
		paddingLeft: 20,
		paddingRight: 20,
	},
	sceneAnimationEnabled: false,
	resetOnBlur: true,
})


const AppNavigation = createAppContainer(NavigationSystem)

export default class Navigation extends Component {
	render() {
		return (
			<>
				<StatusBar barStyle="light-content" />
				<AppNavigation ref={ref => this.navigator = ref} />
			</>

		)
	}

	componentDidMount(){
		setNavigator(this.navigator)
	}

}
