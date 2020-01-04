import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '../../Utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        // padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 23,
        color: 'black'
    },
    text: {
        color: 'white',
        fontWeight: '600',
        paddingVertical: 4
    },
    stext: {
        color: 'black',
        fontWeight: '600',
        paddingVertical: 5,
        paddingLeft: 20
    },
    analitycsView: {
        padding: 20
    },
    analitycsContent: {
        backgroundColor: '#ff4646',
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62
    },
    analitycsContentLeft: {},
    analitycsContentRight: {
        marginLeft: 10
    },
    settingsContainer: {
        paddingVertical: 0
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    settingsRowRight: {
        marginVertical: 6,
        marginRight: 20,
        alignItems: 'center'
    },
    region: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 8
    },
    regionOption: {
        width: 80,
        paddingLeft: 0,
        textAlign: 'center',
        fontWeight: '900'
    },
    regionOptionActive: {
        color: 'white',
        backgroundColor: '#ff4646'
    },
    regionOptionInactive: {
        color: 'black',
        backgroundColor: '#f2f2f2'
    },
    modal: {
        margin: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingVertical: 120,
        paddingHorizontal: 10
    },
    modalInner: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    modalInnerPrice: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 10
    },
    modalPrice: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingVertical: 295,
        paddingHorizontal: 10
        // paddingVertical: 700,
    },
    modalPriceInput: {
        borderRadius: 6,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        paddingHorizontal: 5,
        marginLeft: 10
    },
	modalLicenseEdit: {
		borderRadius: 6,
        height: 30,
        width: '100%',
        paddingHorizontal: 5,
		backgroundColor: '#ccc',
		textAlign: 'center',
	},
	modalEditSave: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: 70,
		borderRadius: 6,
		backgroundColor: '#ff4646',
	},
	modalEditSaveText: {
		color: 'white',
		fontWeight: '800',
	},
    modalPriceOk: {
        padding: 10,
        backgroundColor: '#ff4646',
        fontSize: 18,
        borderRadius: 6,
		marginLeft: 5,
		paddingHorizontal: 15,
		overflow: 'hidden',
    },
    modalPriceBottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    modalPriceTitle: {
        fontWeight: '700',
        fontSize: 15
    },
    modalImageView: {
        height: '66%',
        backgroundColor: 'black'
    },
    modalImage: {
        height: '100%',
        width: '100%'
    },
    modalClose: {
        backgroundColor: '#ff4646',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 2,
        right: 2,
        borderRadius: 6,
        overflow: 'hidden',
        zIndex: 2
    },
    modalInfo: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row'
    },
	buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 40,
        marginTop: 30,
        overflow: 'hidden',
        borderRadius: 4,
		alignSelf: 'center',
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
})

export default styles
