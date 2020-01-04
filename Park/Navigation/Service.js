import { NavigationActions } from 'react-navigation'

const config = {}

export function setNavigator(nav) {
    if (nav) {
        config.navigator = nav
    }
}

export function navigate(routeName, params) {
    if (config.navigator && routeName) {
        let action = NavigationActions.navigate({
            routeName,
            params
        })
        config.navigator.dispatch(action)
    }
}
