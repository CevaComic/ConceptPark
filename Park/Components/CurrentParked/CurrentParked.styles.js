import {StyleSheet,Dimensions} from 'react-native'
import {Colors} from '../../Utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
	carRow: {
		height: 40,
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	carRowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	carRowIndex: {
		paddingLeft: 20,
		paddingRight: 15,
		fontWeight: 'bold',
	},
	carRowLicense: {
		fontWeight: 'bold'
	}
})

export default styles
