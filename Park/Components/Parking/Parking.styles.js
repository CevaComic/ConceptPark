import {StyleSheet,Dimensions} from 'react-native'
import {Colors} from '../../Utils'

const styles = StyleSheet.create({
    container: {
        // flex: 1,
		width: Dimensions.get('window').width,
        // justifyContent: 'space-between',
        alignItems: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
    },
	carRow: {
		height: Dimensions.get('window').width / 2,
		width: Dimensions.get('window').width / 2,
		padding: 10,
		flexDirection: 'column',
		alignItems: 'center',
	},
	carRowInner: {
		flex: 1,
		width: '100%',
		borderWidth: 0.2,
		borderColor: 'rgba(0,0,0,0.4)',
		borderRadius: 8,
		overflow: 'hidden',
		// shadowColor: 'grey',
        // shadowOffset: {
        //     width: 1,
        //     height: 1.2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 1,
	},
	carTop: {
		// padding: 1,
		// width: Dimensions.get('window').width / 2 - 24,
		height: '50%',
		backgroundColor: '#1a64af',
	},
	carTopNumberView: {
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#ff4646',
		zIndex: 2,
	},
	carTopNumber: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 15,
	},
	carBottom: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	carEmpty: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 25,
		paddingHorizontal: 5,
	},
	carSpot: {
		color: '#ff4646',
		fontSize: 20,
		fontWeight: 'bold'
	},
	carTopImageView: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	carTopImage: {
		height: '100%',
	}
})

export default styles
