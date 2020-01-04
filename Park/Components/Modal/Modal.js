import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text as RText, TouchableOpacity, Image, Switch, Modal,TextInput,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import styles from '../Settings/Settings.styles'
import { setLicense, deleteCar, unParkTheCar} from '../../Reducers/parking/actions'
import { closeModal } from '../../Reducers/modal/actions'
import { carInfo } from '../../Reducers/modal/selectors'
import { parseDate } from '../../Utils'

const MText = ({ children,style }) => <RText style={[styles.text,{color: 'black'},style !== undefined && style]}>{children}</RText>

class ModalComponent extends Component {

	state = {
		license: '',
		editlicense: false,
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.car !== this.props.car) {
			if(nextProps.car && nextProps.car.license) {
				this.setState({
					license:nextProps.car.license,
					editlicense: false,
				})
			}
		}
	}

	editLicense = () => {
		if(this.state.license) {
			this.props.setLicense({
				id: this.props.car.id,
				license: this.state.license,
			})
			this.setState({editlicense:false})
		} else
			this.setState({editlicense:false,license:this.props.car.license})
	}

	deleteCar = () => {
		Alert.alert(
		  'Confirmation',
		  'Are you sure you want to delete this car ?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => null,
		      style: 'cancel',
		    },
		    {
				text: 'OK',
				onPress: () => {
					this.props.deleteCar(this.props.car.id)
					this.props.closeModal()
				}
			},
		  ],
		  {cancelable: false},
		)
	}

	manualPayment = () => {
		this.props.unParkTheCar(this.props.car.license)
		this.props.closeModal()
	}

	render() {

		const { status, closeModal, car } = this.props
		const time = (car && car.time) ? parseDate(car.time) : "--:--"
		const left = (car && car.left) ? parseDate(car.left) : "--:--"
		const paid = car && car.paid

		return (
			<Modal
			  animationType="fade"
			  transparent={true}
			  visible={status}
			 >

			  <View style={styles.modal}>
				<View style={styles.modalInner}>

					<View style={styles.modalImageView}>
						<TouchableOpacity style={styles.modalClose} onPress={() => closeModal()}>
							<Icon name="x" size={20} color="white" />
						</TouchableOpacity>
						<Image source={require('../../Images/masina.png')} resizeMode="cover" style={styles.modalImage} />
					</View>

					<View style={styles.modalInfo}>
						<View style={styles.analitycsContentLeft}>
							<MText>CHECKED IN</MText>
							<MText>LEFT</MText>
							<MText>LICENSE PLATE</MText>

							{ left === "--:--" ?
								<TextInput
									keyboardType="default"
									style={[styles.modalLicenseEdit,this.state.editlicense && {backgroundColor: 'white',borderWidth: 0.5,borderColor: '#ccc'}]}
									onChangeText={license => this.setState({license})}
									value={this.state.license}
									editable={this.state.editlicense}
								/> : <MText>PAID</MText>
							}

						</View>

						<View style={styles.analitycsContentRight}>
							<MText style={{fontWeight: '900'}}>{time}</MText>
							<MText style={{fontWeight: '900'}}>{left}</MText>
							<MText style={{fontWeight: '900'}}>{car && car.license}</MText>
							{ left === "--:--" ? <TouchableOpacity style={styles.modalEditSave} onPress={() => this.state.editlicense ? this.editLicense() : this.setState({editlicense:true})}>
								<RText style={styles.modalEditSaveText}>
									{this.state.editlicense ? 'SAVE' : 'EDIT'}
								</RText>
							</TouchableOpacity> : <MText style={{fontWeight: '900'}}>$ {paid}</MText>
							}

						</View>

						{ left === "--:--" && <View style={{marginLeft: 10}}>
							<TouchableOpacity style={[styles.modalEditSave,{width: 120,height: 25}]} onPress={this.deleteCar}>
								<RText style={[styles.modalEditSaveText,{fontSize: 10}]}>
									DELETE CAR
								</RText>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.modalEditSave,{width: 120,height: 25,marginTop: 2}]} onPress={this.manualPayment}>
								<RText style={[styles.modalEditSaveText,{fontSize: 10}]}>
									MANUAL PAYMENT
								</RText>
							</TouchableOpacity>
						</View>}
					</View>


				</View>
			  </View>

			</Modal>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		car: carInfo(state)
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	closeModal,
	setLicense,
	deleteCar,
	unParkTheCar
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
