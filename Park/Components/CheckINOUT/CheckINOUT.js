import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity, Switch, ActivityIndicator,Image } from 'react-native'
import styles from './CheckINOUT.styles'
import { navigate } from '../../Navigation'
import { freeSpots, adminSelector, isLoading, parkMessage } from '../../Reducers/parking/selectors'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { parkTheCar, unParkTheCar, doPayment } from '../../Reducers/parking/actions'
import Camera, {
  Aspect,
  CaptureQuality,
  TorchMode,
  RotateMode,
  takePicture
} from 'react-native-openalpr'

const cameraPermission = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
})

const textOptions = {
	numberOfLines:1,
	adjustsFontSizeToFit: true,
}

class CheckINOUT extends Component {

	async componentDidMount() {
	    this.props.open && this.checkPermission()
		let message = this.props.open ? 'OPEN' : 'CLOSED'
		message += this.state.parkout ? ' OUT' : ' IN'
		this.props.navigation.setParams({ message })
	  }

  state = {
	  error: '',
	  showCamera: false,
	  picture: null,
	  parkout: false,
  }

  async checkPermission() {
    switch (await check(cameraPermission)) {
      case RESULTS.UNAVAILABLE:
        this.setState({
          error:
            'This feature is not available (on this device / in this context)',
        })
        break
      case RESULTS.DENIED:
        this.requestPermission()
        break
      case RESULTS.GRANTED:
        this.props.open && this.setState({
          showCamera: true,
        })
        break
      case RESULTS.BLOCKED:
        this.setState({
          error: 'The permission is denied and not requestable anymore',
        })
        break
    }
  }

  async requestPermission() {
    switch (await request(cameraPermission)) {
      case RESULTS.UNAVAILABLE:
        this.setState({
          error: 'This feature is not available (on this device / in this context)',
        })
        break
      case RESULTS.DENIED:
        this.setState({
          error: 'The permission has been denied',
        })
        break
      case RESULTS.GRANTED:
        this.setState({
          showCamera: true,
        })
        break
      case RESULTS.BLOCKED:
        this.setState({
          error: 'The permission is denied and not requestable anymore',
        })
        break
    }
  }

	componentWillReceiveProps(nextProps) {
		if(nextProps.open !== this.props.open) {
			nextProps.open && this.checkPermission()
			const message = nextProps.open ? 'OPEN' : 'CLOSED'
			this.props.navigation.setParams({ message })
		}
	}

 	onPlateRecognizedIn = async ({ plate, confidence, ...rest }) => {
		const { isLoading, parkTheCar, freeSpots } = this.props
	    if (confidence > 90 && !isLoading && freeSpots > 0)
			parkTheCar(plate)
  }

  onPlateRecognizedOut = async ({ plate, confidence, ...rest }) => {
	  const { isLoading, unParkTheCar, freeSpots } = this.props
	  if (confidence > 90 && !isLoading && freeSpots < 11)
		  unParkTheCar(plate)
}

	changeParkType = () => {
		this.setState({
			parkout:!this.state.parkout
		},() => {
			let message = this.props.open ? 'OPEN' : 'CLOSED'
			message += this.state.parkout ? ' OUT' : ' IN'
			this.props.navigation.setParams({ message })
		})
	}



	render() {
		const { freeSpots, open, region, infrared, parkMessage, isLoading, doPayment } = this.props
		const { parkout } = this.state

		return (
			<View style={styles.container}>
				{ parkMessage === 'Park is closed' ? <Switch
					value={parkout}
					trackColor={{true:'#ff4646'}}
					onChange={this.changeParkType}
					style={styles.switch}
				/> :
				<ActivityIndicator size="large" color="#ff4646" style={styles.switch}/>
				}
				{ open && !isLoading && this.props.navigation.state.routeName === 'home' ? (
					<>
					{ this.state.showCamera ? (<Camera
					style={styles.camera}
					aspect={Aspect.fill}
					captureQuality={CaptureQuality.high}
					country={region}
					onPlateRecognized={parkout ? this.onPlateRecognizedOut : this.onPlateRecognizedIn}
					plateOutlineColor="#ff4646"
					showPlateOutline={true}
					torchMode={infrared ? 1 : 0}
					touchToFocus={false}
					/>) : (
						<View style={styles.camera}>
							<Text {...textOptions} style={styles.textClosed}>{this.state.error}</Text>
						</View>
					)}
					</>
			  ) : (
				  <View style={styles.camera}>
	  				<Text {...textOptions} style={styles.textClosed}>{parkMessage}</Text>
					{
						parkMessage === 'Waiting for payment...' && (
							<>
							<TouchableOpacity style={[styles.buttonView,styles.buttonsParkedCars,{position: 'absolute',bottom: 5,left: 5}]}  onPress={() => doPayment(false)}>
								<Text style={styles.buttonsParkedCars}>
									CANCEL PAYMENT
								</Text>
							</TouchableOpacity>

								<TouchableOpacity activeOpacity={0.8} style={{position: 'absolute',bottom: 5,right: 5,backgroundColor: 'white',borderRadius: 8}} onPress={() => doPayment(true)}>
									<Image source={require('../../Images/payment.png')} resizeMode="contain" style={{width: 90,height: 90}} />
								</TouchableOpacity>

							</>
						)
					}
	  			  </View>

			  )}

				<View style={styles.freeSpots}>
					{	freeSpots ? (
						<>
						<Text style={styles.freeSpotsNumber}>
						{freeSpots}
						</Text>
						<Text style={styles.freeSpotsText}>
							FREE SPOT{freeSpots !== 1 && "S"}
						</Text>
						</>
					) : (
						<Text style={styles.freeSpotsText}>
							PARK IS FULL
						</Text>
					)
					}
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={[styles.buttonView,styles.buttonsParkedCars]} onPress={() => navigate("parked")}>
						<Text style={styles.buttonsParkedCars}>
							CURENTLY PARKED CARS
						</Text>
					</TouchableOpacity>


					<TouchableOpacity style={[styles.buttonView,styles.buttonsHistory]} onPress={() => navigate("history")}>
						<Text style={styles.buttonsHistoryText}>
							PARKED CARS HISTORY
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	let status = adminSelector(state)
	return {
		freeSpots: freeSpots(state),
		isLoading: isLoading(state),
		parkMessage: parkMessage(state),
		...status,
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	parkTheCar,
	unParkTheCar,
	doPayment
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(CheckINOUT)
