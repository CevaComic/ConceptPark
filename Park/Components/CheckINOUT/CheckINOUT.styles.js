import {StyleSheet} from 'react-native'
import {Colors} from '../../Utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        backgroundColor: 'black',
        height: 280,
        width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
    },
    freeSpots: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 30
    },
	textClosed: {
		color: 'white',
		fontSize: 25,
		paddingHorizontal: 10,
	},
    freeSpotsNumber: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 28
    },
    freeSpotsText: {
        color: '#ff4646',
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 6
    },
    buttonsContainer: {
        alignItems: 'center'
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 40,
        marginTop: 30,
        overflow: 'hidden',
        borderRadius: 4
    },
    buttons: {

        borderRadius: 4,
        fontSize: 16
    },
    buttonsParkedCars: {
        fontWeight: 'bold',
        backgroundColor: '#ff4646',
        color: 'white'
    },
    buttonsHistory: {
        borderWidth: 2,
        borderColor: '#ff4646'
    },
    buttonsHistoryText: {
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold'
    },
	switch: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 3,
	}
})

export default styles
